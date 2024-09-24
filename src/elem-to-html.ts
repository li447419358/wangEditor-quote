/*
 * @Author: dengxi
 * @Date: 2024-07-05 17:30:09
 * @LastEditors: dengxi
 * @LastEditTime: 2024-08-09 10:18:50
 * @Description:
 */
import { SlateElement } from '@wangeditor/editor';

// 生成 html 的函数
const quoteToHtml = (elem: SlateElement, childrenHtml: string): string => {
	const { name = '', info = {} } = elem as any;
	let spanText;
	if (info.type === 0) {
		// 使用正则表达式替换所有的 <img> 标签为 [图片]
		let replacedString = info.messageInfo
			.replace(/<img[^>]*>/g, '[图片]')
			.replace(/<a\b[^>]*>(.*?)<\/a>/g, '<span>$1</span>');
		// 使用正则表达式匹配 <p> 标签内的内容
		let regex = /<p[^>]*>(.*?)<\/p>/g;
		// 使用正则表达式匹配 <sapn> 标签内的内容
		const spangex = /<span.*?>(.*?)<\/span>/;
		let matches = [];
		let match;
		while ((match = regex.exec(replacedString)) !== null) {
			matches.push(match[1]); // 将匹配到的内容添加到数组中
		}
		let domList = matches.map((item) => item.replace(/<span.*?>[图片]<\/span>/g, '[图片]'));
		domList = domList.map((v) => v.replace(/<span[^>]*>/g, '').replace(/<[</span>$]+>/g, '')); // 将所有</span>标签 replace '')
		spanText = `
            <span data-w-e-type="quoemessage" data-w-e-is-void data-w-e-is-inline message-id="${info.messageId}"" class="quoteClass">
            <span style="font-size:14px;font-weight: bold;line-height: 16px;display: block;color:#5A5A5A; margin-bottom: 10px">${name}</span>
            <span style="display: block;margin: 0;white-space: normal;line-height: 22px;text-overflow: ellipsis;overflow: hidden;color: #8F959E;">${domList[0]}</span>
            ${domList[1] ? `<span style="line-height: 1.5;display: block;display: block;margin: 0;textWrap: nowrap;textOverflow: ellipsis;overflow: hidden;color: #8F959E;">${domList[1]}</span>` : ''}
            </span>
        `;
	} else {
		spanText = `
            <span data-w-e-type="quoemessage" data-w-e-is-void data-w-e-is-inline message-id="${info.messageId}"" class="quoteClass">
            <span style="font-size:14px;font-weight: bold;line-height: 16px;display: block;color:#5A5A5A;">${name}</span>
            <span style="display: block;display: block;margin: 0;textWrap: nowrap;textOverflow: ellipsis;overflow: hidden;color: #8F959E;">${info.messageInfo}</span>
            </span>
         `;
	}
	console.log(spanText, 'spanText-----');

	return spanText;
};

// 配置
const conf = {
	type: 'quoteMessage', // 节点 type
	elemToHtml: quoteToHtml,
};

export default conf;
