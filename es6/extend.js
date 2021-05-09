/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-05-09 10:03:59
 * @LastEditTime: 2021-05-09 11:41:38
 */
import ReactWEdtiorCore from './core';

export default function extend(context) {
  return class Component extends ReactWEdtiorCore {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      try {
        this.init();
        this.create(context);
      } catch (e) {
        console.error(`[ReactWEdtior Error]: ${e}`)
      }
    }
  }
}
