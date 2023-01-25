import React, { Component } from 'react';
import layout from './layout_icon.png';
import add from './add_component.png'
import settings from './settings.png'
import palette from './palette.png'
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
        <div className="menuBar">
          <img src={layout} className="menuIcon"/>
          <img src={add} className="menuIcon"/>
          <img src={palette} className="menuIcon"/>
          <img src={settings} className="menuIcon"/>
        </div>
        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor-pane">
            <Editor className="editor" value={this.state.markdownSrc} 
            onChange={this.onMarkdownChange} ref={this.leftRef} 
            onScroll={(cm) => this.handleDividerMove(cm)}/>
          </div>
          <div className="view-pane">
          <ReactMarkdown className="result" ref={this.rightRef} children={this.state.markdownSrc} />
          </div>
        </SplitPane>
      </div>
    );
  }
}


export default App;