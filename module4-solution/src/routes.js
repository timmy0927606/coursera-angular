(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/main-menuapp.template.html',
    controller: 'MenuDataController as menuList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  //menu items page for a selected category
  .state('items', {
    url: '/category/{categoryShortName}',
    templateUrl: 'src/templates/main-items.template.html',
    controller: 'ItemDataController as itemList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
    },

    params: {categoryName: null},
  });
}

})();
