/*
 * @Author: dongmin
 * @LastEditors: donggg
 * @Date: 2021-04-01 19:02:53
 * @LastEditTime: 2021-06-25 18:36:17
 */
import React from 'react';
import WEdtior from 'wangeditor';
import createId from './utils/unique-id';
import { isObject, isString } from './utils/isType';
import { isEqualString, isEmpty, difference } from './utils/helper';
import { replaceHTMLImgBlobURL } from './utils/htmlRnder';
import ImgFile from './imgFile'


export default class ReactWEditor extends React.PureComponent {
  // #Private
  id = createId(8);
  // #Private
  editor = null;
  // #Private
  hasCreated = false; // 是否执行 create 创建函数
  // #Protected
  defaultConfig = {
    zIndex: 1,
  };

  imgFile = new ImgFile()

  componentDidMount() {
    try {
      this.init();
      this.create();
    } catch (e) {
      console.error(`[ReactWEdtior Error]: ${e}`)
    }
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy()
    }
  }

  // #Private
  __hook__run = (hooks = [], args = [], target = {}) => {
    hooks.forEach((hook, index) => {
      if (!hook) {
        return;
      }
      
      if (target[hook] && typeof target[hook] === 'function' && args[index]) {
        target[hook].apply(target[hook], args[index])
      } else if (/^(\w+\.\w+)+$/.test(hook) && args[index]) {
        const path = hook.split('.')
        const cache = [];
        let fn = target;
        path.forEach((d) => {
          cache.push(fn);
          fn = fn[d]
        })
        cache.push(fn);
        if (typeof fn === 'function') {
          fn.apply(cache[cache.length-2], args[index])
        } else if(typeof args[index] === 'function') {
          args[index].apply(args[index], cache)
        }
      }
    })
  }

  // #Private
  __before__instanced() {
    const { globalHook = {} } = this.props;
    const hooks = Object.keys(globalHook);
    const args = Object.values(globalHook);

    this.__hook__run(hooks, args, WEdtior);
  }

  // #Private
  __after__instanced() {
    if (!this.check()) {
      return;
    }
    const { instanceHook = {} } = this.props;
    const hooks = Object.keys(instanceHook);
    const args = Object.values(instanceHook);

    this.__hook__run(hooks, args, this.editor);
  }

  // #Protect
  init() {
    const elem = document.getElementById(`editor-${this.id}`);
    if (elem) {
      // 0. 初始化前，调用全局的 hook
      this.__before__instanced()

      // 1. 初始化
      this.editor = new WEdtior(`#editor-${this.id}`);

      // 2. 初始化后，调用实例的 hook，支持相对路径，例如键值是 'menus.extend'
      this.__after__instanced()

      // 3. 根据属性配置默认设置
      this.setDefaultConfigByProps();

      // 4. 根据默认设置更新设置
      this.setConfig(this.defaultConfig);
    } else {
      console.error('[ReactWEdtior Error]: dom is not found')
    }
  }

  // #Protect
  check() {
    if (this.editor) {
      return true;
    }
    console.error('[ReactWEdtior Error]: editor not found')
    return false;
  }

  // #Protect
  create(context = {}) {
    const { config, defaultValue, customConfig } = this.props;
    if (this.check()) {
      // 1. 根据 config 属性配置设置
      this.setConfig(config || customConfig)

      // 2. 扩展 edtior
      this.extend(context)

      // 3. 生成 editor
      this.editor.create();

      // 4. 修改标识
      this.created()

      // 5. 根据 defaultValue 设置内容
      this.setContentByHTMLString(defaultValue)
    }
  }
  
  /**
   * 通过 context 扩展 edtior 
   * @param {object} context 待扩展的内容
   * @param {array} customFilter 需要过滤的扩展字段
   */
   extend(
    context = {}, 
    customFilter = []
  ) {
    if (this.check()) {
      // 1. 过滤数组
      const filter = Object.keys(this.editor).concat(customFilter || [])

      // 2. 向 editor 上扩展
      difference(Object.keys(context), filter).forEach((key) => this.editor[key] = context[key])
    }
  }

  /**
   * 销毁编辑器
   */
  destroy() {
    if (!this.isCreated()) {
      console.error('[ReactWEdtior Error]: editor has not created, don\'t destroy.')
      return;
    }
    // 1. 销毁
    this.editor.destroy();
    this.editor = null;

    // 2. 修改标识
    this.destroyed()
  }

  /**
   * 配置 editor
   * @param {*} config 配置
   * @doc https://doc.wangeditor.com/
   */
  setConfig(config) {
    if (config && isObject(config)) {
      this.editor.config = Object.assign(this.editor.config, config);
    }

    // 多语言处理
    const { languages } = this.props;
    if (languages && isObject(languages) &&!isEmpty(languages)) {
    	this.editor.config.languages = Object.assign(this.editor.config.languages, languages)
    }
  }

  /**
   * 根据属性，配置默认设置
   */
  setDefaultConfigByProps = () => {
    const {
      placeholder,
      onChange,
      onFocus,
      onBlur,
      linkImgCallback,
      onlineVideoCallback,
      localBlobImg,
    } = this.props;

    if (placeholder) this.defaultConfig.placeholder = placeholder
    if (onChange) this.defaultConfig.onchange = onChange
    if (onFocus) this.defaultConfig.onfocus = onFocus
    if (onBlur) this.defaultConfig.onblur = onBlur
    if (linkImgCallback) this.defaultConfig.linkImgCallback = linkImgCallback
    if (onlineVideoCallback) this.defaultConfig.onlineVideoCallback = onlineVideoCallback

    // 图片替换为本地Blob伪URL
    if (localBlobImg) {
      this.defaultConfig.customUploadImg = (resultFiles, insertImgFn) => {
        resultFiles.forEach((file) => {
          const url = URL.createObjectURL(file)
          this.imgFile.saveImgFiles(url, file)
          insertImgFn(url)
        })
      }
    }
  }

  /**
   * 设置 editor 内容。注意！必须在创建完 editor 后才可以设置内容
   * @param {string} html 回填的 html 字符串
   */
  setContentByHTMLString(html) {
    if (!this.isCreated()) {
      console.error('[ReactWEdtior Error]: editor has not created')
    }

    if (this.check() && isString(html)) {
      try {
        this.editor.txt.html(html)
      } catch (e) {
        console.error(`[ReactWEdtior Error]: ${e}`)
      }
    }
  }

  /**
   * 替换 html 中的 img 标签的 src 引用地址
   * @param {string} html html 文本
   * @param {function} callback 替换过程中的回调函数
   * @returns 替换后的 html 文本
   */
  replaceHTMLImgBlobURL(html, callback) {
    return replaceHTMLImgBlobURL(html, this.imgFile.getAllImgFiles(), callback)
  }

  render() {
    const { style, className } = this.props;
    return <div style={style} className={className} id={`editor-${this.id}`} />
  }

  changeCreatedFlag = flag => this.hasCreated = flag;
  created = () => this.changeCreatedFlag(true);
  destroyed = () => this.changeCreatedFlag(false);
  isCreated = () => this.hasCreated === true
}
