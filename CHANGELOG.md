<!--
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-04-27 19:13:31
 * @LastEditTime: 2021-06-25 18:38:06
-->
## 1.4.1 - 2021-06-25
- fix: 修复受控组件强制替换html内容
- chore: 修改脚本

## 1.4.0 - 2021-06-05
- feat: 增加钩子方法

## 1.3.0 - 2021-05-15
- perf: 更新 wangeditor 版本
- chore: 自动发布脚本
- 更新CHANGELOG

## 1.2.2 - 2021/05/11
- feat: 多语言支持
- feat: 增加销毁方法
- feat: 支持 onlineVideoCallback 和 linkImgCallback 回调函数
- doc: 修改了介绍

## 1.1.3 - 2021/05/08
- fix: 兼容 v3 版本
- feat: 容器支持内联样式与样式类
- feat: 追加 onFous 与 onBlur 事件

## 1.1.2 - 2021/05/06
- fix: 设置 localBlobImg 修复无图片时的错误提醒

## 1.0.1 - 2021/04/27
- feat: 增加 Blob 本地图片，并在类中提供处理函数 replaceHTMLImgBlobURL

```jsx
import React from 'react';
import ReactWEditor from 'wangeditor-for-react';

class Demo extends React.Component {
  submit () {
    if (this.editorRef) {
      // 当前曾经添加过所有的图片文件，包括在编辑器中删除的图片，key 是 blob 地址，value 是 File
      const imgs = this.editorRef.imgFile.getAllImgFiles()
      console.log('imgs', imgs)

      // 根据 blob 地址，替换 html 中图片地址
      const content = this.editorRef.replaceHTMLImgBlobURL(
        '<img src="blob:http://localhost/330f3a67-7be9-4871-8f94-473c45c1f524>',
        file =>
          `/image?filename=${file.lastModified}_${file.name}`,
      )
      console.log('content', content)
    }
  }

  render () {
    return (
    <div>
      <ReactWEditor
        localBlobImg
        ref={ref => this.editorRef = ref}
      />
      <a onClick={this.submit}>submit</a>
    </div>
    )
  }
}
```
