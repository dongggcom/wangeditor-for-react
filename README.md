<!--
 * @Author: dongmin
 * @LastEditors: donggg
 * @Date: 2021-04-01 15:24:50
 * @LastEditTime: 2021-05-08 11:03:07
-->
# wangeditor-for-react

[wang editor](https://www.wangeditor.com/)

**安装**
```bash
npm install wangeditor-for-react
```


**事件监听**
```jsx
import ReactWEditor from 'wangeditor-for-react';
import { Input } from 'antd'

<Input onChange={e => this.setState({ value: e.target.value })} />
<ReactWEditor
  defaultValue={'<h1>标题</h1>'}
  onChange={(html) => {
    console.log('onChange html:', html)
  }}
  onBlur={(html) => {
    console.log('onBlur html:', html)
  }}
  onFocus={(html) => {
    console.log('onFocus html:', html)
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

**配置**

* [配置菜单](https://doc.wangeditor.com/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/)
* [粘贴过滤](https://doc.wangeditor.com/pages/06-%E7%B2%98%E8%B4%B4%E8%BF%87%E6%BB%A4/)
* [上传图片](https://doc.wangeditor.com/pages/07-%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87/)
* [上传视频](https://doc.wangeditor.com/pages/07-%E4%B8%8A%E4%BC%A0%E8%A7%86%E9%A2%91/)
