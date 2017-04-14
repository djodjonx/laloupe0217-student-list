angular.module('app')
    .controller('CreateStudentController', function($scope, CurrentUser, StudentService) {
        $scope.newStudent= {
            firstname: "",
            lastname: "",
            sexe: "",
            birthdate: "",
            city: "",
            zipCode: "",
            adress: "",
            github: "",
            email: ""
        };


    $scope.addStudent = function () {
      StudentService.create($scope.newStudent).then(function (res){
      }, function (err) {
      });

    };
});
