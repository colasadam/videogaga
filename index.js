var app = angular.module("VideoPlayer", ['jtt_youtube']);

app.controller('WebService', ['$scope', 'youtubeFactory','$http', '$window',function($scope,youtubeFactory,$http,$window) {

    var _apiKey = "AIzaSyAVOBfBEJ6qnKTEZ4u5o3pP66S9zUg1_2I";
    document.getElementById("resultat_recherche").style.display = "block";
    document.getElementById("lecture_video").style.display = "none";
    $scope.rechercher=function(){
        console.log($scope.recherche);
        youtubeFactory.getVideosFromSearchByParams({
            q: $scope.recherche,
            maxResults: "50",
            key: _apiKey,
        }).then(function (_data) {
            document.getElementById("resultat_recherche").style.display = "block";
            document.getElementById("lecture_video").style.display = "none";
            console.info("test", _data.data);
            $scope.playlist = _data.data;
        });
    }

    $scope.afficher=function(videoId){
        $http.get('/watch/' + videoId)
            .success(function (cb) {
                document.getElementById("resultat_recherche").style.display = "none";
                document.getElementById("lecture_video").style.display = "block";
                $scope.url = cb;
                var video = document.getElementById("video");
                video.load();
            })
    }

    /*youtubeFactory.getVideoById({
        videoId: "rG-haoIhH9o",
        key: _apiKey,
    }).then(function (_data) {
        console.info("video by id", _data);
    });*/

}]);

