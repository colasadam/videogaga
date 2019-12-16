var app = angular.module("VideoPlayer", ['jtt_youtube']);
app.controller('WebService', ['$scope', 'youtubeFactory', function($scope, youtubeFactory) {

    var _apiKey = "AIzaSyAVOBfBEJ6qnKTEZ4u5o3pP66S9zUg1_2I";

    $scope.rechercher=function(){
        console.log($scope.recherche);
        youtubeFactory.getVideosFromSearchByParams({
            q: $scope.recherche,
            maxResults: "50",
            key: _apiKey,
        }).then(function (_data) {
            console.info("test", _data.data);
            $scope.playlist = _data.data;
        });
    }

    youtubeFactory.getVideoById({
        videoId: "rG-haoIhH9o",
        key: _apiKey,
    }).then(function (_data) {
        console.info("video by id", _data);
    });

}]);

