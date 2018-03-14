//归口占比
app.directive("centralizedRadar", ['$http', 'M_API',
    function($http, M_API) {
        return {
            restrict: 'A',
            link: function(scope, tEle, tAttrs, transcludeFn) {
                //雷达图
                require(
                    [
                        'echarts',
                        'echarts/chart/radar'
                    ],
                    function (ec) {
                        scope.$watch('centralizedRadar', function(newValue, oldValue, scope) {
                                if(newValue) {
                                    ec.init(document.getElementById('centralized__radar')).setOption(getOption(newValue));
                                }
                        });
                    }
                );

                function getOption(newValue){
                    var temp=newValue;
                    var types=[];
                    var typeValues=[];
                    var valueCount=0;
                    var maxValue=0;
                    for(var i=0;i<temp.length;i++){
                        types.push(temp[i].type);
                        typeValues.push(temp[i].value);
                        valueCount=parseInt(valueCount)+parseInt(temp[i].value);
                        if(maxValue<temp[i].value){
                            maxValue=temp[i].value;
                        }
                    }
                    var option = {
                        calculable : false,
                        polar : [
                            {
                                indicator:function(){
                                    var texts=[];
                                    for(var i=0;i<temp.length;i++){
                                        var dom={text:'▉  '+temp[i].type,max:maxValue*1.2};
                                        texts.push(dom);
                                    }
                                    return texts;
                                }(),
                                //radius:130,
                                name : {
                                    show:true,
                                    textStyle: {color:'#ffffff',fontSize:'16'}
                                },
                                splitLine:{lineStyle:{color:'#7ab9c0'}},
                                splitArea:{areaStyle:{color:'rgba(255,255,255,0)'}},
                                axisLine:{show:false},
                                type:'polygon'
                            }
                        ],

                        series : [
                            {
                                name: '归口占比',
                                type: 'radar',
                                itemStyle: {
                                    normal: {
                                        areaStyle: {
                                            color:'rgba(18,209,222,.8)',
                                            type: 'default'
                                        },
                                        color:'#ADF3FB',
                                        borderColor:'#adf3fb',
                                        label: {
                                            show: true,
                                            position:  'top',
                                            formatter:function(params, ticket, callback){
                                                //console.log(Math.round(params.value / valueCount * 10000) / 100.00 + "%");
                                                return Math.round(params.value / valueCount * 10000) / 100.00 + "%"
                                            },
                                            textStyle:{
                                                color:'#7fc79a',
                                                fontSize:'16',
                                                fontWeight:'700'
                                            }
                                        }
                                    }
                                },
                                symbol:'emptyCircle',
                                symbolSize:1|2,
                                data : [
                                    {
                                        value : typeValues
                                    }
                                ]
                            }
                        ]
                    };
                    return option;
                }
            }
        };
    }
]);

app.directive("centralizedBar", ['$http', 'M_API',
    function($http, M_API) {
        return {
            restrict: 'A',
            link: function(scope, tEle, tAttrs, transcludeFn) {
                //柱状图
                require(
                    [
                        'echarts',
                        'echarts/chart/bar'
                    ],
                    function (ec) {
                        scope.$watch('centralizedRadar', function(newValue, oldValue, scope) {
                                if(newValue) {
                                    ec.init(document.getElementById('centralized__bar')).setOption(getOption(newValue));
                                }
                        });
                    }
                );

                function getOption(newValue){
                    var temp=newValue;
                    var types=[];
                    var typeValues=[];
                    for(var i=0;i<temp.length;i++){
                        types.push(temp[i].type);
                        typeValues.push(temp[i].value);
                    }
                    var option = {
                        xAxis : [
                            {
                                splitLine:{show:false},
                                axisLine:{
                                    lineStyle:{
                                        color:'#ffffff',
                                        width:'1'
                                    }
                                },
                                axisLabel:{
                                    textStyle:{
                                        color:'#ffffff'
                                    }
                                },
                                type : 'category',
                                data : types
                            }
                        ],
                        grid:{
                            borderWidth:'0'
                        },
                        yAxis : [
                            {

                                splitLine:{show:false},
                                type : 'value',
                                axisLabel : {
                                    show : true,
                                    textStyle : {
                                        color : '#ffffff'
                                    }
                                },
                                axisLine:{
                                    lineStyle:{
                                        color:'#ffffff',
                                        width:'1'
                                    }
                                }

                            }
                        ],
                        series : [
                            {
                                "name":"故障次数（个）",
                                "type":"bar",
                                barWidth:'25',
                                itemStyle:{
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top'
                                        },
                                        color: function(params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                '#0e97cb','#9fdff8','#f6e5a0','#f3b6a4','#f66165'
                                            ];
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                },
                                "data":typeValues

                            }
                        ]
                    };
                    return option;
                }
            }
        };
    }
]);
