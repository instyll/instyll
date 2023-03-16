import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './editor.js';
import ReactMarkdown from 'react-markdown';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import './App.css';
import "highlight.js/styles/github.css";
import Sizzle from 'sizzle'
import { v4 as uuid } from 'uuid';
import 'katex/dist/katex.min.css'
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { getFilesInDirectory } from './fileUtils';

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
      isDark: true,
      fileNames: [],
    }

    this.onMarkdownChange = this.onMarkdownChange.bind(this);
    this.slideToRight = this.slideToRight.bind(this);
    this.handleToc = this.handleToc.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.fetchFiles = this.fetchFiles.bind(this);
  }

  // Update view pane on each edit

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md,
    });
    this.getWordCount();
  }

  // Full editor view

  slideToRight() {
    this.setState({
      size: this.state.size !== "100%" ? "100%" : "50%",
    });
  }

  // Getting document statistics

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

  // Sidebar toggle

  handleToc() {
    this.setState({
      tocOpen: this.state.tocOpen === true ? false : true
    })
  }

  // Get headers for sidebar outline

  constructToc() {
    let headers = Sizzle("h1, h2, h3, h4, h5, h6");
    let toc = [];
    headers.forEach(header => {
      let id = header.id || uuid();
      header.id = id;
      toc.push({ text: header.textContent, id: id, type: header.tagName });
    });
    return toc;
  }

  // dark / light mode 

  handleTheme() {
    const html = document.querySelector("html");
    var theme = "";
    if (this.state.isDark === true) {
      theme = "dark";
    }
    else if (this.state.isDark === false) {
      theme = "light";
    }
    console.log(theme);
    html.setAttribute("data-theme", theme);
  }

  toggleTheme() {
    this.setState({
      isDark: !this.state.isDark,
    });
    this.handleTheme();
  }

  async fetchFiles() {
    const files = await getFilesInDirectory('/home/wou/Documents/instyllnotes');
    this.setState({ fileNames: files });
  }

componentDidMount() {
  this.getWordCount();
  this.fetchFiles();
}

render() {


  return (
    <div className="App">

      <div className='container'>

        {/* navbar */}

        <div className="navHorizontal">

          <div className="menuBar">
            <div className="menuIcon"
              onClick={this.handleToc}>
              <img src={tcontents} className="icon" draggable={false} />
              <span className="tooltip">Outline</span>
            </div>
            <div className="menuIcon">
              <img src={add} className="icon" draggable={false} />
              <span className="tooltip">Add Component</span>
            </div>
            <div className="menuIcon">
              <img src={image} className="icon" draggable={false} />
              <span className="tooltip">Insert Image</span>
            </div>
            <div className="menuIcon">
              <img src={code} className="icon" draggable={false} />
              <span className="tooltip">Insert Code Block</span>
            </div>
            <div className="menuIcon">
              <img src={calendar} className="icon" draggable={false} />
              <span className="tooltip">Daily Note</span>
            </div>
            <div className="menuIcon">
              <img src={table} className="icon" draggable={false} />
              <span className="tooltip">Insert Table</span>
            </div>
            <div className="menuIcon">
              <img src={link} className="icon" draggable={false} />
              <span className="tooltip">Insert Link</span>
            </div>
            <input className="search" placeholder="Search">
            </input>

            <span className="rightComponents">
              <div className="menuIcon"
                onClick={this.toggleTheme}>
                <img src={palette} className="icon" draggable={false} />
              </div>
              <div className="menuIcon">
                <img src={settings} className="icon" draggable={false} />
              </div>
            </span>
          </div>
        </div>

        <div className="elevated">

          {/* table of contents*/}

          <div className="tableOfContents">
            <div className="tableInfo">
              <p className="tocTitleFirst">Files</p>
              <div className="fileSys">
                {this.state.fileNames.map((file, index) => (
                  <button key={index} className="fileElemChild">{file}</button>
                ))}
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
                  <div className="infoDisplay"><div className="label">Characters</div></div>
                  <div className="infoDisplay"><div className="label">Words</div></div>
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

          {/* <ScrollSync> */}

          <div className="allotment-container" style={{
            position: "absolute",
            zIndex: "998",
            height: "100%",
            bottom: "0",
            width: this.state.tocOpen === true ? "calc(100% - 270px)" : "100%",
            // transition: "width 0s",
            marginRight: this.state.tocOpen === true ? "0" : "0",
            marginLeft: this.state.tocOpen === true ? "270px" : "0",
            borderRadius: "10px",
          }}>
            <Allotment
              style={{
                borderRadius: "10px",
              }}
              id="mainView"
              snap={true}
              vertical={false}
            >
              <div className="editor-pane" allotment="editor">
                <Editor
                  className="editor"
                  value={this.state.markdownSrc}
                  onChange={this.onMarkdownChange}
                />
              </div>
              <div className="view-pane" allotment="preview">
                <div className="preview" id="text">
                  <ReactMarkdown
                    className="result"
                    children={this.state.markdownSrc}
                    remarkPlugins={[remarkMath, remarkGfm, emoji, wikiLinkPlugin]}
                    rehypePlugins={[rehypeMathjax]}
                  />
                </div>
              </div>
            </Allotment>

          </div>

          {/* </ScrollSync> */}

        </div>
      </div>

    </div>
  );
}
}


export default App;