import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { KeyUtils, Value } from 'slate';
import isHotkey from 'is-hotkey';

import { renderMark, renderNode } from './renderers';
import { MARK_TYPES } from './consts';

const markHotkey = options => {
  const { type, key } = options;

  return {
    // eslint-disable-next-line consistent-return
    onKeyDown: (event, editor, next) => {
      if (!isHotkey(`mod+${key}`, event)) {
        return next();
      }
      event.preventDefault();
      editor.toggleMark(type);
    },
  };
};

const plugins = [
  markHotkey({ key: 'b', type: MARK_TYPES.BOLD }),
  markHotkey({ key: '`', type: MARK_TYPES.CODE }),
  markHotkey({ key: 'i', type: MARK_TYPES.ITALIC }),
  markHotkey({ key: '~', type: MARK_TYPES.STRIKE }),
  markHotkey({ key: 'u', type: MARK_TYPES.UNDERLINE }),
];

class BabajkaEditor extends Component {
  constructor(props) {
    super(props);

    // In order to allow ssr we need to reset the key
    // generating function to its initial state.
    KeyUtils.resetGenerator();

    this.state = {
      value: Value.fromJSON(props.value),
    };
  }

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, editor, next) => {
    if (isHotkey('mod+s', event)) {
      this.handleSave();
      return;
    }
    // eslint-disable-next-line consistent-return
    return next();
  };

  handleSave = () => {
    const { value } = this.state;
    /* eslint-disable */
    console.log(value.toJSON());
    alert('saved! check console');
    /* eslint-enable */
  };

  renderNode = (props, editor, next) => {
    const {
      node: { type, data },
      children,
    } = props;

    return renderNode({ type, data, children }) || next();
  };

  renderMark = (props, editor, next) => {
    const {
      mark: { type },
      children,
    } = props;

    return renderMark({ type, children }) || next();
  };

  render() {
    return (
      <Editor
        plugins={plugins}
        placeholder="Enter some plain text..."
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        renderNode={this.renderNode}
        renderMark={this.renderMark}
      />
    );
  }
}

export default BabajkaEditor;
