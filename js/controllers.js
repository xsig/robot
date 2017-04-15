function generarMensaje(velocidad,direccion)
{
    var mensaje = { "move": direccion, "speed": velocidad };

    return JSON.stringify(mensaje);
}

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $ionicPopup, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  $scope.speed=200;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.showAlert = function(mensaje) {
      var alertPopup = $ionicPopup.alert({
          title: 'DEC',
          template: "<div style='text-align: center'>"+mensaje+"</div>"
      });

      alertPopup.then(function(res) {
      });
  };

  $scope.mover = function(speed,direccion) {
      mensaje=generarMensaje(speed,direccion);
      $http.post("http://192.168.1.10:5000/robot",mensaje,
          {headers: {"Content-type": "application/json"}}).then(
          function (response) {
              if (response.status == 200)
              {
                  $scope.showAlert("El robot recibió el mensaje");
              }
              else
              {
                  $scope.showAlert("El robot no me entendió");
              }
          },
          function (response)
          {
              $scope.showAlert("El robot no me escuchó");
          }
      );    
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
