(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service(`ShoppingListCheckOffService`, ShoppingListCheckOffService);

ToBuyController.$inject = [`ShoppingListCheckOffService`];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getShoppingListItems();
    
    toBuyList.isEmpty = function() {
      if (toBuyList.items.length === 0 ) {
        return true;
      }
      else {
        return false;
      }
    }

    toBuyList.buyItem = function (itemName, quantity, itemIndex) {
      ShoppingListCheckOffService.buyItem(itemName, quantity, itemIndex);
    };
}

AlreadyBoughtController.$inject = [`ShoppingListCheckOffService`];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtList = this;

    alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

    alreadyBoughtList.isEmpty = function() {
      if (alreadyBoughtList.items.length === 0 ) {
        return true;
      }
      else {
        return false;
      }
    }
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var to_buy_items = [
    { name: "cookies", quantity: 10 },
    { name: "chips", quantity: '10 bags' },
    { name: "apples", quantity: '3 pounds' },
    { name: "eggs", quantity: 12 },
    { name: "milk", quantity: '2 bottles' },
    { name: "beers", quantity: '12 cans' }
  ];
  // List of bought items
  var bought_items = []

  service.buyItem = function (itemName, quantity, itemIndex) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    bought_items.push(item);
    to_buy_items.splice(itemIndex, 1);
  };

  service.getShoppingListItems = function () {
    return to_buy_items;
  };

  service.getAlreadyBoughtItems = function () {
    return bought_items;
  };
}

})();
