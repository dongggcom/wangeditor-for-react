/*
 * @Author: dongmin
 * @LastEditors: donggg
 * @Date: 2021-04-01 19:07:52
 * @LastEditTime: 2021-07-02 15:22:43
 */

/**
 * 随机生成字符
 * @param {number} len 随机字符长度
 * @param {number} radix 基数
 * @returns 随机生成的字符
 * @example
 * uuid(8, 2)  // "01001010"
 * uuid(8, 16) // "098F4D35"
 */
export default function uuid(len: number, radix?: number): string {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	const uuid: string[] = [];
	let i;
	radix = radix || chars.length;

	if (len) {
		// Compact form
		for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
	} else {
		// rfc4122, version 4 form
		let r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | (Math.random() * 16);
				uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
}
