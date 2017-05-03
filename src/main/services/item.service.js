angular
    .module('main')
    .factory('itemService', itemService);

function itemService($log, $q, $resource) {
    var resource = $resource('http://localhost:9000/items/:id',
        { id: '@id' },
        {
            update: {
                method: 'PUT'
            }
        });

    return {
        getItem: getItem,
        getItems: getItems,
        addItem: addItem,
        removeItem: removeItem,
        editItem: editItem
    };

    function getItem(id) {
        $log.info('Running getItem');
        var future = $q.defer();
        resource.get({ id: id }).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };
    function getItems() {
        $log.info('Running getItems');
        var future = $q.defer();
        resource.query().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };
    function removeItem(item) {
        var future = $q.defer();
        $log.info('Running remove service: ', item);

        resource.delete({ 'id': item.id }).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };

    function editItem(item) {
        var future = $q.defer();
        $log.info('Running edit service: ', item);

        resource.update({ 'id': item.id }, item).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };

    function addItem(item) {
        var future = $q.defer();
        resource.save(item).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };
}
