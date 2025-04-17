/*
 * @Author: dengxi
 * @Date: 2024-07-05 15:30:08
 * @LastEditors: dengxi
 * @LastEditTime: 2024-08-09 10:18:23
 * @Description:
 */

import { h, VNode } from 'snabbdom';
const renderQuote = (elemNode: any, children, editor): VNode => {
	const { src, name = '', info = {} } = elemNode || {};
	let childrenList;
	// 人名
	const childName = h('span', { style: { fontSize: '14px', fontWeight: 'bold', margin: '0', color: '#5A5A5A' } }, [
		name+":",
	]);
	if (info.type === 0) {
		console.log(elemNode, 'ssselemNode');
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
		console.log(matches, 'match');
		let domList = matches.map((item) => item.replace(/<span.*?>[图片]<\/span>/g, '[图片]').replace('&nbsp;', ''));

		const childContent = h('span', { style: { fontSize: '14px', } }, [
			domList.join(""),
		]);
		//直接拼接
		childrenList = [childName, childContent];
	} else {
		const childContent = h('span', { style: { fontSize: '14px', } }, [
			info.messageInfo,
		]);
		childrenList = [childName, childContent];
	}
	// 构建 vnode
	const vnode = h(
		'span',
		{
			props: {
				contentEditable: false, // 不可编辑
			},
			style: {
				display: 'inline-block',
				// borderLeft: '4px solid #c0cfde',
				color: '#7b7b7b',
				marginLeft: '3px',
				marginRight: '3px',
				backgroundColor: '#f7f7f8',
				borderRadius: '3px',
				padding: '4px 8px',
				userSelect: 'none',
			},
			attrs: {
				[`message-id`]: info.messageId,
			},
		},
		childrenList, // 如 `@张三`
	);
	return vnode;
};
const renderElemConf = {
	type: 'quoteMessage',
	renderElem: renderQuote,
};
export default renderElemConf;
