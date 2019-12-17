var appConnexion = angular.module('appConnexion', ['ngCookies']);

function mainController($scope, $http, $window,$cookies) {
    
    $scope.login = function(){
        user = document.getElementById("login").value
        password = document.getElementById("password").value
        console.log(user)
        $http.post("http://localhost:8083/login/"+user+"/"+password)
            .success(function(cb){
                console.log(cb)
                if (cb =="OK"){
                    $cookies.user = user
                    document.location.href = "/"
                }
                else{
                    window.alert("Identifiant ou mot de passe incorrect")
                }
            })
    }
}