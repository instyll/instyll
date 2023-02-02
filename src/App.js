import React, { Component, createRef } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './editor.js';
import ReactMarkdown from 'react-markdown';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
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
import tcontents from './tcontents.png'

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
      markdownSrc: "# Hello",
      size: "50%",
      wordCount: "0",
      charCount: "0",
      delimiter: "word",
      charDelimiter: "characters",
      fileName: "~/Documents/instyll/notes/README.md"
    }
    
    this.onMarkdownChange = this.onMarkdownChange.bind(this);
    this.slideToRight = this.slideToRight.bind(this);
  }

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md
    });
    this.getWordCount();
  }

  slideToRight() {
    // console.log(this.state.size);
    this.setState({
      size: this.state.size !== "100%" ? "100%" : "50%"
    });
  }

  getWordCount() {
    var screen = document.getElementById("text");
    var textContent = screen.textContent;
    var count = textContent.trim().split(/\s+/).length;
    var charCount = textContent.length;
    this.setState({
      delimiter: this.state.wordCount > 1 ? "words" : "word",
      charDelimiter: this.state.charCount === 1 ? "character" : "characters",
      wordCount: count,
      charCount: charCount,
    })
  }

  componentDidMount() {
    this.getWordCount();
  }

  render() {

    return (
      <div className="App">

          <div className='container'>

            {/* navbar */}
              
              <div className="navHorizontal">
                  <div className="menuBar">
                      <div className="menuIcon">
                          <img src={back2} className="icon"/>
                      </div>
                      <div className="menuIcon">
                          <img src={tcontents} className="icon"/>
                          <span className="tooltip">Outline</span>
                      </div>
                      <div className="menuIcon"
                      onClick=
                      {this.slideToRight}>
                          <img src={this.state.size === "100%" ? layoutPos1 : layout2} 
                          className="icon"/>
                          <span className="tooltip">Change Layout</span>
                      </div>
                      <div className="menuIcon">
                          <img src={link} className="icon"/>
                          <span className="tooltip">Insert Link</span>
                      </div>
                      <div className="menuIcon">
                          <img src={image} className="icon"/>
                          <span className="tooltip">Insert Image</span>
                      </div>
                      <div className="menuIcon">
                          <img src={code} className="icon"/>
                          <span className="tooltip">Insert Code Block</span>
                      </div>
                      <div className="menuIcon">
                          <img src={table} className="icon"/>
                          <span className="tooltip">Insert Table</span>
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

            {/* main editor view */}

            <ScrollSync>

              <SplitPane split={this.state.split} defaultSize={this.state.size} id="mainView" 
              style={{
                height: "95%",
              }}>

                <ScrollSyncPane>
                <div 
                className="editor-pane" 
                style={{width: "100%"}} 
                id="markdown"
                >
                  <Editor className="editor"
                  value={this.state.markdownSrc}
                  onChange={this.onMarkdownChange}
                  />
                </div>
                </ScrollSyncPane>


                <ScrollSyncPane>
                <div className="view-pane">
                  <div className="preview" id="text">
                    <ReactMarkdown className="result"
                    children={this.state.markdownSrc}
                    remarkPlugins={[remarkMath, remarkGfm]} 
                    rehypePlugins={[rehypeKatex]}/>
                  </div>
                </div>
                </ScrollSyncPane>

              </SplitPane>

            </ScrollSync>

            {/* footer panel */}

            <div className="footerPanel">
              <div className="menuBar">
                <span className="leftComponents">
                  <p className="footerInfo">{this.state.fileName}</p>
                </span>
                <span className="rightComponents">
                  <p className="footerInfo">{this.state.wordCount} {this.state.delimiter}</p>
                  <p className="footerInfo">{this.state.charCount} {this.state.charDelimiter}</p>
                </span>
              </div>
            </div>
            
            </div>
          </div>
    );
  }
}


export default App;