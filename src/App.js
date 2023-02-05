import React, { Component, createRef } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './editor.js';
import ReactMarkdown from 'react-markdown';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import './App.css';
import "highlight.js/styles/github.css";
import Sizzle from 'sizzle'
import {v4 as uuid} from 'uuid';
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
import openmenu from './openmenu.png'

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
      fileName: "~/Documents/instyll/notes/README.md",
      tocOpen: true,
    }
    
    this.onMarkdownChange = this.onMarkdownChange.bind(this);
    this.slideToRight = this.slideToRight.bind(this);
    this.handleToc = this.handleToc.bind(this);
  }

  onMarkdownChange(md) {
      this.setState({
        markdownSrc: md,
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

  handleToc() {
    this.setState({
      tocOpen: this.state.tocOpen === true ? false : true
    })
  }

  constructToc() {
    let headers = Sizzle("h1, h2, h3, h4, h5, h6");
    let toc = []; 
    headers.forEach(header => {
      let id = header.id || uuid();
      header.id = id;
      toc.push({ text: header.textContent, id: id, type: header.tagName});
    });
    return toc;
  }

  componentDidMount() {
    this.getWordCount();
  }

  render() {

    return (
      <div className="App">

          <div className='container'>

            {/* navbar */}
              
              {/* <div className="navHorizontal">
                  <div className="menuBar">
                      <div className="menuIcon">
                          <img src={back2} className="icon"/>
                      </div>
                      <div className="menuIcon" 
                      onClick={this.handleToc}>
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
            </div> */}

            {/* table of contents*/}

            <div className="tableOfContents" style={{
              display: this.state.tocOpen === true ? "block" : "none", 
            }}>
              <div className="tableInfo">
                <div className="tableHeaders">
                <div id="outline">
                  <p className="tocLabel" >Outline</p>
                </div>
                <div id="notebook">
                  <p className="tocLabel" >Notes</p>
                </div>                  
                </div>
                    {
                       this.constructToc().map((header, index) => (
                      <div key={index} className="outlineElement"
                      style={{
                        marginLeft: header.type === 'H2' ? '20px' :
                        header.type === 'H3' ? '40px' :
                        header.type === 'H4' ? '60px' :
                        header.type === 'H5' ? '80px' :
                        header.type === 'H6' ? '100px' : '0',
                      }}>
                        <a href={`#${header.id}`}>
                          {header.text}
                        </a>
                      </div>
                    ))}
              </div>
            </div>

            {/* main editor view */}

            <ScrollSync>

              <SplitPane 
              split={this.state.split} 
              defaultSize={this.state.size} 
              maxSize="60%"
              id="mainView" 
              allowResize
              style={{
                height: "100%",
                width: this.state.tocOpen === true ? "80%" : "100%",
                transition: "width 0.5s",
                marginRight: this.state.tocOpen === true ? "0" : "0", 
                marginLeft: this.state.tocOpen === true ? "auto" : "0",
              }}>

                <ScrollSyncPane>
                <div 
                className="editor-pane" 
                style={{
                  width: "100%",
                  borderLeft: this.state.tocOpen === true ? "1px solid rgba(0, 0, 0, 0.2)" : "none",
                }} 
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

            {/* <div className="footerPanel" style={{
              height: "3%",
            }}>
              <div className="menuBar">
                <span className="leftComponents">
                  <p className="footerInfo">{this.state.fileName}</p>
                </span>
                <span className="rightComponents">
                  <p className="footerInfo">{this.state.wordCount} {this.state.delimiter}</p>
                  <p className="footerInfo">{this.state.charCount} {this.state.charDelimiter}</p>
                </span>
              </div>
            </div> */}

            </div>
          </div>
    ); 
  }
}


export default App;