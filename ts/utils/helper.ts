/*
 * @Author: dongmin
 * @LastEditors: donggg
 * @Date: 2021-04-02 18:36:57
 * @LastEditTime: 2021-07-04 10:21:03
 */
import WEdtior from 'wangeditor';

/**
 * 简单判断两个值是否相当
 * @param {string} 值1
 * @param {string} 值2
 * @return {boolean} 判断结果
 */
export const isEqualString = (value1: string, value2: string): boolean => value1 === value2;

/**
 * 判断是否为空
 * @param  {object|array|string|boolean|null|undefined|NaN} value 待判断值
 * @return {boolean} 判断结果
 */
export const isEmpty = (value: Record<string, unknown> | unknown[] | string | number | null | undefined): boolean => {
	// null, undefined
	if (value === null || value === undefined) {
		return true;
	}
	// NaN
	if (typeof value === 'number' && value !== value) {
		return isNaN(value);
	}
	// array
	if (typeof value === 'object' && value.length) {
		return value.length === 0;
	}
	// string
	if (typeof value === 'string') {
		return value === '';
	}
	// object
	if (typeof value === 'object') {
		return Object.keys(value).length === 0;
	}
	return !value;
};

/**
 * 返回给定数组不同的值
 * @param {array} array 待过滤数组
 * @param {array} values 需要过滤的值组成的数组
 * @returns {array} 返回给定数组不同的值
 */
export const difference = <T>(array: Array<T>, values: unknown[]): Array<T> => {
	const result: Array<T> = [];
	for (const value of array) {
		if (!values.includes(value)) {
			result.push(value);
		}
	}
	return result;
};

/**
 * 判断是否为该对象的键
 * @param key object 的键
 * @param editor 目标对象
 * @returns 是否是该元素的键
 */
export function isValidKey(key: string | number | symbol, object: Record<string, unknown>): key is keyof typeof object {
	return key in object;
}

export default {};
