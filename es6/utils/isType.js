/*
 * @Author: dongmin
 * @LastEditors: dongmin
 * @Date: 2021-04-02 16:30:40
 * @LastEditTime: 2021-04-02 18:44:47
 */

const isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}

export const isString = input => isType('String')(input);
export const isNumber = input => isType('Number')(input);
export const isUndefined = input => isType('Undefined')(input);
export const isNull = input => isType('Null')(input);
export const isNaN = input => isNaN(input);
export const isArray = input => isType('Array')(input);
export const isObject = input => isType('Object')(input);
export const isFunction = input => isType('Function')(input);

/**
 * 数据类型是否一致
 * @param {*} one 参数一
 * @param {*} other 另外一个参数
 * @returns {boolean} 是否一致
 */
export const isSameType = (one, other) => Object.prototype.toString.call(one) === Object.prototype.toString.call(other)

export default isType;
