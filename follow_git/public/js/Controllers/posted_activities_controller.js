app.controller('posted_activities_controller',function($scope,$http){
    return $http.get("../activities_json/activities.json")
    .then(function (response)
    {
        $scope.activities = response.data;
        console.log($scope.activities);
    });
});