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
import layoutPos1 from './layout_icon_position2.png'
import add2 from './add_component_dark.png'
import settings2 from './settings_dark.png'
import palette2 from './palette_dark.png'
import back2 from './back_dark.png'
import code from './code.png'
import image from './image.png'
import table from './table.png'
import link from './link.png'
import help from './help.png'

// Plugins
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'

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
    console.log(this.state.size);
    this.setState({
      size: this.state.size !== "100%" ? "100%" : "50%"
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
                          <span class="tooltip">Insert Image</span>
                      </div>
                      <div className="menuIcon">
                          <img src={code} className="icon"/>
                          <span class="tooltip">Insert Code Block</span>
                      </div>
                      <div className="menuIcon">
                          <img src={table} className="icon"/>
                          <span class="tooltip">Insert Table</span>
                      </div>
                      <div className="menuIcon">
                          <img src={link} className="icon"/>
                          <span class="tooltip">Insert Link</span>
                      </div>
                      <div className="menuIcon"
                      onClick=
                      {this.slideToRight}>
                          <img src={this.state.size === "100%" ? layoutPos1 : layout2} 
                          className="icon"/>
                          <span class="tooltip">Change Layout</span>
                      </div>
                      <span className="rightComponents">    
                      <div className="menuIcon">
                          <img src={palette2} className="icon"/>
                      </div>
                      <div className="menuIcon">
                          <img src={help} className="icon"/>
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
                  remarkPlugins={[remarkMath, remarkGfm]} 
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