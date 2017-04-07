app.controller('posted_activities',['$scope','activities',function($scope,activities){
    activities.success(function(data)
    {
        $scope.description = data[];
    })
}])