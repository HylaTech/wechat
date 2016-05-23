# wechat

var wechat = require('wechat');

一、用户管理

二、优惠券
 1.通过card_id获取优惠券详情
   wechat.coupon.getCouponById(access_token,card_id,function(err,result){});
 2.批量查询卡券列表
   wechat.coupon.batchGetCouponList(access_token,offset,count,status_list,function(err,result){});
 3.获取用户领取卡券列表
   wechat.coupon.getUserCouponList(access_token,openid,card_id,function(err,result){});