import React, { Component } from 'react';
import layout from './layout_icon.png';
import add from './add_component.png'
import settings from './settings.png'
import palette from './palette.png'

import layout2 from './layout_icon_dark.png';
import add2 from './add_component_dark.png'
import settings2 from './settings_dark.png'
import palette2 from './palette_dark.png'

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

        <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"></link>
        <style>
          @import url('https://fonts.cdnfonts.com/css/sf-pro-display');
        </style>

        <div className="menuBar">
          <div className="menuIcon">
            <img src={layout2}/>
          </div>
          <div className="menuIcon">
            <img src={add2}/>
          </div>
          <span class="rightComponents">
          <div className="menuIcon">
            <img src={palette2}/>
          </div>
          <div className="menuIcon">
            <img src={settings2}/>
          </div>       
          </span>
        </div>

        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor-pane">
            <Editor className="editor" value={this.state.markdownSrc} 
            onChange={this.onMarkdownChange} ref={this.leftRef} 
            onScroll={(cm) => this.handleDividerMove(cm)}/>
          </div>
          <div className="view-pane">
            <div className="preview">
              <ReactMarkdown className="result" ref={this.rightRef} children={this.state.markdownSrc} />
            </div>
          </div>
        </SplitPane>
      </div>
    );
  }
}


export default App;