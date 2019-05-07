import React, { Component } from 'react';
import NextHead from 'next/head';

import BabajkaEditor from '../../../src';
import renderToHtml from '../../../src/renderToHtml';

// eslint-disable-next-line import/extensions
import initialState from '../initialState.json';

import '../../../src/styles/icons.css';

class Home extends Component {
  static propTypes = {};

  state = {
    content: initialState,
  };

  render() {
    const { content } = this.state;
    return (
      <div>
        <NextHead>
          <meta charSet="UTF-8" />
          <title>Next Example</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
          <link rel="icon" href="/static/favicon.ico" />
        </NextHead>

        <div className="hero">
          <h1 className="title">Welcome to Next!</h1>
          <p className="description">
            To get started, edit <code>../../../src/index.js</code> and save to reload.
          </p>
        </div>

        <div className="content">
          <div className="editor-wrapper">
            <h2>Editor</h2>
            <div className="border">
              <BabajkaEditor value={content} onChange={c => this.setState({ content: c })} />
            </div>
          </div>
          <div className="editor-wrapper">
            <h2>renderToHtml</h2>
            {renderToHtml(content)}
          </div>
        </div>

        <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica,
              sans-serif;
          }
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .content {
            display: flex;
            flex-direction: row;
          }
          .editor-wrapper {
            flex-grow: 0.5;
            margin: 50px;
          }
          .border {
            border: 1px solid black;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
