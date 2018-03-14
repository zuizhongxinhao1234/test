/**
 * 初始化
 */
var app = angular.module('screen', ['ui.router']).run(function() {
    require.config({
        paths: {
            echarts: './vendor/echarts'
        },
        packages: [{
            name: 'zrender',
            location: './vendor/zrender',
            main: 'zrender'
        }]
    });
});

app.run(['$rootScope', 'timer', function($rootScope, timer) {
    $rootScope.$on('$locationChangeStart', function() {
        timer.killAll();
    });
}]);
/**
 * 全局参数配置
 */
app.constant('M_API', {
     base: '/',  //工程地址
     speechList:'speechList',//言论趋势(近30天)
     speechDate:'speechDate',//言论趋势(今日昨日)
     centralizedRadar:'centralizedRadar',//归口占比
     placeList: 'placeList', //舆论场列表
     placeDetail: 'placeDetail', //舆论场24小时详细
     wordsList: 'wordsList', //涉容热词
     getHotPeopleListPath:'getHotPeopleList',//获取热点人物
     getHotNewListPath:'getHotNewList',//获取热点人物对应的新闻话题
     webSum: 'webSum'    //总抓取数量统计
});




//http服务配置
app.config(['$httpProvider', function($httpProvider) {
    // 修改传值格式为form
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * 参数序列化
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // 设置自动序列化
    $httpProvider.defaults.transformRequest = function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    };
}]);