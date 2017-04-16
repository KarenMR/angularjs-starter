function addUser(userService) {
  var vm = this;
  vm.user = {};

  vm.add = function () {
    var promise = userService.addUser(vm.user);
    promise.then(function (result) {
      console.log('Add User', result);
    });
  };
}

var component = {
    templateUrl: 'main/users/register/register.html',
    controller: addUser
};
angular
.module('main')
.component('addUser', component);