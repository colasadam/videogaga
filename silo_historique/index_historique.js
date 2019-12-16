var app = angular.module("VideoPlayerHistorique", ['jtt_youtube']);
app.controller('Historique', ['$scope','$http', 'youtubeFactory',function($scope, $http,youtubeFactory) {

    var _apiKey = "...";
    req={
        "utilisateur":"adam"
    };
    

    $http.post('/get_historique',req).then(function(resp){
        console.log(resp.data[0].videos);
        array1=["","",""];
        array1.forEach(video => {
            youtubeFactory.getVideoById({
                videoId: video,
                key: _apiKey,
            }).then(function (_data) {
                console.log("ok");
                $scope.historique=_data.data;
            });
        });
        
    })

    
   
}]);