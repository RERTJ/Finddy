app.factory('posted_activities',['$http',function($http){
    return $http.get('activities_json/activities.json')
            .success(function (activities){
                return activities;
            });
}]);