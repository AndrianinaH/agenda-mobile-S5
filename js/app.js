// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'menuController', 'starter.services', 'ionic-datepicker', 'ionic-timepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
       setLabel: 'Choisir',
      closeLabel: 'Fermer',
      dateFormat: 'dd MMM yyyy',
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],  
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
.config(function (ionicTimePickerProvider) {
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 24,
      step: 5,
      setLabel: 'Choisir',
      closeLabel: 'Fermer'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
  })
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive

  //----------------- login et inscription ---------------------//
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/login/tabs.html'
  })


  .state('tab.inscription', {
    url: '/inscription',
    views: {
      'inscription': {
        templateUrl: 'templates/login/inscription.html',
        controller: 'inscriptionController'
      }
    }
  })

  .state('tab.login', {
    url: '/login',
    views: {
      'login': {
        templateUrl: 'templates/login/login.html',
        controller: 'loginController'
      }
    }
  })

  //----------------- menu principal ---------------------//
  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })
  .state('menu.profil', {
    url: '/profil',
    views: {
      'menuContent': {
        templateUrl: 'templates/profil.html',
        controller: 'profilController'
      }
    }
  })
  //-------------- Liste des tâches --------------//
  .state('menu.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeController'
      }
    }
  })
  .state('menu.archive', {
    url: '/archive',
    views: {
      'menuContent': {
        templateUrl: 'templates/archive.html',
        controller: 'archiveController'
      }
    }
  })
  //------------ détails des tâches ---------------//
  .state('menu.taskDetail', {
    url: '/taskDetail/:idtask',
    views: {
      'menuContent': {
        templateUrl: 'templates/taskDetail.html',
        controller: 'taskDetailController'
      }
    }
  })

  .state('menu.taskDetailArchive', {
    url: '/taskDetailArchive/:idtask',
    views: {
      'menuContent': {
        templateUrl: 'templates/taskDetailArchive.html',
        controller: 'taskDetailArchiveController'
      }
    }
  });





  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/home');
  //$urlRouterProvider.otherwise('/tab/login');

});
