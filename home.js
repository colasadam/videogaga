var appConnexion = angular.module('appConnexion', []);

function mainController($scope, $http, $window) { 

    $scope.url = "https://r3---sn-gxo5uxg-jqbe.googlevideo.com/videoplayback?expire=1576011526&ei=prLvXY_iCpfo1gbX9oTACw&ip=147.94.134.31&id=o-ABQkRLWdpZTqSKKX_8cgyOzq_VM08ZlCFJrt7X3pVuUN&itag=134&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&mm=31%2C29&mn=sn-gxo5uxg-jqbe%2Csn-25ge7nse&ms=au%2Crdu&mv=m&mvi=2&pcm2cms=yes&pl=23&initcwndbps=1096250&mime=video%2Fmp4&gir=yes&clen=2657401&dur=281.960&lmt=1575222594736321&mt=1575989808&fvip=6&keepalive=yes&fexp=23842630&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=ALgxI2wwRQIgX5jbf76ipX29osI526CEoIDEITtsnKe5Fnf25KhPjHMCIQDeqcWOEZOHpqsFtqx58nYY4EdWSpyQOPOyWwi5Hcu__A%3D%3D&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AHylml4wRgIhAKTZry1e3hGhjgJrVACkaekUukv0vGccTcmM-4FYx6iJAiEA2CJdpBQy2rSKzIV_MVD_35d2KEPeqSLH2jZhBW7rLF8%3D&ratebypass=yes";

    $scope.getvideo = function () {
        console.log("test js")
        console.log($scope.videoID)
        $http.get('/watch/' + $scope.videoID)
            .success(function (cb) {
                $scope.url=cb;
                console.log("Succesfully POST le cookie /");
                console.log(cb);
                console.log("test api")
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

    document.getElementById("video").addEventListener("ended",function() {
        $http.get('/watch/' + "g_JNlOv2Eec")
            .success(function(cb){
                $scope.url=cb;
                var video = document.getElementById("video");
                video.load();
            })
    });

}
