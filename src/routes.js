angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'main',
      redirectTo: 'login'
    })

    .state('login', {
      parent:'app',
      url: 'login',
      component: 'appLogin'
    })

    .state('register', {
      url: '/users/register',
      templateUrl: 'main/users/register/register.html'
    })

    .state('categories', {
      parent:'app',
      url: 'categories',
      component: 'appCategories'
    })
}
