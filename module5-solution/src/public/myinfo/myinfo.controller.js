(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['SignUpService', 'ApiPath'];
function MyInfoController(SignUpService, ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
  $ctrl.user = SignUpService.getUser();
  $ctrl.isValid = SignUpService.isValid;
}

})();
