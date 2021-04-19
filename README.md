<!--
 * @Author: dongmin
 * @LastEditors: dongmin
 * @Date: 2021-04-01 15:24:50
 * @LastEditTime: 2021-04-19 14:33:14
-->
# wangeditor-for-react

[wang editor](https://www.wangeditor.com/)

**安装**
```bash
npm install wangeditor-for-react
```


**受控组件**
```jsx
import ReactWEditor from 'wangeditor-for-react';

<Input onChange={e => this.setState({ value: e.target.value })} />
<ReactWEditor
  value={value}
  defaultValue={'<h1>标题</h1>'}
  onChange={(html) => {
    console.log('html:', html)
  }}
/>
```

**自定义配置**

```jsx
import ReactWEditor from 'wangeditor-for-react';

<ReactWEditor
  placeholder="自定义 placeholder"
  config={{
    fontSizes: {
      'x-small': { name: '10px', value: '1' },
      small: { name: '12px', value: '2' },
      normal: { name: '16px', value: '3' },
      large: { name: '18px', value: '4' },
      'x-large': { name: '24px', value: '5' },
      'xx-large': { name: '32px', value: '6' },
      'xxx-large': { name: '48px', value: '7' },
    },
  }}
/>
```