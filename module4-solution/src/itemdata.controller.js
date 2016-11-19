(function () {
'use strict';

angular.module('Data')
.controller('ItemDataController', ItemDataController);


ItemDataController.$inject = ['MenuDataService', 'items', '$stateParams'];
function ItemDataController(MenuDataService, items, $stateParams) {
  var itemList = this;
  itemList.items = items;
  itemList.categoryName = $stateParams.categoryName;
  itemList.categoryShortName = $stateParams.categoryShortName;
  console.log(itemList.items);
  console.log(itemList.categoryName);

}

})();
