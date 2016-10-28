(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);


LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunch_items = "";
  $scope.evaluation_result = "";

  $scope.checkLunch = function () {
    var lunch_items = $scope.lunch_items;
    var lunch_items_count = lunch_items.split(",").filter(String).filter(function(e){return e != '""'}).length;

    var evaluation_result;
    if (lunch_items_count == 0 ){
      evaluation_result = "Please enter data first, empty text between commas not counted!";
    } else if (lunch_items_count > 3 ) {
      evaluation_result = "Too Much!";
    } else if (lunch_items_count >= 1  && lunch_items_count <= 3){
      evaluation_result = "Enjoy!";
    }

    $scope.evaluation_result = evaluation_result;
  };

}

})();
