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
                    document.location.href = "/"
                }
                else{
                    window.alert("Identifiant ou mot de passe incorrect")
                }
            })
    }

    $scope.inscription = function(){
        user = document.getElementById("login").value
        password = document.getElementById("password").value
        password2 = document.getElementById("password2").value
        console.log(user)
        console.log(password)
        if(password2==password && password!="" && user!=""){
            $http.post("http://localhost:8083/add_user/"+user+"/"+password)
            .then(function(cb){
                console.log(cb)
                if(cb.data == "utilisateur déjâ existant"){
                    window.alert("utilisateur déjâ existant")
                }
                else{
                    if (cb.data !=null){
                        $http.post("http://localhost:8082/addhistorique/"+user)
                        $cookies.put('user', user);
                        //$cookies.user = user
                        document.location.href = "/"
                    } 
                }
            })
        }
        else{
            if(user =="" || password == ""){
                window.alert("Veillez remplir les champs")
            }
            else{
                window.alert("Mots de passe différents")
            }
            
        }

    }
}]);