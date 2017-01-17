var app = angular.module('CogniApp',
[
  'firebase',
  'ngAnimate',
  'ui.router',
  'CogniApp.services',
  'CogniApp.controllers',
  'jcs-autoValidate',
  'textAngular',
  'wu.masonry',
  'angularUtils.directives.dirDisqus',
  '720kb.socialshare',
  'anim-in-out'
]);
// crossdomain loading iframes
app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.
        'https://www.yumpu.com/**'
    ]);
});
// stateProvider
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'postCtrl'
        })
        .state('add', {
            url: '/add',
            templateUrl: 'templates/addPost.html',
            controller: 'addPostCtrl',
            data: {
              needAdmin: true
            }
        })
        .state('read', {
          url: '/read/:id',
          templateUrl: 'templates/read.html',
          controller: 'readCtrl'
        })
        .state('followers', {
            url: '/followers',
            templateUrl: 'templates/follow.html',
            controller: 'followCtrl',
            data: {
              needAdmin: true
            }
        })
        .state('adminLogin', {
            url: '/admin-login',
            templateUrl: 'templates/admin-login.html',
            controller: 'authCtrl'

        })
        .state('about', {
          url: '/about-us',
          templateUrl: 'templates/about-us.html',
          controller: 'aboutCtrl'
        })
        .state('edit', {
          url: '/edit/:id',
          templateUrl: 'templates/edit.html',
          controller: 'editCtrl',
          data: {
            needAdmin: true
          }
        });

    $urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, $state){
  //check login state
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      console.log('user is signed in', user);
      $rootScope.user = user;
      //show notification of user logged in
    }
    else{
      $rootScope.user = null;
      console.log('user is signed out');
      //show notification of user signed out
    }
  });

  //check state change permissions
  $rootScope.$on( "$stateChangeStart", function(e, to) {
    if(to.data.needAdmin && !$rootScope.user){
      e.preventDefault();
      console.log('prevented the collapse of my world');
      //maybe show a dialog like 'you snooping bitch'
      $state.go('home');
    }
    else if (to.data.needAdmin && $rootScope.user){
      console.log('welcome fellow teammate');
    }
    else{
      console.log("I don't give two shits!");
    }
  });
  //manage variables on animation start and animation end
  $rootScope.showPreloader = true;
  $rootScope.$on('animStart', function($event, element, speed) {
      // do something
      $rootScope.showPreloader = true;
      $("footer").hide();
  });

  $rootScope.$on('animEnd', function($event, element, speed) {
      // do something
      $rootScope.showPreloader = false;
      $("footer").show();
  });

});
