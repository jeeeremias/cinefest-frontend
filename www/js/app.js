angular.module('cinefestApp.controllers', []);
angular.module('cinefestApp.services', []);
angular.module('cinefestApp.directives', []);

var app = angular.module('cinefestApp', ['ionic', 'cinefestApp.controllers', 'cinefestApp.services', 'cinefestApp.directives', 'cinefestApp.directives', 'ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
