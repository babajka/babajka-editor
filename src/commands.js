import { NODE_TYPES } from './consts';

export const wrapLink = (editor, href) => {
  editor.wrapInline({
    type: NODE_TYPES.LINK,
    data: { href },
  });

  editor.moveToEnd();
};

export const unwrapLink = editor => {
  editor.unwrapInline(NODE_TYPES.LINK);
};
