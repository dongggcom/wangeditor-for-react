/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-07-02 10:23:15
 * @LastEditTime: 2022-03-07 17:28:40
 */
import React from 'react';
import WEditor from 'wangeditor';
import createId from './utils/unique-id';
import { isEmpty, difference, isEqualString } from './utils/helper';
import { ReactWEProps } from './type';
import { replaceHTMLImgBlobURL } from './utils/htmlRender';
import ImgFile from './imgFile';

interface IWEditor extends WEditor {
	[key: string]: unknown;
}

export default class ReactWEditor extends React.PureComponent<
	ReactWEProps,
	Record<string, unknown>
> {
	private readonly id = createId(8);
	private hasCreated = false; // 是否执行 create 创建函数

	protected imgFile = new ImgFile();
	protected defaultConfig: Record<string, unknown> = {
		zIndex: 1,
	};

	public editor: WEditor | null = null;

	componentDidUpdate(nextProps: ReactWEProps) {
		const { value } = nextProps;

		if (!isEqualString(value as string, this.props.value as string)) {
			this.setContentByHTMLString(this.props.value);
		}
	}
	componentDidMount(): void {
		try {
			this.init();
			this.create();
		} catch (e) {
			console.error(`[ReactWEditor Error]: ${e}`);
		}
	}

	componentWillUnmount(): void {
		if (this.editor) {
			this.editor.destroy();
		}
	}

	private __hook__run = (
		hooks: string[] = [],
		args: Array<unknown> = [],
		target: WEditor | typeof WEditor,
	) => {
		hooks.forEach((hook, index) => {
			if (
				hook in target &&
				typeof (target as IWEditor)[hook] === 'function' &&
				args[index]
			) {
				(target as any)[hook].apply((target as any)[hook], args[index]);
			} else if (/^(\w+\.\w+)+$/.test(hook) && args[index]) {
				const path = hook.split('.');
				const cache = [];
				let fn: any = target;
				path.forEach((d: string) => {
					cache.push(fn);
					fn = fn[d];
				});
				cache.push(fn);
				if (typeof fn === 'function') {
					fn.apply(cache[cache.length - 2], args[index]);
				} else if (typeof args[index] === 'function') {
					(args[index] as (...args: unknown[]) => void).apply(
						args[index],
						cache,
					);
				}
			}
		});
	};

	private __before__instanced() {
		const { globalHook = {} } = this.props;
		const hooks = Object.keys(globalHook);
		const args: unknown[] = Object.values(globalHook);

		this.__hook__run(hooks, args, WEditor);
	}

	private __after__instanced() {
		if (!this.check()) {
			return;
		}
		const { instanceHook = {} } = this.props;
		const hooks = Object.keys(instanceHook);
		const args = Object.values(instanceHook);

		this.__hook__run(hooks, args, this.editor as WEditor);
	}

	protected init(): void {
		const elem = document.getElementById(`editor-${this.id}`);
		if (elem) {
			// 0. 初始化前，调用全局的 hook
			this.__before__instanced();

			// 1. 初始化
			this.editor = new WEditor(`#editor-${this.id}`);

			// 2. 初始化后，调用实例的 hook，支持相对路径，例如键值是 'menus.extend'
			this.__after__instanced();

			// 3. 根据属性配置默认设置
			this.setDefaultConfigByProps();

			// 4. 根据默认设置更新设置
			this.setConfig(this.defaultConfig);
		} else {
			console.error('[ReactWEditor Error]: dom is not found');
		}
	}

	protected check(): boolean {
		if (this.editor) {
			return true;
		}
		console.error('[ReactWEditor Error]: editor not found');
		return false;
	}

	protected create(context = {}): void {
		const { config, defaultValue } = this.props;
		if (this.check()) {
			// 1. 根据 config 属性配置设置
			this.setConfig(config);

			// 2. 扩展 edtior
			this.extend(context);

			// 3. 生成 editor
			(this.editor as WEditor).create();

			// 4. 修改标识
			this.created();

			// 5. 根据 defaultValue 设置内容
			this.setContentByHTMLString(defaultValue);
		}
	}

	/**
	 * 通过 context 扩展 edtior
	 * @param {object} context 待扩展的内容
	 * @param {array} customFilter 需要过滤的扩展字段
	 */
	extend(
		context: Record<string, unknown> = {},
		customFilter: string[] = [],
	): void {
		if (this.check()) {
			// 1. 过滤数组
			const filter = Object.keys(this.editor as WEditor).concat(
				customFilter || [],
			);

			// 2. 向 editor 上扩展
			difference(Object.keys(context), filter).forEach(
				(key) => ((this.editor as IWEditor)[key] = context[key]),
			);
		}
	}

	/**
	 * 销毁编辑器
	 */
	destroy(): void {
		if (!this.isCreated()) {
			console.error(
				"[ReactWEditor Error]: editor has not created, don't destroy.",
			);
			return;
		}
		// 1. 销毁
		(this.editor as WEditor).destroy();
		this.editor = null;

		// 2. 修改标识
		this.destroyed();
	}

	/**
	 * 配置 editor
	 * @param {*} config 配置
	 * @doc https://www.wangeditor.com/doc/
	 */
	setConfig(config: Record<string, unknown> | undefined): void {
		if (config) {
			(this.editor as WEditor).config = Object.assign(
				(this.editor as WEditor).config,
				config,
			);
		}

		// 多语言处理
		const { languages } = this.props;
		if (languages && !isEmpty(languages)) {
			(this.editor as WEditor).config.languages = Object.assign(
				(this.editor as WEditor).config.languages,
				languages,
			);
		}
	}

	/**
	 * 根据属性，配置默认设置
	 */
	setDefaultConfigByProps = (): void => {
		const {
			placeholder,
			onChange,
			onFocus,
			onBlur,
			linkImgCallback,
			onlineVideoCallback,
			localBlobImg,
		} = this.props;

		if (placeholder) this.defaultConfig.placeholder = placeholder;
		if (onChange) this.defaultConfig.onchange = onChange;
		if (onFocus) this.defaultConfig.onfocus = onFocus;
		if (onBlur) this.defaultConfig.onblur = onBlur;
		if (linkImgCallback) this.defaultConfig.linkImgCallback = linkImgCallback;
		if (onlineVideoCallback)
			this.defaultConfig.onlineVideoCallback = onlineVideoCallback;

		// 图片替换为本地Blob伪URL
		if (localBlobImg) {
			this.defaultConfig.customUploadImg = (
				resultFiles: File[],
				insertImgFn: (...arg: unknown[]) => void,
			): void => {
				resultFiles.forEach((file: File) => {
					const url = URL.createObjectURL(file);
					this.imgFile.saveImgFiles(url, file);
					insertImgFn(url);
				});
			};
		}
	};

	/**
	 * 设置 editor 内容。注意！必须在创建完 editor 后才可以设置内容
	 * @param {string} html 回填的 html 字符串
	 */
	setContentByHTMLString(html: string | undefined): void {
		if (!this.isCreated()) {
			console.error('[ReactWEditor Error]: editor has not created');
		}

		if (this.check()) {
			try {
				(this.editor as WEditor).txt.html(html);
			} catch (e) {
				console.error(`[ReactWEditor Error]: ${e}`);
			}
		}
	}

	/**
	 * 替换 html 中的 img 标签的 src 引用地址
	 * @param {string} html html 文本
	 * @param {function} callback 替换过程中的回调函数
	 * @returns 替换后的 html 文本
	 */
	replaceHTMLImgBlobURL(
		html: string,
		callback: (v: File | { toString: () => string }) => string,
	): string {
		return replaceHTMLImgBlobURL(html, this.imgFile.getAllImgFiles(), callback);
	}
	render(): React.ReactElement {
		const { style, className } = this.props;
		return (
			<div
				style={style as React.CSSProperties}
				className={className}
				id={`editor-${this.id}`}
			/>
		);
	}

	changeCreatedFlag = (flag: boolean): boolean => (this.hasCreated = flag);
	created = (): boolean => this.changeCreatedFlag(true);
	destroyed = (): boolean => this.changeCreatedFlag(false);
	isCreated = (): boolean => this.hasCreated === true;
}
