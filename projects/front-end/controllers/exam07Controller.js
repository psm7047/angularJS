angular.module("app")
  .controller("exam07Controller", function($scope) {
      $scope.todos = [
        {action: "동영상 녹화(Office)", complete: false},
        {action: "앵귤러 JS 복습(Home)", complete: false},
        {action: "알마인드(Home)", complete: false}
      ];
      $scope.addNewItem1 = (newTodo) => {
        if(newTodo && newTodo.action && newTodo.location) {
          $scope.todos.push({
            action: newTodo.action + "(" + newTodo.location + ")",
            complete: false
          });
          newTodo.action = "";
          newTodo.location ="";
        } else {
          console.log("올바르게 입력되지 않음");
        }
      };
      $scope.addNewItem2 = (newTodo) => {
        if($scope.newTodo && $scope.newTodo.action && $scope.newTodo.location) {
          $scope.todos.push({
            action: $scope.newTodo.action + "(" + $scope.newTodo.location + ")",
            complete: false
          });
          $scope.newTodo.action = "";
          $scope.newTodo.location ="";
        } else {
          console.log("올바르게 입력되지 않음");
        }
      };

      // $scope.newTodo = {
      //   action: "",
      //   location: "Home"
      // };
  });