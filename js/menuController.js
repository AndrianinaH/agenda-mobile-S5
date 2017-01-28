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
    $scope.signin=function(){ 
      $state.go('menu.home');
   };   
})

.controller('loginController', function($scope,$state,$window) { 
   $scope.connect=function(user){
    console.log(user.email); 
    console.log(user.password); 
      $state.go('menu.profil');
   };  
})

//---------------------------------------- menu principal -----------------------------------------//
.controller('menuCtrl', function($scope, $ionicPopover,ionicDatePicker,ionicTimePicker) {
  //----------------- popover create task -------------//
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
   //Cleanup the popover when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.popover.remove();
   });
   // Execute action on hide popover
   $scope.$on('popover.hidden', function() {
      // Execute action
   });
   // Execute action on remove popover
   $scope.$on('popover.removed', function() {
      // Execute action
   });
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
    $scope.openPopoverenTimePicker = function(){
      $scope.iconTime="-outline";
      ionicTimePicker.openTimePicker(cibleHeure);
    }; 
    $scope.openPopoverenTimePicker2 = function(){
      $scope.iconTime2="-outline";
      ionicTimePicker.openTimePicker(cibleHeure2);
    }; 
})

.controller('ajoutTacheController', function($scope) { 
})
.controller('profilController', function($scope,$ionicModal) {
  $ionicModal.fromTemplateUrl('templates/createTask.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
})
.controller('homeController', function($scope,$ionicModal) { 
  //------------------ popup create task ----------------//
  $ionicModal.fromTemplateUrl('templates/createTask.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //----------------- terminer tache -----------------//
})

.controller('archiveController', function($scope,$ionicModal) { 
  //------------------ popup create task ----------------//
  $ionicModal.fromTemplateUrl('templates/createTask.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
    //---------------- voir tache terminer ------------//
})

.controller('taskDetailController', function($scope,$ionicModal,ionicDatePicker,ionicTimePicker) { 
  $scope.datepick= "22/12/2017";
  $scope.timepick= "22:00";

  $scope.datepick2= "24/12/2017";
  $scope.timepick2= "12:40";
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
   
});




