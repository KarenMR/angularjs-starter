function appCategoryController($log, $uibModal, $window, itemService) {
    console.log('Running category controller');
    var vm = this;
    vm.items = [];
    vm.filter = filter;
    //  vm.orderBy=orderBy;
    vm.update = updateItem;
    vm.delete = deleteItem;
    vm.modalOpen = false;
    vm.animationsEnabled = true;
    active();

    function filter(category) {
        console.log('category:', category);
        vm.category = category;
    }
    function active() {
        loadItems();
    }
    function deleteItem(item) {
        var promise = itemService.removeItem(item);
        console.log('item delete rrr    ', item);
        promise.then(function (result) {
            $log.debug('delete');
            loadItems();
        }).catch(function (error) {

        });
    }
    /*    function deleteItem(item) {
            var notificaModelInstance = $uibModal.open({
                templateUrl: 'main/categories/notifications/notifications.html',
                controller: notificaModelInstanceCtrl,
                controllerAs: '$ctrl'
            });
            notificaModelInstance.result.then(function (response) {
                console.log('item delete rrr    ', item);
                if (response === 'delete') {
                    var promise = itemService.removeItem(item);
                    promise.then(function (result) {
                        $log.debug('delete');
                        loadItems();
                    }).catch(function (error) {
                    });
                }
            })
            function notificaModelInstanceCtrl($uibModalInstance, itemService, id) {
                var vm = this;
    
                vm.cancel = function () {
                    $uibModalInstance.close('close');
                }*/
    vm.togleAnimation = function () {
        console.log('togleAnimation')
        vm.animationsEnabled = !vm.animationsEnabled;
    }
    function updateItem(item) {
        var modalInstance = $uibModal.open({
            templateUrl: 'main/categories/edit-item/edit-item.html',
            controller: 'appEditItemController',
         //   animation: vm.animationsEnabled,
            size: '',
            resolve: {
                item: function () {
                    return item;
                }
            }
        });

        modalInstance.opened.then(function () {
            console.log('Modal opened');
            vm.modalOpen = true;
        });

        modalInstance.result.then(function (item) {
            console.log('Modal Result');
            vm.modalOpen = false;
        }, function () {
            console.log('Modal r01');
            vm.modalOpen = false;
        });
        modalInstance.closed.then(function () {
            console.log('Modal Closed');
            loadItems();
        });
    };


    function loadItems() {
        vm.promise = itemService.getItems();
        vm.promise.then(function (result) {
            console.log('result', result);
            vm.items = result;
        }).catch(function (error) {
            console.log('Error Found', error);
            vm.error = 'Cannot find Items';
        }).finally(function () {
            console.log('getItems is finished');
        });
        console.log('test Async');
    }
}
function onDelete() {
    loadItems();
}

var component = {
    templateUrl: 'main/categories/categories.html',
    controller: appCategoryController,

};
angular
    .module('main')
    .component('appCategories', component)
    .controller('appEditItemController', appEditItemController);
