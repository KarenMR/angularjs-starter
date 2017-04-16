function appLoginController(userService, $state) {
  console.log('Running Login controller');
  var vm = this;
  vm.users = {};

  vm.loginUser = function () {
    var promise = userService.loginUser(vm.users);
    var valid = false;
    promise.then(function (result) {
      console.log('Login result', result);
      angular.forEach(result, function (value, key) {
        if (vm.user.name === value.name && vm.user.pass === value.pass) {
          valid = true;
        }
      });

      if (valid) {
        vm.error = 'ok';
        $state.go('categories');
      }
      else {
        vm.error = 'User or password enter are not valid';
      }
    }).catch(function (error) {
      console.log('Login Error:', error);
      vm.error = 'Error during Login session';
    }).finally(function () {
      console.log('app control Login is finished');
    });
  };
}
var component = {
  templateUrl: 'main/login/login.html',
  controller: appLoginController
};
angular
  .module('main')
  .component('appLogin', component);