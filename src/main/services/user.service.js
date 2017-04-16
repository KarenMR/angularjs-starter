angular
    .module('main')
    .factory('userService', userService);

function userService($log, $q, $resource) {
    var resource = $resource('http://localhost:9001/users')

    return {
        getUser: getUser,
        addUser: addUser,
        loginUser: loginUser
    };

    function getUser() {
        $log.info('Running getUser');
        var future = $q.defer();
        resource.query().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };

    function addUser(addUser) {
        var future = $q.defer();
        resource.save().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    };

    function loginUser(user) {
        $log.info('Running loginUser');
        var future = $q.defer();
        resource.query({'name': user.name }, { 'pass': user.pass }).$promise.then(function (result) {
            console.log('query', result)
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }
}