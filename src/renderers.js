import React from 'react';

import { MARK_TYPES, NODE_TYPES, DEFAULT_NODE } from './consts';

export const renderNode = ({ type, data, children, attrs }) => {
  switch (type) {
    case NODE_TYPES.SECTION:
      return (
        <section {...attrs} className="article-page__block">
          {children}
        </section>
      );
    case DEFAULT_NODE:
      return (
        <p {...attrs} className="article-page__paragraph">
          {children}
        </p>
      );
    case NODE_TYPES.H2:
      return <h2 {...attrs}>{children}</h2>;
    case NODE_TYPES.H3:
      return <h3 {...attrs}>{children}</h3>;
    case NODE_TYPES.LINK:
      return (
        <a {...attrs} href={data.get('href')}>
          {children}
        </a>
      );
    default:
      return null;
  }
};

export const renderMark = ({ type, children, attrs }) => {
  switch (type) {
    case MARK_TYPES.BOLD:
      return <strong {...attrs}>{children}</strong>;
    case MARK_TYPES.CODE:
      return <code {...attrs}>{children}</code>;
    case MARK_TYPES.ITALIC:
      return <em {...attrs}>{children}</em>;
    case MARK_TYPES.STRIKE:
      return <del {...attrs}>{children}</del>;
    case MARK_TYPES.UNDERLINE:
      return <u {...attrs}>{children}</u>;
    default:
      return null;
  }
};

export default {
  block: renderNode,
  mark: renderMark,
  string: ({ children }) => children,
  // FIXME
  inline: renderNode,
};
