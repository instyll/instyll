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

  handleDividerMove() {
    if (this.leftRef.current) {
      this.leftRef.current.scrollTop = this.rightRef.current.scrollTop;
      this.leftRef.current.scrollLeft = this.rightRef.current.scrollLeft;
    }
    if (this.rightRef.current) {
      this.rightRef.current.scrollTop = this.leftRef.current.scrollTop;
      this.rightRef.current.scrollLeft = this.leftRef.current.scrollLeft;
    }
  }

  render() {
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor-pane" ref={this.leftRef} >
            <Editor className="editor" value={this.state.markdownSrc} onChange={this.onMarkdownChange}/>
          </div>
          <div className="view-pane" ref={this.rightRef} >
            <ReactMarkdown className="result" children={this.state.markdownSrc}/>
          </div>
        </SplitPane>
      </div>
    );
  }
}


export default App;