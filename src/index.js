import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';
import { KeyUtils, Value } from 'slate';
// import Types from 'slate-prop-types';
import isHotkey from 'is-hotkey';

import { renderMark, renderNode } from './renderers';
import { MARK_TYPES, NODE_TYPES, DEFAULT_NODE } from './consts';
import ToolbarIcon from './components/ToolbarIcon';
import { unwrapLink, wrapLink } from './commands';

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

const noop = () => {};

class BabajkaEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onChange: noop,
  };

  constructor(props) {
    super(props);

    // In order to allow ssr we need to reset the key
    // generating function to its initial state.
    KeyUtils.resetGenerator();

    this.state = {
      value: Value.fromJSON(props.value),
    };
  }

  ref = editor => {
    this.editor = editor;
  };

  onChange = ({ value }) => {
    const { onChange } = this.props;
    this.setState({ value }, () => onChange(this.state.value));
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
      attributes: attrs,
    } = props;

    return renderNode({ type, data, children, attrs }) || next();
  };

  renderMark = (props, editor, next) => {
    const {
      mark: { type },
      children,
      attributes: attrs,
    } = props;

    return renderMark({ type, children, attrs }) || next();
  };

  isActive = (type, id) => {
    const PATH_BY_TYPE = {
      mark: 'activeMarks',
      block: 'blocks',
    };
    const PATH_BY_ID = {
      [NODE_TYPES.LINK]: 'inlines',
    };
    const path = PATH_BY_ID[id] || PATH_BY_TYPE[type];
    const { value } = this.state;
    return value[path].some(item => item.type === id);
  };

  handleLink = isActive => {
    const { value } = this.state;
    if (isActive) {
      this.editor.command(unwrapLink);
      return;
    }
    // add link to text
    if (value.selection.isExpanded) {
      // eslint-disable-next-line no-alert
      const href = window.prompt('Enter the URL of the link:');

      if (href == null) {
        return;
      }

      this.editor.command(wrapLink, href);
      return;
    }
    // add text with link
    // eslint-disable-next-line no-alert
    const href = window.prompt('Enter the URL of the link:');

    if (href == null) {
      return;
    }

    // eslint-disable-next-line no-alert
    const text = window.prompt('Enter the text for the link:');

    if (text == null) {
      return;
    }

    this.editor
      .insertText(text)
      .moveFocusBackward(text.length)
      .command(wrapLink, href);
  };

  onToolbarItemClick = (type, event, id) => {
    event.preventDefault();
    if (type === 'mark') {
      this.editor.toggleMark(id);
      return;
    }
    // block
    const isActive = this.isActive(type, id);
    if (id === NODE_TYPES.LINK) {
      this.handleLink(isActive);
      return;
    }
    this.editor.setBlocks(isActive ? DEFAULT_NODE : id);
  };

  renderToolbarItem = (type, id) => {
    const isActive = this.isActive(type, id);
    return (
      <ToolbarIcon
        key={id}
        name={id}
        onClick={event => this.onToolbarItemClick(type, event, id)}
        active={isActive}
      />
    );
  };

  render() {
    return (
      <div>
        {' '}
        <div>
          {Object.keys(MARK_TYPES).map(id => this.renderToolbarItem('mark', id))}
          {Object.keys(NODE_TYPES).map(id => this.renderToolbarItem('block', id))}
        </div>
        <Editor
          ref={this.ref}
          plugins={plugins}
          placeholder="Enter some plain text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}

export default BabajkaEditor;
