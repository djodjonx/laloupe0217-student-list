angular.module('app')
    .controller('MainController', function($scope) {

      $scope.newTodo = "";
      $scope.todos =[];
      $scope.editTodo = "";

        $scope.addTodo = function() {
            $scope.todos.push($scope.newTodo);
            console.log($scope.todos);
            $scope.newTodo = "";
        };
        // $scope.changeTodo = function(index) {
        //     $scope.todos[index]=($scope.editTodo)
        //     console.log($scope.editTodo);
        //     $scope.editTodo = "";
        $scope.changeTodo = function(index) {
            $scope.editTodo = $scope.todo;
            console.log($scope.todo);
            $scope.editTodo = "";
        };
    });
