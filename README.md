<!--
 * @Author: dongmin
 * @LastEditors: donggg
 * @Date: 2021-04-01 15:24:50
 * @LastEditTime: 2021-05-09 21:30:30
-->
# wangeditor-for-react

项目来源：[wangEditor](https://github.com/wangeditor-team/wangEditor/)

## 安装

```bash
npm install wangeditor-for-react
```

## 使用

**事件监听**
```jsx
import ReactWEditor from 'wangeditor-for-react';

<ReactWEditor
  defaultValue={'<h1>标题</h1>'}
  linkImgCallback={(src,alt,href) => {
    // 插入网络图片的回调事件
    console.log('图片 src ', src)
    console.log('图片文字说明',alt)
    console.log('跳转链接',href)
  }}
  onlineVideoCallback={(video) => {
    // 插入网络视频的回调事件
    console.log('插入视频内容', video)
  }}
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
* [内容校验](https://doc.wangeditor.com/pages/05-%E5%86%85%E5%AE%B9%E6%A0%A1%E9%AA%8C/)
* [粘贴过滤](https://doc.wangeditor.com/pages/06-%E7%B2%98%E8%B4%B4%E8%BF%87%E6%BB%A4/)
* [上传图片](https://doc.wangeditor.com/pages/07-%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87/)
* [上传视频](https://doc.wangeditor.com/pages/07-%E4%B8%8A%E4%BC%A0%E8%A7%86%E9%A2%91/)

**使用 Ref**

通过 `Ref` 获取所有 API

```jsx
import React, { useRef } from 'react';
import ReactWEditor from 'wangeditor-for-react';

function App() {
  let editorRef = useRef(null)
  return (
    <ReactWEditor
      ref={editorRef}
      onBlur={(html) => {
        if (editorRef.current) {
          console.log('ref', editorRef.current.editor.txt.append('追加内容'))
        }
      }}
    />
  );
}

export default App;
```

[常用 API](https://doc.wangeditor.com/pages/08-%E5%B8%B8%E7%94%A8API/)

**销毁编辑器**
```jsx
import React, { useRef } from 'react';
import ReactWEditor from 'wangeditor-for-react';

function App() {
  let editorRef = useRef(null)
  return (
    <>
    <ReactWEditor ref={editorRef} />
    <a href="#" onClick={() => editorRef.current.destroy()}>click</a>
    </>
  );
}

export default App;
```

**多语言**

首先需要安装语言包
```bash
npm i -S i18next
```

使用
```jsx
import { extend } from 'wangeditor-for-react';
import i18next from 'i18next';

const ReactWEditorOfLang = extend({ i18next })

<ReactWEditorOfLang
  config={{
    lang: 'en',
  }}
/>
```

自定义语言

```jsx
import { extend } from 'wangeditor-for-react';
import i18next from 'i18next';

const ReactWEditorOfLang = extend({ i18next })

<ReactWEditorOfLang
  config={{
    lang: 'japan',
  }}
  languages={{
    japan: {
      wangEditor: {
        请输入正文: '本文を入力してください',
      },
    }
  }}
/>
```
