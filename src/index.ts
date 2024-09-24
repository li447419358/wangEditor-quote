/*
 * @Author: dengxi
 * @Date: 2024-07-05 14:31:45
 * @LastEditors: dengxi
 * @LastEditTime: 2024-09-20 17:01:04
 * @Description:
 */
import { IModuleConf } from "@wangeditor/editor";
import renderElemConf from "./render-elem";
import withQuote from "./plugin";
import parseHtmlConf from "./parse-elem-html";
import elemsToHtml from "./elem-to-html";

const quoteModule: Partial<IModuleConf> = {
    editorPlugin: withQuote as any, // 编辑器方法重写
    renderElems: [renderElemConf] as any, // dom渲染方法
    parseElemsHtml: [parseHtmlConf] as any, //getHtml()方法获取到的字符串
    elemsToHtml: [elemsToHtml] as any, // 获取富文本字符串方法
};
export default quoteModule;
