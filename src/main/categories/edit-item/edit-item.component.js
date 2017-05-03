function appEditItemController($scope,$state, $uibModalInstance,$window, item, itemService) {
    console.log('Edit Item Controller');
    loadItem(item.id);
    $scope.currentModal = $uibModalInstance;
    $scope.editItem = {};
    $scope.newItem = {};

    function loadItem(id) {
        var promise = itemService.getItem(id);
        promise.then(function (result) {
            console.log('loadItem', result);
            $scope.item = result;
        }).catch(function (error) {
            console.log('Error found loadItem:', error);
        }).finally(function () {
            console.log('getItem is finished');
        });
    }
    $scope.edit = function () {
        $scope.newItem.id = $scope.item.id;
        if ($scope.editItem.brand === undefined) {
            $scope.newItem.brand = $scope.item.brand;
        }
        else {
            $scope.newItem.brand = $scope.editItem.brand;
        }

        if ($scope.editItem.model === undefined) {
            $scope.newItem.model = $scope.item.model;
        }
        else {
            $scope.newItem.model = $scope.editItem.model;
        }
        if ($scope.editItem.price === undefined) {
            $scope.newItem.price = $scope.item.price;
        }
        else {
            $scope.newItem.price = $scope.editItem.price;
        }
        $scope.newItem.category = $scope.item.category;
        console.log($scope.editItem);
        console.log($scope.item);

        var promise = itemService.editItem($scope.newItem);
        promise.then(function (result) {
            console.log('Edit  Item', result);
        });

        $uibModalInstance.close($scope.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}
var component = {
    templateUrl: 'main/categories/edit-item/edit-item.html',
    controller: appEditItemController,

};

angular
    .module('main')
    .component('appEdit', component)
  //  .controller('appEditItemController', appEditItemController);
