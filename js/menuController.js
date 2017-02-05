angular.module("menuController", [])

//------------------------------------------- login et inscription -------------------------------------//
.controller('inscriptionController', function($scope,$state,ionicDatePicker, Agenda) {
  //---------------------- Date picker -----------------------//  
    var cible = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.icon="";
        $scope.datepick=null;
        $scope.datepick= new Date(val).toLocaleDateString("fr-FR");
      },
    };
    $scope.openPopoverenDatePicker = function(){
       $scope.icon="-android";
      ionicDatePicker.openDatePicker(cible);
    }; 

    //------------------- sign in -------------------//
    $scope.signin=function(user){ 
      if(user)
      {
        if(user.username != undefined && user.username!="")
        {
          console.log(user.username);
          if($scope.datepick != undefined && $scope.datepick!="")
          {
            console.log($scope.datepick); 
            if(user.email!= undefined && user.email!="")
            {
              console.log(user.email); 
              if(user.password!= undefined && user.password!="")
              {
                console.log(user.password);
                Agenda.createUser(user.username,$scope.datepick,user.email,user.password)
                .then(function success(response) {
                  var rep=response.data;
                  console.log(rep);
                  if(!rep.value)
                  {
                    console.log("return ajax error "+rep);
                    $scope.error="inscription echouer";
                  }
                  else
                  {
                    console.log("return ajax success "+rep);
                    //----------- réinitialisation des champs --------//
                    user.username=null;
                    user.email=null;
                    $scope.datepick=null;
                    $scope.error=null;
                    user.password=null;
                    $state.go('tab.signinSuccess',{success:1}); 
                  }
                
              });

              }else $scope.error="Le champs [Mot de passe] est vide";
            }else $scope.error="Le champs [Adresse e-mail] est invalide";
          }else $scope.error="Le champs [Date de naissance] est vide";
        }else $scope.error="Le champs [Nom d'utilisateur] est vide";
      }else $scope.error="Tous les champs sont vide"; 
   };   
})

