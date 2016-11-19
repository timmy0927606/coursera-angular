(function () {
'use strict';

angular.module('Data')
.controller('MenuDataController', MenuDataController);


MenuDataController.$inject = ['MenuDataService', 'categories'];
function MenuDataController(MenuDataService, categories) {
  var menuList = this;
  menuList.categories = categories;
  console.log(menuList.categories);

  // menuList.$onInit = function () {
  //   MenuDataService.getAllCategories()
  //   .then(function (result) {
  //     menuList.categories = result;
  //     console.log("in $onInit of MenuDataController");
  //   });
  // };
}

})();
