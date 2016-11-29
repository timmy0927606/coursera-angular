(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService', 'MenuService'];
function SignUpController(SignUpService, MenuService) {
  var $ctrl = this;

  //console.log("menu_item short name: ",$ctrl.user.menu_item);
  $ctrl.submit = function () {
    MenuService.getMenuItem($ctrl.user.menu_item.short_name).then(function(menu_item) {
      console.log('menu item: ', menu_item);
      $ctrl.user.menu_item.name = menu_item.name;
      $ctrl.user.menu_item.description = menu_item.description;
      $ctrl.completed = true;
      SignUpService.saveUser($ctrl.user);
      SignUpService.isValid = true;
    }).catch(function (err) {
      console.log(err);
      $ctrl.completed = false;
      $ctrl.verified = true;
    });

  };
}

})();
