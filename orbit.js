var orbitable = angular.module('orbitable', ['d3'])
    .directive('d3Bodies', ['$window', '$timeout', 'd3Service',
        function($window, $timeout, d3Service) {
            return {
                restrict: 'EA',
                scope: {
                    data: '='
                },
                link: function(scope, ele, attrs) {
                    d3Service.d3().then(function(d3) {

                        var renderTimeout;
                        var sizeFactor = parseInt(attrs.sizeFactor) || 1,
                            heightTrim = parseInt(attrs.heightTrim) || 260;

                        var svg = d3.select(ele[0])
                            .append('svg')
                            .style('width', '100%');

                        $window.onresize = function() {
                            scope.$apply();
                        };

                        scope.$watch(function() {
                            return angular.element($window)[0].innerHeight;
                        }, function() {
                            svg.style('height', window.innerHeight - heightTrim);
                            scope.render(scope.data);
                        });

                        scope.$watch('data', function(newData) {
                            scope.updateRender(newData);
                        }, true);

                        scope.updatePositions = function(circles) {
                            circles.attr("cx", function(d) {
                                return d.x
                            });
                            circles.attr("cy", function(d) {
                                return d.y
                            });
                            circles.attr("r", function(d) {
                                return Math.sqrt(d.m * sizeFactor)
                            });
                        };

                        scope.updateRender = function(data) {
                            var circleData = svg.selectAll("circle").data(data);
                            scope.updatePositions(circleData);
                        };

                        scope.render = function(data) {
                            svg.selectAll('*').remove();
                            if (!data) return;
                            if (renderTimeout) clearTimeout(renderTimeout);

                            renderTimeout = $timeout(function() {
                                var masses = data.map(function(d) {
                                    return d.m;
                                });
                                var circle = svg.selectAll("circle").data(data);
                                var circleEnter = circle.enter().append("circle");

                                scope.updatePositions(circleEnter);
                            });
                        };
                    });
                }
            }
        }
    ]);

bodyData = [{
    id: 0,
    x: 50,
    y: 20,
    m: 10
}, {
    id: 1,
    x: 100,
    y: 20,
    m: 20
}, {
    id: 2,
    x: 150,
    y: 20,
    m: 30
}];

orbitable.controller('BodyCtrl', ['$scope',
    function($scope) {
        $scope.data = bodyData;
    }
]);