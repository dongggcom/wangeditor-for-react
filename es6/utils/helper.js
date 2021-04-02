/*
 * @Author: dongmin
 * @LastEditors: dongmin
 * @Date: 2021-04-02 18:36:57
 * @LastEditTime: 2021-04-02 19:30:19
 */

import { isString } from './isType';

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

export const isEmpty = (value) => {}

export default {}
