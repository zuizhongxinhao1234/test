var express = require('express');
var router = express.Router();


function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

//
// router.post('/wordsList', function(req, res, next) {
//     var ret = [];
//     for(var i=1; i<21; i++) {
//         ret.push({name:"石化重大" + i,level:20});
//     }
//     res.send(JSON.stringify(ret));
// });

module.exports = router;
