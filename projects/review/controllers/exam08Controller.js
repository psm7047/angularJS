angular.module("app")
  .controller("exam08Controller", function($rootScope, $scope) {
    $scope.login = (user) => {
      $rootScope.uid = user.uid;
    };
  });