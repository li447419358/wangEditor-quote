/*
 * @Author: dengxi
 * @Date: 2024-07-05 17:02:03
 * @LastEditors: dengxi
 * @LastEditTime: 2024-07-10 11:13:06
 * @Description: 
 */

import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
// import { MentionElement } from './custom-types'
import DOMElement = globalThis.Element

const parseHtml = (
  elem: DOMElement,
  children: SlateDescendant[],
  editor: IDomEditor
): SlateElement => {
  // elem HTML 结构 <span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-value="张三" data-info="xxx">@张三</span>
  console.log(elem,'aaaaaaaaaaaaa');
//   const value = elem.getAttribute('data-value') || ''
//   const rawInfo = decodeURIComponent(elem.getAttribute('data-info') || '')
//   let info: any
//   try {
//     info = JSON.parse(rawInfo)
//   } catch (ex) {
//     info = rawInfo
//   }

  return {
    type: 'quoteMessage',
    children: [{ text: '' }], // void node 必须有一个空白 text
  } as any
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="quoteMessage"]',
  parseElemHtml: parseHtml,
}

export default parseHtmlConf