.controller('loginController', function($scope,$stateParams,$state,$window,Agenda,$rootScope) { 
    //inscription reussi
    if($stateParams.success==1)$scope.error="Inscription réussi";
    $scope.connect=function(user){
      if(user)
      {
        if(user.email!= undefined && user.email!="")
        {
          console.log(user.email); 
          if(user.password!= undefined && user.password!="")
          {
            console.log(user.password);
            //-------- webservice testUser -----------// 
            Agenda.testUser(user.email,user.password).then(function success(response) {  
                var rep=response.data;
                console.log(rep);
                if(!rep.value)
                {
                  console.log("return ajax error "+rep);
                  $scope.error="authentification echouer";
                }
                else
                {
                  console.log("return ajax success "+rep);
                  $rootScope.User=rep;
                  //---- vider le formulaire une fois connecter 
                  user.email=null;
                  user.password=null;
                  $scope.error=null;
                  $state.go('menu.profil'); 
                }
              
            });
          }else $scope.error="Le champs [Mot de passe] est vide";
        }else $scope.error="Le champs [Adresse e-mail] est invalide";
      }else $scope.error="Tous les champs sont vide";
    };  
})
.controller('deconnexionController', function($scope,$rootScope,$state) {
  $scope.logout=function(){
    $rootScope.User=null;
    $state.go('tab.login');
  };  
})
//---------------------------------------- menu principal -----------------------------------------//
.controller('menuCtrl', function($scope,$state,$ionicPopover,ionicDatePicker,ionicTimePicker,Agenda,$rootScope) {
  //----------------- color and initial photo de profil --------//
  $scope.$on('$ionicView.enter', function(e) {
    var user=$rootScope.User;
    $scope.initial=Agenda.getInitial(user.mail);
    $scope.color=Agenda.getColor();
  });
  //----------------- popover profil and log out ---------------//
  $ionicPopover.fromTemplateUrl('popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
 
  //--------------------- Editer la liste ---------------------//
  //------- popover editer list ---------//
  $ionicPopover.fromTemplateUrl('templates/editList.html', {
    scope: $scope
  }).then(function(popover2) {
    $scope.popover2 = popover2;
  });
  $scope.openEditList=function($event){
    $scope.popover2.show($event);
  };
  //------------------------- get TaskBox by idUser -------------------------//
  $scope.$on('$ionicView.enter', function(e) {
    var user=$rootScope.User;
    Agenda.getTaskBox(user.id).then(function success(response) {
      $scope.home=response.data[0];
      var allTaskBox=[];
      for(var i = 1; i < response.data.length ; i++) {
        allTaskBox.push(response.data[i]);
      }
      $scope.allTaskBox=allTaskBox;
      Agenda.getTaskAujourdhui(user.id).then(function success(response) {
          $scope.nbrAujourdhui=response.data.length;
      });
      Agenda.getTaskSemaine(user.id).then(function success(response) {
          $scope.nbrSemaine=response.data.length;
      });
     
    });
  });
})

.controller('profilController', function($scope,$ionicModal,Agenda,$rootScope) {
  //------------- ajouter info User ----------------//
  $scope.$on('$ionicView.enter', function(e) {
    var user=$rootScope.User;
    $scope.initial=Agenda.getInitial(user.mail);
    $scope.color=Agenda.getColor();
    $scope.username=user.nom;
    $scope.usermail=user.mail;
    $scope.userbirthday=new Date(user.dateNaissance.iLocalMillis).toLocaleDateString("fr-FR");
    $scope.usersignin=new Date(user.dateInsertion.iLocalMillis).toLocaleDateString("fr-FR");
  });
})


.controller('editListController', function($scope,$rootScope,$state) {
  $scope.closeEditList = function() {
    $scope.popover2.hide();
  };
})
.controller('homeController', function($scope,$ionicModal,$rootScope,Agenda,$stateParams) { 
  //------------------ popup create task ----------------//
  $ionicModal.fromTemplateUrl('templates/createTask.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //------------------------- get task by idTaskBox -------------------------//
  $scope.$on('$ionicView.enter', function(e) {
    var user=$rootScope.User;
    var idTaskBox=$stateParams.idTaskBox;
    $rootScope.idTaskBox=idTaskBox;
    $scope.nomTaskBox=$stateParams.nomTaskBox;
    Agenda.getTaskNonFait(idTaskBox).then(function success(response) {
      console.log(response.data);
      $scope.allTask=response.data;
    });
  });

  //---------------------------- terminer tache ----------------------------//
  $scope.terminerTache = function(idTask){
    Agenda.terminerTache(idTask).then(function success(response) {
      $state.go('menu.archive');
    });
  };
})

.controller('archiveController', function($scope,$ionicModal,Agenda,$rootScope,$stateParams) {
  //------------------------- Voir les taches terminer -------------------------//
  $scope.$on('$ionicView.enter', function(e) {
    var user=$rootScope.User;
    Agenda.getArchive(user.id).then(function success(response) {
        console.log(response.data);
        $scope.allArchive=response.data;
    });
  });
})
//--------------------------- Voir les taches de la semaine --------------------//
.controller('semaineController', function($scope,$ionicModal,Agenda,$rootScope,$stateParams,$state) { 
  //------------------ popup create task ----------------//
  $ionicModal.fromTemplateUrl('templates/createTask.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  if($stateParams.type==1)
  {
    //------------------ Voir les taches d'aujourd'hui ----------------//
    $scope.$on('$ionicView.enter', function(e) {
      var user=$rootScope.User;
      var idTaskBox=$stateParams.idTaskBox;
      $rootScope.idTaskBox=idTaskBox;
      $scope.nomTaskBox="Aujourd'hui";
      Agenda.getTaskAujourdhui(user.id).then(function success(response) {
          console.log(response.data);
          $scope.allTask=response.data;
      });
    });
  }
 
  else if($stateParams.type==2)
  {
     //------------------ Voir les taches de la semaine ----------------//
    $scope.$on('$ionicView.enter', function(e) {
      var user=$rootScope.User;
      var idTaskBox=$stateParams.idTaskBox;
      $rootScope.idTaskBox=idTaskBox;
      $scope.nomTaskBox="Semaine";
      Agenda.getTaskSemaine(user.id).then(function success(response) {
          console.log(response.data);
          $scope.allTask=response.data;
      });
    });
  }
  //---------------------------- terminer tache ----------------------------//
  $scope.terminerTache = function(idTask){
    Agenda.terminerTache(idTask).then(function success(response) {
      $state.go('menu.archive');
    });
  };
})

.controller('taskDetailController', function($scope,$ionicModal,ionicDatePicker,ionicTimePicker,$rootScope,$stateParams,Agenda) { 
  $scope.$on('$ionicView.enter', function(e) {
    var idTache=$stateParams.idtask;
    $scope.nomTache=$stateParams.nomtask;

    var dateLimit=$stateParams.echeancetask.split(" ");
    var dateRappel=$stateParams.rappeltask.split(" ");

    $scope.datepick= dateLimit[0];
    $scope.timepick= dateLimit[1];

    $scope.datepick2= dateRappel[0];
    $scope.timepick2= dateRappel[1];

    $scope.detail=$stateParams.detailtask;
  });
   //--------------------------- date picker -------------------------//
    var cible = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.iconDate="";
         console.log($scope.datepick);
        $scope.datepick=null;
        console.log($scope.datepick);
        $scope.datepick= new Date(val).toLocaleDateString("fr-FR");
        console.log($scope.datepick);
      },
    };
     var cible2 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.iconDate2="";
        $scope.datepick2=null;
        $scope.datepick2= new Date(val).toLocaleDateString("fr-FR");
      },
    };
    $scope.openPopoverDatePicker = function(){
      $scope.iconDate="-android";
      ionicDatePicker.openDatePicker(cible);
    }; 
    $scope.openPopoverDatePicker2 = function(){
       $scope.iconDate2="-android";
      ionicDatePicker.openDatePicker(cible2);
    }; 
    //-------------------- time picker ------------------//
    var cibleHeure = {
      callback: function (val) {      //Mandatory
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.iconTime="";
         selectedTime.setHours(selectedTime.getHours()-3);
        $scope.timepick=selectedTime.toLocaleTimeString("fr-FR");
      },
    };
    var cibleHeure2 = {
      callback: function (val) {      //Mandatory
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        $scope.iconTime2="";
        selectedTime.setHours(selectedTime.getHours()-3);
       $scope.timepick2=selectedTime.toLocaleTimeString("fr-FR");
      },
    };
    $scope.openPopoverTimePicker = function(){
      $scope.iconTime="-outline";
      ionicTimePicker.openTimePicker(cibleHeure);
    }; 
    $scope.openPopoverTimePicker2 = function(){
      $scope.iconTime2="-outline";
      ionicTimePicker.openTimePicker(cibleHeure2);
    }; 
   
})

