/**
 * Created by hwang on 2016/5/22 20:42.
 */
'use strict';

var request = require('request');
var wechatHost = 'https://api.weixin.qq.com';
var errCodeHeader = 'hylax';

exports.coupon = {
    getCouponById: function (token, id, callback) {
        if (!token) {
            return callback(getErr(1001, true, 'token can not empty!'))
        } else if (!id) {
            return callback(getErr(1002, true, 'id can not empty!'))
        } else if (typeof callback != 'function') {
            return callback(getErr(1003, true, 'without callback function!'))
        }
        var url = wechatHost + '/card/get?access_token=' + token;
        request.post({
            url: url,
            body: JSON.stringify({
                card_id: id
            })
        }, function (err, response, body) {
            if (err) {
                return callback(getErr(-1, true, 'server error!'))
            }
            var result = JSON.parse(body);
            if (result.errcode != 0) {
                return callback(getErr(result.errcode, false, result.errmsg));
            }
            callback('', result);
        });
    }
};

var getErr = function (code, self, msg) {
    var err = {
        code: code,
        msg: msg
    };
    if (self) {
        err.code = errCodeHeader + code;
    }
    return err;
};
