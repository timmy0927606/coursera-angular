(function () {
"use strict";

angular.module('common')
.service('SignUpService', SignUpService);

function SignUpService() {
  var service = this;
  service.isValid = false;

  service.saveUser = function (user) {
    service.user = user;
    console.log('Saved user:',service.user);
    service.isValid = true;
    return service.user;
  };


  service.getUser = function () {
    return service.user;
  };

}


})();
