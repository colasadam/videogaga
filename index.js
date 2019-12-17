var app = angular.module("VideoPlayer", ['jtt_youtube', 'ngCookies']);

app.controller('WebService', ['$scope', 'youtubeFactory','$http','$cookies',function($scope,youtubeFactory,$http,$cookies) {

    var _apiKey = "AIzaSyAVOBfBEJ6qnKTEZ4u5o3pP66S9zUg1_2I";
    document.getElementById("resultat_recherche").style.display = "block";
    document.getElementById("lecture_video").style.display = "none";
    $scope.rechercher=function(){
        youtubeFactory.getVideosFromSearchByParams({
            q: $scope.recherche,
            maxResults: "50",
            key: _apiKey,
        }).then(function (_data) {
            document.getElementById("resultat_recherche").style.display = "block";
            document.getElementById("lecture_video").style.display = "none";
            console.info("test", _data.data);
            $scope.videolist = _data.data;
            
        });
    }

    $scope.afficher=function(videoId){
        if($cookies.get("user")!=null){
            req={
                "utilisateur": $cookies.get("user")
            };
            $http.post('http://localhost:8082/get_historique',req).then(function(resp){
                array1=resp.data[0].videos;
                if(array1.length>=4){
                    array1.pop();
                }
                console.log(array1);
                array1.unshift(videoId);
                req={
                    "utilisateur" : $cookies.get("user"),
                    "videolist": array1
                }
                $http.post('http://localhost:8082/add_tohistorique',req).then(function(resp){
                });
            });
        }
        $http.get('/watch/' + videoId)
            .then(function (cb) {
                document.getElementById("resultat_recherche").style.display = "none";
                document.getElementById("lecture_video").style.display = "block";
                $scope.url = cb.data;
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


app.controller('Historique', ['$scope','$http', 'youtubeFactory','$cookies',function($scope, $http,youtubeFactory,$cookies) {

    var _apiKey = "AIzaSyAVOBfBEJ6qnKTEZ4u5o3pP66S9zUg1_2I";
    document.getElementById("historique").style.display = "block";
    document.getElementById("lecture_video").style.display = "none";

    if($cookies.get('user')!=null){
        req={
            "utilisateur": $cookies.get("user")
        };
        console.log(req)
    
        $http.post('http://localhost:8082/get_historique',req).then(function(resp){
            array1=resp.data[0].videos;
            //array1=["a1-1rHvEl7Q","KpjxyhaE4uU","6Fx1V7pqv9A"];
            $scope.historique=[];
            array1.forEach(video => {
                youtubeFactory.getVideoById({
                    videoId: video,
                    key: _apiKey,
                }).then(function (_data) {
                    $scope.historique.push(_data.data.items[0]);
                    console.log($scope.historique)
                });
            });
            
            
        });
    
    }
    
    $scope.lecture=function(videoId){
        $http.get('/watch/' + videoId)
            .then(function (cb) {
                console.log(cb);
                document.getElementById("historique").style.display = "none";
                document.getElementById("lecture_video").style.display = "block";
                $scope.url = cb.data;
                var video = document.getElementById("video");
                video.load();
            })
    }
   
}]);
