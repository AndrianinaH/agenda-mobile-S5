angular.module('starter.services', [])

.factory('Agenda', function($http) { 
    
    return{
       menuDujour: function(){
            return $http.get('http://localhost/angularResto/Accueil_controller/getMenuDuJour');
        },
        allProduit: function(){
            return $http.get('http://localhost/angularResto/Accueil_controller/getProduit');
        },
        allCategorie: function(){
            return $http.get('http://localhost/angularResto/Accueil_controller/getCategorie');
        }
    } 
});



