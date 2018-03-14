app.config(['$stateProvider', '$urlRouterProvider', 'M_API',
    function($stateProvider, $urlRouterProvider, M_API) {
        $urlRouterProvider.otherwise('/l/place');

        $stateProvider
            .state('l', {
                url: '/l',
                views: {
                    '': {
                        templateUrl: M_API.base + 'tpls/layout.html',
                        controller: "initWebCtrl"
                    }
                },
                abstract: true
            })
            // //舆论场
            // .state('l.place', {
            //     url: '/place',
            //     views: {
            //         'content': {
            //             templateUrl: M_API.base + 'tpls/place.html',
            //             controller: "placeCtrl"
            //         }
            //     }
            // })
            // //热点人物
            // .state('l.figure', {
            //     url: '/figure',
            //     views: {
            //         'content': {
            //             templateUrl: M_API.base + 'tpls/figure.html',
            //             controller: "figureCtrl"
            //         }
            //     }
            // })
            // //涉容热词
            // .state('l.words', {
            //     url: '/words',
            //     views: {
            //         'content': {
            //             templateUrl: M_API.base + 'tpls/words.html',
            //             controller: "wordsCtrl"
            //         }
            //     }
            // })
            // //言论趋势
            // .state('l.speech', {
            //     url: '/speech',
            //     views: {
            //         'content': {
            //             templateUrl: M_API.base + 'tpls/speech.html',
            //             controller: "speechCtrl"
            //         }
            //     }
            // })
            // //归口占比
            // .state('l.centralized', {
            //     url: '/centralized',
            //     views: {
            //         'content': {
            //             templateUrl: M_API.base + 'tpls/centralized.html',
            //             controller: "centralizedCtrl"
            //         }
            //     }
            // })
            // //事件传播
            // .state('l.event', {
            //     url: '/event',
            //     views: {
            //         'content': {
            //             templateUrl: M_API.base + 'tpls/event.html',
            //             controller: "eventCtrl"
            //         }
            //     }
            // })
            // //数据抓取
            // .state('l.grab', {
            //     url: '/grab',
            //     views: {
            //         'content': {
            //             templateUrl: M_API.base + 'tpls/grab.html',
            //             controller: "grabCtrl"
            //         }
            //     }
            // });
    }
]);