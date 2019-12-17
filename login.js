var appConnexion = angular.module('appConnexion', ['ngCookies']);

appConnexion.controller('mainController', ['$scope','$http','$cookies',function($scope,$http,$cookies) {
    
    $scope.login = function(){
        user = document.getElementById("login").value
        password = document.getElementById("password").value
        console.log(user)
        $http.post("http://localhost:8083/login/"+user+"/"+password)
            .then(function(cb){
                console.log(cb)
                if (cb.data =="OK"){
                    $cookies.put('user', user);
                    //$cookies.user = user
                    document.location.href = "/"
                }
                else{
                    window.alert("Identifiant ou mot de passe incorrect")
                }
            })
    }
}]);