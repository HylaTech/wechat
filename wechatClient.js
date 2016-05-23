/**
 * Created by hwang on 2016/5/22 20:42.
 */
'use strict';

var request = require('request');
var wechatHost = 'https://api.weixin.qq.com';
var errCodeHeader = 'hylax';
var utils = require('./wechatUtils');
var noCallback = 'whitout callback function';

exports.coupon = {
    getCouponById: function (token, id, callback) {
        if (!token) {
            return callback(getErr(1001, true, 'token can not empty!'));
        } else if (!id) {
            return callback(getErr(1002, true, 'id can not empty!'));
        } else if (typeof callback != 'function') {
            return noCallback;
        }
        var url = wechatHost + '/card/get?access_token=' + token;
        request.post({
            url: url,
            body: JSON.stringify({
                card_id: id
            })
        }, function (err, response, body) {
            apiReturn(err, body, callback);
        });
    },
    batchGetCouponList: function (token, offset, count, status_list, callback) {
        if (!token) {
            return callback(getErr(1001, true, 'token can not empty!'));
        } else if (!utils.checkInt(offset)) {
            return callback(getErr(1001, true, 'offset err!'));
        } else if (!utils.checkInt(count)) {
            return callback(getErr(1001, true, 'count err!'));
        } else if (typeof callback != 'function') {
            return noCallback;
        }
        var url = wechatHost + '/card/batchget?access_token=' + token;
        request.post({
            url: url,
            body: JSON.stringify({
                offset: offset,
                count: count,
                status_list: status_list
            })
        }, function (err, response, body) {
            apiReturn(err, body, callback);
        });
    },
    getUserCouponList: function (token, openid, card_id, callback) {
        if (!token) {
            return callback(getErr(1001, true, 'token can not empty!'));
        } else if (!utils.checkInt(openid)) {
            return callback(getErr(1001, true, 'openid err!'));
        }
        if (!card_id && typeof callback != 'function') {
            return noCallback;
        }
        if (typeof card_id == 'function') {
            callback = card_id;
        }
        var url = wechatHost + '/card/user/getcardlist?access_token=' + token;
        var postData = {
            openid: openid
        };
        if (typeof card_id != 'function') {
            postData.card_id = card_id;
        }
        request.post({
            url: url,
            body: JSON.stringify(postData)
        }, function (err, response, body) {
            apiReturn(err, body, callback);
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

var apiReturn = function (err, body, callback) {
    if (err) {
        return callback(getErr(-1, true, 'server error!'))
    }
    var result = JSON.parse(body);
    if (result.errcode != 0) {
        return callback(getErr(result.errcode, false, result.errmsg));
    }
    callback('', result);
};
