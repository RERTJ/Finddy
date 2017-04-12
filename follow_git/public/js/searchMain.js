// app.controller('searchMain', ['$scope', 'search', function($scope, search) {
//   search.then(function(response) {
//     $scope.activity = response.data;
//     console.log($scope.activity);
//
//   });
// }]);
app.controller('searchMain', function($scope, $http) {
  return $http.get("data/searchResult.json")
   .then(function (response)
   {
     $scope.activity = response.data;
     console.log($scope.activity)

   });
});


