function appUserController()
{
        console.log('Running course controller');
       
}

var component = {
    templateUrl: 'main/users/user/user.html',
    controller: appUserController,
    //AngularJS components
    bindings:{
        user:'='
    }
};
angular
.module('main')
.component('appUser', component);