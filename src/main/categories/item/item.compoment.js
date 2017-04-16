function appItemController() {
    console.log('Running item controller');
}

var component = {
    templateUrl: 'main/categories/item/item.html',
    controller: appItemController,
    //AngularJS components
    bindings: {
        item: '='
    }
};
angular
    .module('main')
    .component('appItem', component);