/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-06-30 11:48:31
 * @LastEditTime: 2021-07-01 10:28:27
 */
import React, { FC } from 'react';
const name: string = 'zs';

export const age: number = 100;
// export var SomeVar: { a: SomeType };

[1, 2, 3].forEach(i => console.log(i))

export const Hello: FC = () => {
  return <p>hello world!</p>
}

export default name;