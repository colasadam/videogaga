var appConnexion = angular.module('appConnexion', []);

function mainController($scope, $http, $window) { 

    $scope.getvideo = function () {
        console.log("test js")
        console.log($scope.videoID)
        $http.get('/watch/' + $scope.videoID)
            .success(function (cb) {
                console.log("Succesfully POST le cookie /");
                console.log(cb);
                console.log("test api")
                var video = document.getElementById("video")
                video.pause();
                var videosource = document.getElementById("videosource");
                console.log(cb)
                videosource.setAttribute('src', cb)
                console.log(videosource.getAttribute('src'))
                video.load();
                video.play();
            })
            .error(function () {
                console.log("Error");
            })
    }
}