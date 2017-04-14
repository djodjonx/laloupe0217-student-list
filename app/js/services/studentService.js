angular.module('app')
    .service('StudentService', function($http) {
        return {
            create: function(student) {
                return $http.post('/students', student);
            },
            getAll: function() {
                return $http.get('/students');
            },
            getOne: function(id) {
                return $http.get('/students/' + id);
            },
            getMail: function(email) {
                return $http.get('/students/mail/' + email);
            },

            update: function(id, user) {
                return $http.put('/students/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/students/' + id);
            }
        };
    });
