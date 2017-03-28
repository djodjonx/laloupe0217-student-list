angular.module('app')
        .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('web', {
                abstract: true,
                template: '<ui-view/>'
            })
            .state('web.home', {
                url: '/',
                templateUrl: 'home.html'
            })
            .state('web.todoList', {
                url: '/todoList',
                templateUrl: 'todoList.html',
                controller: 'MainController'
            });

        $urlRouterProvider.otherwise('/');
    });
