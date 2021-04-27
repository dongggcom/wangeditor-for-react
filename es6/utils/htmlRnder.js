/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-04-27 18:22:43
 * @LastEditTime: 2021-04-27 19:01:05
 */

// 是否有 html 标签
const isHTML = input => /<(\S*?) [^>]*>.*?<\/\1>|<.*?>/gm.test(input)

// 是否有 img 标签
const hasImgTag = input => /<img.*?src=\\?"(.*?)\\?".*?\/?>/.test(input)

/**
 * 根据 html 文本获取 src 地址
 * @param {string} input html 文本
 * @returns {array} html 文本中 src 地址组成的数组
 */
const getImgSrcByHTMLString = (input) => {
  const imgBlobURLArray = []
  const pattern = /<img.*?src=\\?"(.*?)\\?".*?\/?>/gi
  const content = input.replace('\\"', '"')
  let r;
  while (r !== null) {
    r = pattern.exec(content)
    if (r) {
      imgBlobURLArray.push(r)
    }
  }
  return imgBlobURLArray
}

/**
 * 替换 html 中的 img 标签的 src 引用地址
 * @param {string} content html 文本
 * @param {*} files 缓存的 File
 * @param {function} replaceCallback 替换过程的回调函数，参数是 Flie
 * @returns {string} 替换后的 html 文本
 */
export const replaceHTMLImgBlobURL = (content, files = {}, replaceCallback = v => v !== undefined ? v.toString() : v) => {
  if (typeof content !== 'string') {
    console.error('[Type Error]: content is not string')
    return ''
  }

  if (!Object.keys(files).length) {
    console.error('[File Error]: files is empty')
    return ''
  }

  if (isHTML(content) && hasImgTag(content)) {
    const blobSrcArray = getImgSrcByHTMLString(content);
    if (blobSrcArray.length) {
      let copy = content;
      blobSrcArray.map((pattern) => {
        if (pattern && pattern[0]) {
          const imgSrc = pattern[1]
          const file = files[imgSrc]
          if (file) {
            copy = copy.replace(pattern[1], replaceCallback(file))
          }
        }
      })
      return copy;
    }
  }
  return content;
}

