import React, { Component } from 'react';
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
import tcontents from './tcontents.png'
import calendar from './calendar.png'
import notionLogo from './notion.png'
import tabplus from './tabplus.png'

// Plugins
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import emoji from 'remark-emoji'
import wikiLinkPlugin from 'remark-wiki-link'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownSrc: "# :pencil: The perfect note-taking app.",
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
      this.getWordCount();
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
    var charCount = textContent.trim().length;
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
                transition: "width 0.1s",

              }}>
                  <div className="menuBar">
                      <div className="menuIcon" 
                      onClick={this.handleToc}>
                          <img src={tcontents} className="icon" draggable={false}/>
                          <span className="tooltip">Outline</span>
                      </div>
                      <div className="menuIcon">
                          <img src={add} className="icon" draggable={false}/>
                          <span className="tooltip">Add Component</span>
                      </div>
                      <div className="menuIcon">
                          <img src={image} className="icon" draggable={false}/>
                          <span className="tooltip">Insert Image</span>
                      </div>
                      <div className="menuIcon">
                          <img src={code} className="icon" draggable={false}/>
                          <span className="tooltip">Insert Code Block</span>
                      </div>
                      <div className="menuIcon">
                          <img src={calendar} className="icon" draggable={false}/>
                          <span className="tooltip">Add Component</span>
                      </div>
                      <div className="menuIcon">
                          <img src={table} className="icon" draggable={false}/>
                          <span className="tooltip">Insert Table</span>
                      </div>
                      <div className="menuIcon">
                          <img src={link} className="icon" draggable={false}/>
                          <span className="tooltip">Insert Link</span>
                      </div>
                      <div className="menuIcon">
                          <img src={notionLogo} className="icon" draggable={false}/>
                          <span className="tooltip">Add Component</span>
                      </div>  

                      <span className="rightComponents">  
                        <div className="menuIcon">
                            <img src={palette} className="icon" draggable={false}/>
                        </div>
                        <div className="menuIcon">
                            <img src={settings} className="icon" draggable={false}/>
                        </div>       
                      </span>
              </div>
            </div>

            {/* table of contents*/}

            <div className="tableOfContents">
              <div className="tableInfo" style={{
                borderRight: this.state.tocOpen === true ? "1px solid rgba(180,180,182, 0.2)" : "none",
              }}>
                <div className="searchContainer">
                  <input className="search" placeholder="Search">
                  </input>
                </div>
                <p className="tocTitleFirst">Files</p>
                <div className="fileSys">
                  <button className="fileElem">Folder 1</button>
                  <div className="fileChildren">
                    <button className="fileElemChild">markdown.md</button> <br></br>
                    <button className="fileElemChild">note.md</button> <br></br>
                    <button className="fileElemChild">README.md</button> <br></br>
                  </div>
                </div>
                <p className='tocTitle'>Tabs</p>
                <div className="tocLabel">
                  <div className="tabHolder">
                  <button className="tab">README.md<span className="tabRightComponents"><img src={tabplus} width="70%" className='tabPlus'></img></span></button>
                  </div>
                  <div className="tabHolder">
                  <button className="tab">markdown.md<span className="tabRightComponents"><img src={tabplus} width="70%" className='tabPlus'></img></span></button>
                  </div>
                  <div className="tabHolder">
                  <button className="tab">note.md<span className="tabRightComponents"><img src={tabplus} width="70%" className='tabPlus'></img></span></button>
                  </div>
                </div>
                <p className='tocTitle'>Stats</p>
                <div className="pageInfo">
                  <span className="leftComponents">
                    <div className="infoDisplay">Characters</div>
                    <div className="infoDisplay">Words</div>
                  </span>
                  <span className="rightComponents">
                    <div className="infoDisplay"><span className="precount">{this.state.charCount}</span>/{this.state.charCount}</div>
                    <div className="infoDisplay"><span className="precount">{this.state.wordCount}</span>/{this.state.wordCount} </div>
                  </span>
                </div>
                <br></br>
                <br></br>
                <p className='tocTitle'>Outline</p>
                <div>                
                    {
                       this.constructToc().map((header, index) => (
                      <div key={index} className="outlineElement">
                        <a href={`#${header.id}`} className="headerNav">
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
              id="mainView"
              style={{
                position: "absolute",
                zIndex: "999",
                height: "95%",
                bottom: "0",
                width: this.state.tocOpen === true ? "80%" : "100%",
                transition: "width 0.1s",
                marginRight: this.state.tocOpen === true ? "0" : "0", 
                marginLeft: this.state.tocOpen === true ? "auto" : "0",
              }}>

                <ScrollSyncPane>
                <div 
                className="editor-pane" 
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
                    remarkPlugins={[remarkMath, remarkGfm, emoji, wikiLinkPlugin]} 
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