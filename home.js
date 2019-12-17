var appConnexion = angular.module('appConnexion', ['ngCookies']);

function mainController($scope, $http, $window,$cookies) {

    $scope.playlist = null
    $http.get('http://localhost:8081/get_playlist/adam/test')
        .success(function (cb) {
            console.log(cb[0].videos)
            $scope.playlist = cb[0].videos
            $scope.videoID = cb[0].videos[0]
            $http.get('/watch/' + $scope.videoID)
                .success(function (cb) {
                    $scope.url = cb;
                    var video = document.getElementById("video");
                    video.load();
                })
        })




    $scope.getvideo = function () {
        $http.get('/watch/' + $scope.videoID)
            .success(function (cb) {
                $scope.url = cb;
                /*var video = document.getElementById("video")
                video.pause();
                var videosource = document.getElementById("videosource");
                console.log(cb)
                videosource.setAttribute('src', cb)
                console.log(videosource.getAttribute('src'))
                video.load();
                video.play();*/
                var video = document.getElementById("video");
                video.load();
            })
            .error(function () {
                console.log("Error");
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
            .success(function (cb) {
                $scope.url = cb;
                var video = document.getElementById("video");
                video.load();
            })
    });



}
