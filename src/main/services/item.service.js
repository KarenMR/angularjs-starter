angular
    .module('main')
    .factory('itemService', itemService);

function itemService($log, $q, $resource) {
    return {
        getItem: getItem,
        addItem: addItem
    };



    function getItem() {
        var resource = $resource('http://localhost:9000/items')
        $log.info('Running getItem');
        var future = $q.defer();
        resource.query().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };

    function addItem(item) {
        var future = $q.defer();
        resource.save().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };
}
