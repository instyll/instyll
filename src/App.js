import React, { Component } from 'react';
import Editor from './editor.js';
import ReactMarkdown from 'react-markdown';
import './App.css';
import "highlight.js/styles/github.css";
import Sizzle from 'sizzle'
import { v4 as uuid } from 'uuid';
import 'katex/dist/katex.min.css'
import { Allotment } from "allotment";
import TemplateModal from "./TemplateModal";
import "allotment/dist/style.css";
// import Prism from 'prismjs';
// import 'prismjs/components/prism-jsx';
// import 'prismjs/themes/prism.css';
import { getFilesInDirectory } from './fileUtils';
import chokidar from 'chokidar'
import fs from 'fs';
import debounce from 'lodash/debounce';
import CommandPalette from 'react-command-palette';

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
import tabplus from './tabplus.png'
import focus from './focus.png'
import focusFilled from './focus-filled.png'

// Plugins
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import emoji from 'remark-emoji'
import wikiLinkPlugin from 'remark-wiki-link'
import { chrome } from 'process';
import { timeStamp } from 'console';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownSrc: "hello",
      size: "50%",
      wordCount: "0",
      charCount: "0",
      delimiter: "word",
      charDelimiter: "characters",
      fileName: "README.md",
      tocOpen: true,
      isDark: true,
      fileNames: [],
      selectedFile: null,
      notesDirectory: "/home/wou/Documents/instyllnotes/",
      tocHeaders: [],
      cleanup: null,
      orientation: false,
      focused: false,
      modalOpen: false,
    }

    this.onMarkdownChange = this.onMarkdownChange.bind(this);
    this.slideToRight = this.slideToRight.bind(this);
    this.handleToc = this.handleToc.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
    this.fetchFiles = this.fetchFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateToc = this.updateToc.bind(this);
    this.changeLayout = this.changeLayout.bind(this);
  }

  // Update view pane on each edit

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md,
    }, () => {
      this.getWordCount();
    });
  }

  // Full editor view

  slideToRight() {
    this.setState({
      size: this.state.size !== "100%" ? "100%" : "50%",
    });
  }

  // change layout

  changeLayout = (orient) => {
    if (orient == "vertical") {
      this.setState({
        orientation: false,
      });
      console.log("stacked:" + this.state.orientation)
    }
    else {
      this.setState({
        orientation: true,
      });
      console.log("stacked:" + this.state.orientation)
    }
  }

  // Getting document statistics

  getWordCount() {
    var screen = document.getElementById("text");
    console.log(screen)
    // var screen = document.querySelector("#text *:not")
    var charCount = screen.textContent.trim().length; // update charCount here
    var textContent = screen.textContent;
    console.log(textContent)
    var count = textContent.trim().split(/\s+/).length;
    this.setState({
      delimiter: count > 1 ? "words" : "word", // use count variable here
      charDelimiter: charCount === 1 ? "character" : "characters", // use charCount variable here
      wordCount: count,
      charCount: charCount,
    });
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

  updateToc() {
    var toc = this.constructToc();
    this.setState({
      tocHeaders: toc,
    });
  }

  // dark / light mode 

  handleTheme() {
    const html = document.querySelector("html");
    var theme = "";
    if (this.state.isDark === true && this.state.focused !== true) {
      theme = "dark";
    }
    else if (this.state.isDark === true && this.state.focused === true) {
      theme = "dark-focus";
    }
    else if (this.state.isDark === false && this.state.focused !== true) {
      theme = "light";
    }
    else if (this.state.isDark === false && this.state.focused === true) {
      theme = "light-focus";
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

  toggleTheme() {
    this.setState(
      {
        isDark: !this.state.isDark,
      },
      () => {
        this.handleTheme();
      }
    );
  }

  handleFocus() {
    const html = document.querySelector("html");
    let theme = "";
    if (this.state.focused && this.state.isDark) {
      theme = "dark-focus";
    } else if (this.state.focused && !this.state.isDark) {
      theme = "light-focus";
    } else {
      theme = this.state.isDark ? "dark" : "light";
    }
    console.log(theme);
    html.setAttribute("data-theme", theme);
  }

  toggleFocus() {
    this.setState(
      {
        focused: !this.state.focused,
      },
      () => {
        this.handleFocus();
      }
    );
  }

  async fetchFiles() {
    const files = await getFilesInDirectory(this.state.notesDirectory);
    this.setState({ fileNames: files });
    const watcher = chokidar.watch(this.state.notesDirectory);
    watcher.on('add', (path) => {
      console.log(path);
      console.log(this.state.fileNames)
      const fileName = path.replace(/^.*[\\/]/, '');
      this.setState((prevState) => ({
        fileNames: Array.from(new Set([...prevState.fileNames, fileName])),
      }));
    });

    watcher.on('unlink', (path) => {
      const fileName = path.replace(/^.*[\\/]/, ''); // remove directory path
      this.setState((prevState) => ({
        fileNames: prevState.fileNames.filter((fileName) => fileName !== fileName),
      }));
    });
  }

  handleClick = async (path) => {
    const fileContent = await fs.promises.readFile(this.state.notesDirectory + "" + path, 'utf-8');
    this.setState({ selectedFile: path, markdownSrc: fileContent });
  };

  componentDidMount() {
    this.getWordCount();
    this.fetchFiles();

    const editor = document.querySelector('.editor-pane');
    const preview = document.querySelector('.view-pane');

    const syncScroll = (event) => {
      const percentage = event.target.scrollTop / (event.target.scrollHeight - event.target.offsetHeight);
      preview.scrollTop = percentage * (preview.scrollHeight - preview.offsetHeight);
    }

    const debouncedSyncScroll = debounce(syncScroll, 10); // debounce the syncScroll function

    const editorPane = document.querySelector('.editor-pane');
    const viewPane = document.querySelector('.view-pane');

    editorPane.onscroll = debouncedSyncScroll; // use the onscroll attribute instead of addEventListener
    viewPane.onscroll = debouncedSyncScroll;

    const cleanup = () => {
      editorPane.onscroll = null; // remove the event listeners
      viewPane.onscroll = null;
    }

    this.setState({ cleanup: cleanup });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.markdownSrc);
    console.log(prevState.markdownSrc);
    if (this.state.markdownSrc !== prevState.markdownSrc) {
      console.log("remaking TOC")
      this.updateToc();
    }
  }

  componentWillUnmount() {
    if (this.state.cleanup) {
      this.state.cleanup();
    }
  }

  render() {

    const commands = [{
      name: "Set Theme: Dark",
      command: () => {
        this.setDark(true);
      },
    }, {
      name: "Set Theme: Light",
      command: () => {
        this.setDark(false);
      }
    },
    {
      name: "Layout: Vertical",
      command: () => {
        this.changeLayout("vertical");
      }
    },
    {
      name: "Layout: Horizontal",
      command: () => {
        this.changeLayout("horizontal");
      }
    },
    {
      name: "File: Export as PDF",
      command() { }
    },
    {
      name: "File: Export as LaTeX",
      command() { }
    },
    {
      name: "File: Print",
      command() { }
    },
    ];

    const openPalette = [11, 12, 13, 14];

    return (
      <div className="App">

        <CommandPalette
          commands={commands}
          style={{
            zIndex: "999",
          }}
          trigger={null}
          hotKeys={['ctrl+k']}
          closeOnSelect={true}
          alwaysRenderCommands={true}
          resetInputOnOpen={true}
        ></CommandPalette>

        <TemplateModal show={this.state.modalOpen} onHide={() => this.setState({ modalOpen: false })} />

        <div className='container'>

          {/* navbar */}

          <div className="navHorizontal">

            <div className="menuBar">
              <div className="menuIcon"
                onClick={this.handleToc}>
                <img src={tcontents} className="icon" draggable={false} />
                <span className="tooltip">Outline</span>
              </div>
              <div className="menuIcon" onClick={() => this.setState({ modalOpen: true })}>
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
                  onClick={this.toggleFocus}>
                  {this.state.focused ? (
                    <img src={focusFilled} className="icon" id="focus" draggable={false} />
                  ) : (
                    <img src={focus} className="icon" id="focus" draggable={false} />
                  )}
                </div>
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
                    <button
                      key={index}
                      className="fileElem"
                      onClick={() => this.handleClick(file)}>{file.replace(/^.*[\\/]/, '')}</button>
                  ))}
                </div>
                {/* <p className='tocTitle'>Tabs</p>
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
                </div> */}
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
                    this.state.tocHeaders.map((header, index) => (
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
              height: "100%",
              bottom: "0",
              width: this.state.tocOpen === true ? "calc(100% - 270px)" : "100%",
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
                vertical={this.state.orientation}
                key={this.state.orientation}
              >
                <div className="editor-pane" allotment="editor">
                  <Editor
                    className="editor"
                    value={this.state.markdownSrc}
                    onChange={this.onMarkdownChange}
                    onPaste={(editor, e) => this.handlePaste(editor, e)}
                  />
                </div>
                <div className="view-pane" allotment="preview">
                  <div className="preview" id="text">
                    <ReactMarkdown
                      className="result"
                      children={this.state.markdownSrc}
                      remarkPlugins={[remarkMath, remarkGfm, emoji, wikiLinkPlugin]}
                      rehypePlugins={[rehypeMathjax]}
                      escapeHtml={false}
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