/**
 * Created by hwang on 2016/5/23 13:43.
 */
'use strict';

exports.checkInt = function (str) {
    if (!isNaN(str)) {
        if ((str + '').indexOf('.') >= 0) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};