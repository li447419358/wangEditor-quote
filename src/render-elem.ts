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
	const childName = h('p', { style: { fontSize: '14px', fontWeight: 'bold', margin: '0', color: '#5A5A5A' } }, [
		name,
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

		// let domList = []
		// matches.forEach(el => {
		//     const matcheCur = el.match(spangex); // 匹配 <span> 标签中的内容(当前解析后有span标签均为图片)
		//     let result = [];
		//     if (matcheCur) {
		//         result.push(el.substring(0, matcheCur.index)); // 添加 <span> 标签之前的部分
		//         result.push(matcheCur[1]); // 添加 <span> 标签中的内容
		//         result.push(el.substring(matcheCur.index + matcheCur[0].length)); // 添加 <span> 标签之后的部分
		//     } else {
		//         result = [el]; // 如果没有匹配到 <span> 标签，直接将整个字符串作为数组元素
		//     }
		//     domList = [...domList,...result]
		// });
		let domList = matches.map((item) => item.replace(/<span.*?>[图片]<\/span>/g, '[图片]').replace('&nbsp;', ''));
		// let domList = matches.map((item) => item.replace(/<span.*?>[图片]<\/span>/g, '[图片]'));
		domList = domList.map((v) => v.replace(/<span[^>]*>/g, '').replace(/<[</span>$]+>/g, '')); // 将所有</span>标签 replace '')
		// 第一行文字
		const childContent1 = h(
			'p',
			{ style: { margin: '0', textWrap: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } },
			[domList[0]],
		);
		// 第二行文字/可能不存在
		const childContent2 = domList[1]
			? h('p', { style: { margin: '0', textWrap: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }, [
					domList[1],
				])
			: null;
		childrenList = childContent2 ? [childName, childContent1, childContent2] : [childName, childContent1];
	} else {
		const childContent1 = h(
			'p',
			{ style: { margin: '0', textWrap: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } },
			[info.messageInfo],
		);
		childrenList = [childName, childContent1];
	}
	// 构建 vnode
	const vnode = h(
		'span',
		{
			props: {
				contentEditable: false, // 不可编辑
			},
			style: {
				width: '99%',
				display: 'inline-block',
				borderLeft: '4px solid #c0cfde',
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
