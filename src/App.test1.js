import React, { Component } from 'react';
import logo from './logo.svg';
import SplitPane from 'react-split-pane';
import Editor from './editor.js';
import ReactMarkdown from 'react-markdown';
import  useRef from 'react';
import './App.css';



class App extends Component {
  constructor(props) {
    super();
    this.state = {
      markdownSrc: "# Hello World",
    }
    this.onMarkdownChange = this.onMarkdownChange.bind(this);
    this.leftRef = React.createRef();
    this.rightRef = React.createRef();
  }

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md
    });
  }

  handleDividerMove(cm) {
    if (this.rightRef.current) {
      this.rightRef.current.firstChild.scrollTop = cm.getScrollInfo().top;
      this.rightRef.current.firstChild.scrollLeft = cm.getScrollInfo().left;
    }
  }

  render() {
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor-pane">
            <Editor className="editor" value={this.state.markdownSrc} 
            onChange={this.onMarkdownChange} ref={this.leftRef} 
            onScroll={(cm) => this.handleDividerMove(cm)}/>
          </div>
          <div className="view-pane" ref={this.rightRef}>
          <ReactMarkdown className="result" children={this.state.markdownSrc} />
          </div>
        </SplitPane>
      </div>
    );
  }
}


export default App;