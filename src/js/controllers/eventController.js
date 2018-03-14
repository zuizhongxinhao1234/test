app.controller('eventCtrl', ['$scope',
    function($scope) {
        $scope.$emit('setMenuActive', 'event');
    }
]);