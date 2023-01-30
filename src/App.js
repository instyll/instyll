import React, { Component, createRef } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './editor.js';
import ReactMarkdown from 'react-markdown';
import { useEffect } from "react";
import './App.css';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css'

// Assets
import layout from './layout_icon.png';
import add from './add_component.png'
import settings from './settings.png'
import palette from './palette.png'
import layout2 from './layout_icon_dark.png';
import add2 from './add_component_dark.png'
import settings2 from './settings_dark.png'
import palette2 from './palette_dark.png'
import back2 from './back_dark.png'
import code from './code.png'
import image from './image.png'
import table from './table.png'
import link from './link.png'

// Math
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// Languages
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownSrc: "# welcome",
      size: "50%",
    }
    
    this.onMarkdownChange = this.onMarkdownChange.bind(this);
    this.slideToRight = this.slideToRight.bind(this);
  }

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md
    });
  }

  slideToRight() {
    this.setState({
      size: this.state.size === "50%" ? "100%" : "50%"
    });
  }

  render() {

    return (
      <div className="App">

          <div className='container'>
              
              <div className="navHorizontal">
                  <div className="menuBar">
                      <div className="menuIcon">
                          <img src={back2} className="icon"/>
                      </div>
                      <div className="menuIcon">
                          <img src={image} className="icon"/>
                      </div>
                      <div className="menuIcon">
                          <img src={code} className="icon"/>
                      </div>
                      <div className="menuIcon">
                          <img src={table} className="icon"/>
                      </div>
                      <div className="menuIcon">
                          <img src={link} className="icon"/>
                      </div>
                      <div className="menuIcon">
                          <img src={layout2} 
                          onClick=
                          {this.slideToRight} className="icon"/>
                      </div>
                      <span className="rightComponents">
                      <div className="menuIcon">
                          <img src={palette2} className="icon"/>
                      </div>
                      <div className="menuIcon">
                          <img src={settings2} className="icon"/>
                      </div>       
                </span>
              </div>
            </div>

            <SplitPane split={this.state.split} defaultSize={this.state.size} id="mainView" 
            style={{
              height: "95%",
            }}>

              <div className="editor-pane" style={{width: "100%"}}>
                <Editor className="editor"
                value={this.state.markdownSrc} 
                onChange={this.onMarkdownChange}/> 
              </div>
              <div className="view-pane">
                <div className="preview">
                  <ReactMarkdown className="result"
                  children={this.state.markdownSrc}
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}/>
                </div>
              </div>
            </SplitPane>
            </div>
          </div>
    );
  }
}


export default App;