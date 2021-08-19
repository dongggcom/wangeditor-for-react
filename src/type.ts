/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-07-02 10:49:27
 * @LastEditTime: 2021-07-05 16:04:57
 */
import WEditor from 'wangeditor/src/editor';
import { ConfigType } from 'wangeditor/src/config';
import langConfig from 'wangeditor/src/config/lang';

type hookType = Record<
	string,
	Array<unknown> | ((editor: typeof WEditor, ...args: unknown[]) => void)
>;

export type ReactWEProps = {
	style?: StyleSheet;
	className?: string;
	config?: Partial<ConfigType>;

	defaultValue?: string;
	localBlobImg?: boolean;
	placeholder?: string;
	value?: string;
	languages?: typeof langConfig;
	instanceHook?: hookType;
	globalHook?: hookType;

	linkImgCallback?: (src: string, alt: string, href: string) => void;
	onlineVideoCallback?: (video: unknown) => void;
	onChange?: (html: string) => void;
	onBlur?: (html: string) => void;
	onFocus?: (html: string) => void;
};
