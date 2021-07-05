<!--
 * @Author: dongmin
 * @LastEditors: donggg
 * @Date: 2021-04-01 15:24:50
 * @LastEditTime: 2021-06-05 11:25:47
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

* [配置菜单](https://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/)
* [内容校验](https://www.wangeditor.com/doc/pages/05-%E5%86%85%E5%AE%B9%E6%A0%A1%E9%AA%8C/)
* [粘贴过滤](https://www.wangeditor.com/doc/pages/06-%E7%B2%98%E8%B4%B4%E8%BF%87%E6%BB%A4/)
* [上传图片](https://www.wangeditor.com/doc/pages/07-%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87/)
* [上传视频](https://www.wangeditor.com/doc/pages/07-%E4%B8%8A%E4%BC%A0%E8%A7%86%E9%A2%91/)

**使用Ref**

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

[常用API](https://www.wangeditor.com/doc/pages/08-%E5%B8%B8%E7%94%A8API/)

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
## 增加 hook
分为全局钩子 `globalHook` 和实例钩子 `instanceHook`。

`globalHook` 注册在构造函数上，即 `new E()` 中的 `E`。`instanceHook` 注册在实例后，`editor.create()` 执行前。

钩子支持分割符，例如 `menus.extend` 相当于 `this.editor.menus.extend`。

钩子有两种值，一种是数组，一种是函数。

```jsx
<ReactWEditor
  instanceHook={{
    // 使用数组时，通常 key 代表的钩子是一个方法，此处 menus.extend 是个方法，那么数组就是其参数。
    'menus.extend': ['alertMenuKey', AlertMenu],
    // 使用方法是，通常 key 代表的钩子是一个对象，可以利用方法来绑定。方法的形参第一位是当前实例的 editor，后面依次是 key 分割代表的对象。
    'config.menus': function(editor, config, menus) {
      config.menus = menus.concat("alertMenuKey")
    }
  }}
/>
```


使用 `globalHook` 扩展菜单，`AlertMenu` 参考 [Button 菜单](https://www.wangeditor.com/doc/pages/11-%E8%87%AA%E5%AE%9A%E4%B9%89%E6%89%A9%E5%B1%95%E8%8F%9C%E5%8D%95/02-Button%E8%8F%9C%E5%8D%95.html)。
```jsx
import React from 'react';
import ReactWEditor from 'wangeditor-for-react';
import AlertMenu from './AlertMenu';

function App() {
  return (
    <ReactWEditor
      globalHook={{
         registerMenu: ['alertMenuKey', AlertMenu]
      }}
    />
  );
}

export default App;
```

使用 `instanceHook` 扩展菜单。
```jsx
import React from 'react';
import ReactWEditor from 'wangeditor-for-react';
import AlertMenu from './AlertMenu';

function App() {
  return (
    <ReactWEditor
      instanceHook={{
        'menus.extend': ['alertMenuKey', AlertMenu],
        'config.menus': function(editor, config, menus) {
          config.menus = menus.concat("alertMenuKey")
        }
      }}
    />
  );
}

export default App;
```


## TODO

* 支持 [scroll-to-head](https://www.wangeditor.com/doc/pages/08-%E5%B8%B8%E7%94%A8API/06-scroll-to-head.html)
* 支持 [菜单和编辑区域分离](https://www.wangeditor.com/doc/pages/01-%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8/03-%E8%8F%9C%E5%8D%95%E5%92%8C%E7%BC%96%E8%BE%91%E5%8C%BA%E5%9F%9F%E5%88%86%E7%A6%BB.html)