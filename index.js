var app = angular.module("VideoPlayer", ['jtt_youtube', 'ngCookies']);

app.controller('WebService', ['$scope', 'youtubeFactory', '$http', '$cookies', '$window', function ($scope, youtubeFactory, $http, $cookies, $window) {

    $scope._apiKey =""
    $http.get('./config.json').then(function (resp) { 
        console.log($scope._apiKey)
        $scope._apiKey = resp.data.API_KEY
        console.log($scope._apiKey)
    })
    console.log($scope._apiKey)

    if ($cookies.get("user")) {
        $http.get('http://localhost:8081/get_playlists/' + $cookies.get("user"))
            .then(function (cb) {
                myplaylist = []
                for (var i = 0; i < cb.data.length; i++) {
                    myplaylist.push(cb.data[i]["name"])
                }
                $scope.playlists = myplaylist
            })

        document.getElementById("champ1").href = "page_historique.html";
        document.getElementById("champ1").text = "Historique";

        document.getElementById("champ2").href = "playlist.html";
        document.getElementById("champ2").text = "Mes Playlists";
        document.getElementById("deconnexion").style.display = "block";
        document.getElementById("champ3").style.display = "block";
    } else {
        document.getElementById("champ1").href = "inscription.html";
        document.getElementById("champ1").text = "S'inscrire";

        document.getElementById("champ2").href = "login.html";
        document.getElementById("champ2").text = "Se Connecter";
        console.log("test");
        document.getElementById("deconnexion").style.display = "none";
        document.getElementById("champ3").style.display = "none";
    }

    if (document.getElementById("resultat_recherche") != null) {
        document.getElementById("resultat_recherche").style.display = "block";
        document.getElementById("lecture_video").style.display = "none";
    }

    $scope.rechercher = function () {

        youtubeFactory.getVideosFromSearchByParams({
            q: $scope.recherche,
            maxResults: "50",
            key: $scope._apiKey,
        }).then(function (_data) {
            document.getElementById("resultat_recherche").style.display = "block";
            document.getElementById("lecture_video").style.display = "none";
            console.info("test", _data.data);
            $scope.videolist = _data.data;

        });
    }

    $scope.afficher = function (videoId) {
        $scope.videoId = videoId
        if ($cookies.get("user") != null) {
            req = {
                "utilisateur": $cookies.get("user")
            };
            $http.post('http://localhost:8082/get_historique', req).then(function (resp) {
                array1 = resp.data[0].videos;
                if (array1.length >= 4) {
                    array1.pop();
                }
                console.log(array1);
                array1.unshift(videoId);
                req = {
                    "utilisateur": $cookies.get("user"),
                    "videolist": array1
                }
                $http.post('http://localhost:8082/add_tohistorique', req).then(function (resp) {
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

    $scope.addvideo = function (nameplaylist) {
        console.log(nameplaylist)
        $http.post('http://localhost:8081/addto_playlist/' + $cookies.get("user") + '/' + nameplaylist + '/' + $scope.videoId)
            .then(function (resp) {
                window.alert("video ajouté à " + nameplaylist)
            })
    }

    $scope.deconnexion = function () {
        $cookies.remove('user');
        $window.location = "http://localhost:8080/";
    }

}]);


app.controller('Historique', ['$scope', '$http', 'youtubeFactory', '$cookies', function ($scope, $http, youtubeFactory, $cookies) {

    $scope._apiKey =""
    $http.get('./config.json').then(function (resp) { 
        console.log($scope._apiKey)
        $scope._apiKey = resp.data.API_KEY
        console.log($scope._apiKey)
    })
    document.getElementById("historique").style.display = "block";
    document.getElementById("lecture_video").style.display = "none";

    if ($cookies.get('user') != null) {
        req = {
            "utilisateur": $cookies.get("user")
        };
        console.log(req)

        $http.post('http://localhost:8082/get_historique', req).then(function (resp) {
            array1 = resp.data[0].videos;
            //array1=["a1-1rHvEl7Q","KpjxyhaE4uU","6Fx1V7pqv9A"];
            $scope.historique = [];
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

    $scope.lecture = function (videoId) {
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


app.controller('playlists', ['$scope', 'youtubeFactory', '$http', '$cookies', function ($scope, youtubeFactory, $http, $cookies) {
    document.getElementById("afficher_playlists").style.display = "block";
    document.getElementById("lecture_playlist").style.display = "none";
    if ($cookies.get('user') != null) {
        $http.get('http://localhost:8081/get_playlists/' + $cookies.get('user')).then(function (resp) {
            $scope.playlist = resp.data;
        })
    }

    $scope.lecture = function (nom_playlist) {
        var _apiKey = "AIzaSyAVOBfBEJ6qnKTEZ4u5o3pP66S9zUg1_2I";
        $scope.playlist = null
        $http.get('http://localhost:8081/get_playlist/' + $cookies.get('user') + '/' + nom_playlist)
            .then(function (cb) {
                document.getElementById("afficher_playlists").style.display = "none";
                document.getElementById("lecture_playlist").style.display = "block";
                $scope.videosliste = [];
                all_video = cb.data[0].videos;
                all_video.forEach(element => {
                    youtubeFactory.getVideoById({
                        videoId: element,
                        key: $scope._apiKey,
                    }).then(function (_data) {
                        console.log(_data)
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

    $scope.lecture_playlist = function (videoId) {
        $http.get('/watch/' + videoId)
            .then(function (cb) {
                $scope.url = cb.data;
                var video = document.getElementById("video");
                video.load();
            })
    }

    $scope.supprimer_playlist = function (nom) {
        $http.post('http://localhost:8081/delete_playlist/' + $cookies.get('user') + '/' + nom).then(function (cb) {
            document.location.reload(true);
        })
    }

    $scope.creer_playlist = function () {
        var nom = document.getElementById("nom_playlist").value;
        $http.post('http://localhost:8081/add_playlist/' + $cookies.get('user') + '/' + nom).then(function (cb) {
            document.location.reload(true);
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
        $scope.url = "videos/"+$scope.videoID+".mp4";
        var video = document.getElementById("video");
        video.load();
    });

}]);

app.controller('Compte', ['$scope', 'youtubeFactory', '$http', '$cookies', function ($scope, youtubeFactory, $http, $cookies) {

    $scope.change = function () {
        password = document.getElementById("password").value;
        password2 = document.getElementById("password2").value;
        console.log(password2)
        console.log(password)
        if (password == "" || password2 == "") {
            window.alert("veillez remplir les champs")
        }
        else {
            if (password == password2) {
                $cookies.get('user')
                $http.post('http://localhost:8083/change/' + $cookies.get('user') + '/' + password).then(function (cb) {
                    if (cb = "OK") {
                        window.alert("mot de passe modifié")
                        window.location.replace("/");
                    }
                })
            }
            else {
                window.alert("mot de passes différents")
            }
        }
    }
}]);