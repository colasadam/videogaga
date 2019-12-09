var app = angular.module("VideoPlayer", ['jtt_youtube']);
app.controller('WebService', ['$scope', 'youtubeFactory', function($scope, $http,youtubeFactory) {

    var _apiKey = "...";
    req="adam";

    $http.get('/get_historique',req).then(function(resp){
        youtubeFactory.getVideoById({
            videoId: "rG-haoIhH9o",
            key: _apiKey,
        }).then(function (_data) {
            $scope.historique=_data.data;
        });
    })
   
}]);