.controller('taskDetailArchiveController', function($scope,$stateParams,$rootScope,Agenda,$state) {
  $scope.$on('$ionicView.enter', function(e) {
    var idTache=$stateParams.idtask; 
    $scope.nomTache=$stateParams.nomtask;

    var dateLimit=$stateParams.echeancetask.split(" ");
    var dateRappel=$stateParams.rappeltask.split(" ");

    $scope.datepick= dateLimit[0];
    $scope.timepick= dateLimit[1];

    $scope.datepick2= dateRappel[0];
    $scope.timepick2= dateRappel[1];

    $scope.detail=$stateParams.detailtask;
  });
  
  //---------------------------- restaurer tache ----------------------------//
  $scope.restaurerTache = function(){
    var idTache=$stateParams.idtask; 
    Agenda.restaurerTache(idTache).then(function success(response) {
      $state.go('menu.home',{idTaskBox:$stateParams.idTaskBox,nomTaskBox:$stateParams.nomTaskBox});
    });
  };
})

.controller('createTaskController', function($scope,$state,ionicDatePicker,ionicTimePicker,$rootScope,Agenda) { 
  //--------------------------- date picker -------------------------//
  var cible = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      $scope.iconDate=""; 
      $scope.datepick=null;
      $scope.datepick= new Date(val).toLocaleDateString("fr-FR");
    },
  };
   var cible2 = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      $scope.iconDate2="";
      $scope.datepick2=null;
      $scope.datepick2= new Date(val).toLocaleDateString("fr-FR");
    },
  };
  $scope.openPopoverenDatePicker = function(){
    $scope.iconDate="-android";
    ionicDatePicker.openDatePicker(cible);
  }; 
  $scope.openPopoverenDatePicker2 = function(){
     $scope.iconDate2="-android";
    ionicDatePicker.openDatePicker(cible2);
  }; 
  //------------------------- time picker -------------------------//
  var cibleHeure = {
    callback: function (val) {      //Mandatory
      var selectedTime = new Date(val * 1000);
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      $scope.iconTime="";
      selectedTime.setHours(selectedTime.getHours()-3);
      $scope.timepick=selectedTime.toLocaleTimeString("fr-FR");
    },
  };
  var cibleHeure2 = {
    callback: function (val) {      //Mandatory
      var selectedTime = new Date(val * 1000);
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
      $scope.iconTime2="";
      selectedTime.setHours(selectedTime.getHours()-3);
     $scope.timepick2=selectedTime.toLocaleTimeString("fr-FR");
    },
  };
  $scope.openPopoverenTimePicker = function(){
    $scope.iconTime="-outline";
    ionicTimePicker.openTimePicker(cibleHeure);
  }; 
  $scope.openPopoverenTimePicker2 = function(){
    $scope.iconTime2="-outline";
    ionicTimePicker.openTimePicker(cibleHeure2);
  }; 

  //-------------------- métier create task -----------------------//
    $scope.createTask=function(task){
      var idTaskBox=$rootScope.idTaskBox;
      console.log(idTaskBox);
      if(task)
      {
        if(task.name!= undefined && task.name!="")
        {
          console.log(task.name); 
          if($scope.datepick!= undefined && $scope.datepick!="")
          {
            console.log($scope.datepick);
            if($scope.timepick!= undefined && $scope.timepick!="")
            {
              console.log($scope.timepick);
              if($scope.datepick2!= undefined && $scope.datepick2!="")
              {
                console.log($scope.datepick2);
                if($scope.timepick2!= undefined && $scope.timepick2!="")
                {
                  console.log($scope.timepick2);
                  if(task.detail!= undefined && task.detail!="")
                  {
                    console.log(task.detail);
                    //-------------- réinitialisation des champs ---------//
                    task.name="";
                    task.detail="";
                    $scope.datepick=null;
                    $scope.timepick=null;
                    $scope.datepick2=null;
                    $scope.timepick2=null;
                    $scope.error="";
                    // -----------------appeler service create task sisa
                    $scope.modal.hide();  
                     
                  }else $scope.error="Le champs [Détail de la tâche] est vide"; 
                }else $scope.error="L'heure de rappel est vide";
              }else $scope.error="La date de rappel est vide";  
            }else $scope.error="L'heure d'échéance est vide";
          }else $scope.error="La date d'échéance est vide";
        }else $scope.error="Le champs [Nom de la tâche] est vide";
      }
      else $scope.error="Tous les champs sont vide";
   }; 
});




