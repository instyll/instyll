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
import add from './add_component.png'
import settings from './settings.png'
import palette from './palette.png'
import code from './code.png'
import image from './image.png'
import table from './table.png'
import link from './link.png'
import help from './help.png'
import tcontents from './tcontents.png'

// Plugins
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import emoji from 'remark-emoji'

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
      fileName: "README.md",
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
  }

  slideToRight() {
    this.setState({
      size: this.state.size !== "100%" ? "100%" : "50%",
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
              
              <div className="navHorizontal" style={{
                width: this.state.tocOpen === true ? "80%" : "100%",
                transition: "width 0.2s",
              }}>
                  <div className="menuBar">
                      <div className="menuIcon" 
                      onClick={this.handleToc}>
                          <img src={tcontents} className="icon"/>
                          <span className="tooltip">Outline</span>
                      </div>
                      <div className="menuIcon">
                          <img src={add} className="icon"/>
                          <span className="tooltip">Add Component</span>
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
                      <div className="menuIcon">
                          <img src={link} className="icon"/>
                          <span className="tooltip">Insert Link</span>
                      </div>

                      <span className="rightComponents">    
                        <div className="menuIcon">
                            <img src={palette} className="icon"/>
                        </div>
                        <div className="menuIcon">
                            <img src={settings} className="icon"/>
                        </div>       
                      </span>
              </div>
            </div>

            {/* table of contents*/}

            <div className="tableOfContents" style={{
              width: this.state.tocOpen === true ? "20%" : "0%", 
              transition: "width 0.2s",
            }}>
              <div className="tableInfo" style={{
                borderRight: this.state.tocOpen === true ? "1px solid rgba(180,180,182, 0.2)" : "none",
              }}>
                <p className="tocLabel" >Tabs</p>
                <hr></hr>
                <div className="pageInfo">
                  <span className="leftComponents">
                    <div className="infoDisplay">Characters</div>
                    Words
                  </span>
                  <span className="rightComponents">
                    <div className="infoDisplay">{this.state.charCount}/{this.state.charCount}</div>
                    {this.state.wordCount}/{this.state.wordCount}
                  </span>
                </div>
                <br></br>
                <br></br>
                <hr></hr>
                <div>                
                    {
                       this.constructToc().map((header, index) => (
                      <div key={index} className="outlineElement">
                        <a href={`#${header.id}`}>
                          <span className="headerDelim">
                          { 
                          header.type === 'H2' ? '## ' :
                          header.type === 'H3' ? '### ' :
                          header.type === 'H4' ? '#### ' :
                          header.type === 'H5' ? '##### ' :
                          header.type === 'H6' ? '###### ' : '# '}
                          </span>
                          {header.text}
                        </a>
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            {/* main editor view */}

            <ScrollSync>

              <SplitPane 
              split={this.state.split} 
              defaultSize={this.state.size} 
              // maxSize="60%"
              id="mainView" 
              style={{
                zIndex: "1",
                height: "95%",
                bottom: "0",
                width: this.state.tocOpen === true ? "80%" : "100%",
                transition: "width 0.2s",
                marginRight: this.state.tocOpen === true ? "0" : "0", 
                marginLeft: this.state.tocOpen === true ? "auto" : "0",
              }}>

                <ScrollSyncPane>
                <div 
                className="editor-pane" 
                style={{
                  width: "100%",
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
                    remarkPlugins={[remarkMath, remarkGfm, emoji]} 
                    rehypePlugins={[rehypeMathjax]}/>
                  </div>
                </div> 
                </ScrollSyncPane>

              </SplitPane>

            </ScrollSync>

            </div>
          </div>
    ); 
  }
}


export default App;