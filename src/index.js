import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import 'draft-js/dist/Draft.css';

class BabajkaEditor extends Component {
  constructor(props) {
    super(props);

    this.editor = React.createRef();
  }

  state = {
    editorState: EditorState.createEmpty(),
  };

  componentDidMount() {
    this.editor.current.focus();
  }

  handleChange = editorState => this.setState({ editorState });

  handleBold = () => {
    const { editorState } = this.state;
    this.handleChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <button onClick={this.handleBold}>Bold</button>
        <Editor
          editorState={editorState}
          onChange={this.handleChange}
          handleKeyCommand={this.handleKeyCommand}
          placeholder="Enter some text..."
          ref={this.editor}
        />
      </div>
    );
  }
}

BabajkaEditor.propTypes = {};

BabajkaEditor.defaultProps = {};

export default BabajkaEditor;
