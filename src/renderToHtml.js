import { Value } from 'slate';
import Html from 'slate-html-serializer';
import renderHTML from 'react-render-html';

import renderers from './renderers';

const rules = [
  {
    // eslint-disable-next-line consistent-return
    serialize: ({ object, type, data }, children) => {
      const render = renderers[object];
      if (render) {
        return render({ type, data, children });
      }
    },
  },
];

const html = new Html({ rules });

const renderToHtml = value => renderHTML(html.serialize(Value.fromJSON(value)));

export default renderToHtml;
