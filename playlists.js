var app = angular.module("VideoPlayer", ['jtt_youtube', 'ngCookies']);

app.controller('playlists', ['$scope', 'youtubeFactory','$http','$cookies',function($scope,youtubeFactory,$http,$cookies) {
    document.getElementById("afficher_playlists").style.display = "block";
    document.getElementById("lecture_playlist").style.display = "none";
    if($cookies.get('user')!=null){
        $http.get('http://localhost:8081/get_playlists/'+$cookies.get('user')).then(function(resp){
            $scope.playlist=resp.data;
        })
    }

    $scope.lecture=function(nom_playlist){
        var _apiKey = "AIzaSyAVOBfBEJ6qnKTEZ4u5o3pP66S9zUg1_2I";
        $scope.playlist = null
        $http.get('http://localhost:8081/get_playlist/'+$cookies.get('user')+'/'+nom_playlist)
        .then(function (cb) {
            document.getElementById("afficher_playlists").style.display = "none";
            document.getElementById("lecture_playlist").style.display = "block";
            $scope.videosliste = [];
            all_video=cb.data[0].videos;
            all_video.forEach(element => {
                youtubeFactory.getVideoById({
                    videoId: element,
                    key: _apiKey,
                }).then(function (_data) {
                    $scope.videosliste.push(_data.data.items[0]);
                });
            });
            $scope.playlist = cb.data[0].videos;
            $scope.videoID = cb.data[0].videos[0]
            $http.get('/watch/' + $scope.videoID)
                .then(function (cb) {
                    $scope.url = cb.data;
                    var video = document.getElementById("video");
                    video.load();
                })
        })
    }

    document.getElementById("video").addEventListener("ended", function () {
        playlist = $scope.playlist
        trouve = false
        next = null
        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i] == $scope.videoID && i != playlist.length - 1) {
                next = playlist[i + 1]
                trouve = true
            }
        }
        if (trouve == false) {
            next = playlist[0]
        }
        $scope.videoID = next
        $http.get('/watch/' + next)
            .then(function (cb) {
                $scope.url = cb.data;
                var video = document.getElementById("video");
                video.load();
            })
    });
    
}]);