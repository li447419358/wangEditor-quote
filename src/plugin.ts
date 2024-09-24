import { IDomEditor, DomEditor, SlateEditor, SlatePoint, SlateNode, SlateTransforms } from '@wangeditor/editor';

const withQuote = <T extends IDomEditor>(editor: T): T => {
	const { insertText, isInline, isVoid } = editor;
	const newEditor = editor;

	// 重写 isInline
	newEditor.isInline = (elem) => {
		const type = DomEditor.getNodeType(elem);
		if (type === 'quoteMessage') {
			return true;
		}
		return isInline(elem);
	};

	// 重写 isVoid
	newEditor.isVoid = (elem) => {
		const type = DomEditor.getNodeType(elem);
		if (type === 'quoteMessage') {
			return true;
		}

		return isVoid(elem);
	};

	return newEditor;
};

export default withQuote;
