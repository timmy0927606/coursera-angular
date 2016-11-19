(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];
  var foundCategories = [];

  service.getItemsForCategory = function (categoryShortName) {
    foundItems =[];

    return  $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category="+categoryShortName)
    }).then(function(response) {
      console.log(response.data.menu_items);
      var foundItems = response.data.menu_items;
      console.log("found items: "+foundItems)
      return foundItems;
    });
  };

  service.getAllCategories = function () {
    foundCategories =[];

    return  $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function(response) {
      console.log(response.data);
      var foundCategories = response.data;
      console.log("found categories: "+foundCategories)
      for ( var i=0; i< foundCategories.length; i++ ) {
          console.log("found category: "+foundCategories[i]);
      }
      return foundCategories;
    });
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return foundItems;
  };

}


})();
