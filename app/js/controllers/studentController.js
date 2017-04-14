angular.module('app')
    .controller('StudentController', function($scope, StudentService, LocalService) {
        $scope.students = JSON.parse(LocalService.get('students') || "[]");


        StudentService.getAll().then(function(res) {
          LocalService.set('students',JSON.stringify(res.data.students));

        });


        $scope.mail = function(email) {
          console.log(email);
            StudentService.getMail(email).then(function(res) {});
        };

    });
