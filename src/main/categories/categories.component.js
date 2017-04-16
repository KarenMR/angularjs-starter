function appCategoryController(itemService)
{
        console.log('Running category controller');
        var vm = this;
        vm.items={};

        var promise=itemService.getItem();

        promise.then(function(result){
            console.log('result', result);
            vm.items=result;

        }).catch(function(error){
            console.log('Error Found', error);
            vm.error='Cannot find item';
        }).finally(function() {
        console.log('get item is finished');
});

}

var component = {
    templateUrl: 'main/categories/categories.html',
    controller: appCategoryController
};
angular
.module('main')
.component('appCategories', component);
