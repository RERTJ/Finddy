app.factory('search', ['$http', function($http) {
  return $http.get()
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
