(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm="";
  var origTitle = "Found Menu List";

  var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

  promise.then(function (response) {
    menu.found = response;
    var origTitle = "Found Menu List";
    menu.title = origTitle + " (" + menu.found.length + " items )";
    console.log(menu.found);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });



  menu.getMatchedMenuItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      menu.found = response;

      menu.title = origTitle + " (" + menu.found.length + " items )";
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  menu.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.found[itemIndex].name;
    MenuSearchService.removeItem(itemIndex);
    menu.found = MenuSearchService.getItems();
    this.title = origTitle + " (" + menu.found.length + " items )";
  };

  //No need to fetch the data every time from the server
  //Just perform lookup using the originally returned unfiltered data
  // menu.getMatchedMenuItems = function (searchTerm) {
  //
  //   var foundItems = [];
  //
  //   var menu_items = menu.all_items;
  //   for ( var i=0; i< menu_items.length; i++ ) {
  //     if (menu_items[i].description.match(searchTerm)) {
  //       foundItems.push(menu_items[i]);
  //       console.log("found item: "+menu_items[i]);
  //     }
  //   }
  //   menu.found = foundItems;
  //   console.log(menu.found);
  // };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = []

  service.getMatchedMenuItems = function (searchTerm) {
    foundItems =[]
    if ( ! searchTerm) {
      searchTerm = "";
    }
    return  $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(response) {
      console.log(response.data.menu_items);
      var menu_items = response.data.menu_items;
      for ( var i=0; i< menu_items.length; i++ ) {
        if (menu_items[i].description.match(searchTerm)) {
          foundItems.push(menu_items[i]);
          console.log("found item: "+menu_items[i].name);
        }
      }
      //console.log("found items: "+foundItems)
      return foundItems;
    });
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return foundItems;
  };

}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsListDirectiveController() {
  var list = this;

  list.isEmpty = function () {
    if (list.items === undefined || list.items.length === 0) {
      return true;
    }
    else {
      return false;
    }
  };
}


})();
