var app = angular.module("VideoPlayerHistorique", ['jtt_youtube','ngCookies']);
app.controller('Historique', ['$scope','$http', 'youtubeFactory',function($scope, $http,youtubeFactory,$cookies) {

    var _apiKey = "AIzaSyAVOBfBEJ6qnKTEZ4u5o3pP66S9zUg1_2I";
    if($cookies['user']!=null){
        req={
            "utilisateur": $cookies.user
        };
        
    
        $http.post('http://localhost:8082/get_historique',req).then(function(resp){
            //array1=resp.data[0].videos;
            array1=["a1-1rHvEl7Q","KpjxyhaE4uU","6Fx1V7pqv9A"];
            $scope.historique=[];
            array1.forEach(video => {
                youtubeFactory.getVideoById({
                    videoId: video,
                    key: _apiKey,
                }).then(function (_data) {
                    $scope.historique.push(_data.data.items[0]);
                });
            });
            
            
        });
    
    }
    
    $scope.ajouter_historique = function (id) {
        $http.post('http://localhost:8082/get_historique',req).then(function(resp){
            array1=resp.data[0].videos;
            console.log(array1);
            if(array1.length>=4){
                array1.pop();
            }
            console.log(array1);
            array1.unshift(id);
            req={
                "utilisateur" : "adam",
                "videolist": array1
            }
            console.log(array1)
            $http.post('http://localhost:8082/add_tohistorique',req).then(function(resp){
                console.log(resp);
            });
        });
        

    };

    
   
}]);