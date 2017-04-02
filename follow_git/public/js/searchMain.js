app.controller('MainController', ['$scope', 'search', function($scope, search) {
  forecast.success(function(data) {
    $scope.activity = data;
  });
}]);
