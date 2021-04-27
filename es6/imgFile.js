/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-04-27 11:57:19
 * @LastEditTime: 2021-04-27 17:52:50
 */

export default class ImgFile {
  store = {}

  /**
   * 缓存图片文件
   * @param {*} name 图片key
   * @param {*} file 图片File文件
   * @param {*} forceUpdate 如果已经存在是否更新
   */
  saveImgFiles = (name, file, forceUpdate = false) => {
    if (this.store[name] && !forceUpdate) {
      return;
    }
    this.store[name] = file
  }

  /**
   * 获取图片文件
   * @param {*} name 图片key
   * @param {*} defaultValue 当文件未查询到时，默认文件
   * @returns 返回 File 文件，或者 defaultValue 
   */
  getImgFile = (name, defaultValue) => this.store[name] || defaultValue

  /**
   * 返回存储的图片对象
   * @returns {*}
   */
  getAllImgFiles = () => this.store

  /**
   * 清空图片的存储空间
   */
  resetImgFiles = () => this.store = {};
}
