angular.module('starter.services', [])

.factory('Agenda', function($http,$state) { 
    
    return{
        
        //------------- affichage image de profil -----------//
        getInitial: function(email){
            return email.charAt(0).toUpperCase();
        },
        getColor: function(){
            var num=Math.floor((Math.random() * 5) + 1);
            switch(num) {
              case 1:
                return "positive";
              case 2:
                return "calm";
              case 3:
                return "assertive";
              case 4:
                return "royal";
              case 5:
                return "energized";  
            }
        },
        //------------- test de login -----------//
        testUser: function(email,mdp)
        {
            return $http({
            method: "post",
            url: "http://localhost:8080/listeo/webservice/login.jsp",
            data: 'mail='+email+'&mdp='+mdp,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        },
         //------------- test de login -----------//
        createUser: function(nom,datenaissance,email,mdp)
        {
            return $http({
            method: "post",
            url: "http://localhost:8080/listeo/webservice/inscription.jsp",
            data: 'nom='+nom+'&dateNaiss='+datenaissance+'&mail='+email+'&pass='+mdp,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        },
    } 
});



