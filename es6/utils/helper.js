/*
 * @Author: dongmin
 * @LastEditors: donggg
 * @Date: 2021-04-02 18:36:57
 * @LastEditTime: 2021-05-09 12:17:51
 */

import { isString, isObject, isArray} from './isType';

/**
 * 简单判断两个值是否相当
 * @param {string} 值1
 * @param {string} 值2
 * @return {boolean} 判断结果
 */
export const isEqualString = (value1, value2) => {
  if (!isString(value1) || !isString(value2)) {
    return false;
  }
  return value1 === value2;
}

/**
 * 判断是否为空
 * @param  {object|array|string|boolean|null|undefined|NaN} value 待判断值
 * @return {boolean} 判断结果
 */
 export const isEmpty = (value) => {
  if (isArray(value)) {
    return value.length === 0;
  }

  if (isString(value)) {
    return value === '';
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return !value
}

/**
 * 返回给定数组不同的值
 * @param {array} array 待过滤数组
 * @param {array} values 需要过滤的值组成的数组
 * @returns {array} 返回给定数组不同的值
 */
export const difference = (array, values) => {
  const result = []
  for (let value of array) {
    if (!values.includes(value)) {
      result.push(value)
    }
  }
  return result
}

export default {}
