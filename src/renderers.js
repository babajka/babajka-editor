import React from 'react';

import { MARK_TYPES, NODE_TYPES } from './consts';

export const renderNode = ({ type, data, children }) => {
  switch (type) {
    case 'paragraph':
      return <p className={data.get('className')}>{children}</p>;
    case NODE_TYPES.H1:
      return <h1>{children}</h1>;
    default:
      return null;
  }
};

export const renderMark = ({ type, children }) => {
  switch (type) {
    case MARK_TYPES.BOLD:
      return <strong>{children}</strong>;
    case MARK_TYPES.CODE:
      return <code>{children}</code>;
    case MARK_TYPES.ITALIC:
      return <em>{children}</em>;
    case MARK_TYPES.STRIKE:
      return <del>{children}</del>;
    case MARK_TYPES.UNDERLINE:
      return <u>{children}</u>;
    default:
      return null;
  }
};

export default {
  block: renderNode,
  mark: renderMark,
  string: ({ children }) => children,
};
