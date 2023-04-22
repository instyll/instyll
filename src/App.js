import React, { Component } from 'react';
// import Editor from './legacyEditor.js';
import { MilkdownEditorWrapper } from './mdWrapper.js';
import ReactMarkdown from 'react-markdown';
import './App.css';
import "highlight.js/styles/github.css";
import Sizzle from 'sizzle'
import { v4 as uuid } from 'uuid';
import 'katex/dist/katex.min.css'
import { Allotment } from "allotment";
import TemplateModal from "./TemplateModal";
import "allotment/dist/style.css";
import getFilesInDirectory from './fileUtils';
import chokidar from 'chokidar'
import fs from 'fs';
import debounce from 'lodash/debounce';
import CommandPalette from 'react-command-palette';
import MenuBar from './menuBar';
import TableOfContents from './toc.js';
import Calendar from 'react-calendar';
// import moment from 'moment';
import { FILE, SET_THEME, LAYOUT } from './constants.ts';

import cpTheme from './commandPalette';
import './commandPalette.css';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-ghcolors.css'

// Plugins
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import emoji from 'remark-emoji'
import wikiLinkPlugin from 'remark-wiki-link'
import { chrome } from 'process';
import { timeStamp } from 'console';
import { Menu } from 'electron';

// Assets
import moreDots from './icons/more.png';
import exportIcon from './icons/export.png';
import star from './icons/star.png';
import add from './icons/add_component.png';
import back from './icons/back.png';

// const localizer = momentLocalizer(moment)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownSrc: "# Welcome to instyll",
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
    this.setModalOpen = this.setModalOpen.bind(this);
  }

  // Update view pane on each edit

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md,
    }, () => {
      this.getWordCount();
    });
    // console.log(document.getElementById("root"));
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
      let id = header.id;
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

  setModalOpen(value) {
    this.setState({
      modalOpen: value
    });
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
    window.addEventListener("message", this.handleMessage);
    this.getWordCount();
    this.fetchFiles();
  }

  componentDidUpdate(prevProps, prevState) {

    // this.updateToc();

  }

  componentWillUnmount() {
    window.removeEventListener("message", this.handleMessage);
  }

  handleMessage = (event) => {
    if (event.data.type === "updateToc") {
      this.updateToc();
    }
  }

  render() {

    const commands = [{
      name: SET_THEME + "Dark",
      command: () => {
        this.setDark(true);
      },
    }, {
      name: SET_THEME + "Light",
      command: () => {
        this.setDark(false);
      }
    },
    {
      name: LAYOUT + "Vertical",
      command: () => {
        this.changeLayout("vertical");
      }
    },
    {
      name: LAYOUT + "Horizontal",
      command: () => {
        this.changeLayout("horizontal");
      }
    },
    {
      name: FILE + "Export as PDF",
      command() { }
    },
    {
      name: FILE + "Export as LaTeX",
      command() { }
    },
    {
      name: FILE + "Print",
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
          theme={cpTheme}
        ></CommandPalette>

        <TemplateModal show={this.state.modalOpen} onHide={() => this.setState({ modalOpen: false })} />

        <div className='container'>

          {/* navbar */}

          <div className="navHorizontal">
            <MenuBar
              handleToc={this.handleToc}
              setModalOpen={this.setModalOpen}
              toggleFocus={this.toggleFocus}
              toggleTheme={this.toggleTheme}
              focused={this.state.focused} />
          </div>

          <TableOfContents
            fileNames={this.state.fileNames}
            handleClick={this.handleClick}
            charCount={this.state.charCount}
            wordCount={this.state.wordCount}
            tocHeaders={this.state.tocHeaders} />


          <div className="editingView">
            <div className="elevatedLeft">
              <div className="elevated">
                <div className="optionsContainer">
                  <div className="leftComponents" onClick={this.handleToc} >
                    <img
                      onClick={this.handleToc}
                      className="back" src={back} draggable={false}></img>
                    <div className="optionObject">
                      <button className="addTopicButton">

                        <img src={add} class="buttonIcon"></img>

                        Add topic</button>
                    </div>
                  </div>
                  <div className='rightComponents'>
                    <img className="star" src={star} draggable={false}></img>
                    <div className="optionObject">
                      <button className="exportButton">

                        <img src={exportIcon} class="buttonIcon"></img>

                        Export</button>
                    </div>
                    <div className="optionObject">
                      <div className="moreDots">
                        <img className="optionsBarIcon" src={moreDots} draggable={false}></img>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  position: "relative",
                  height: "calc(100% - 55px)",
                  bottom: "0",
                  // width: this.state.tocOpen === true ? "calc(100% - 270px)" : "100%",
                  // marginRight: this.state.tocOpen === true ? "0px" : "0px",
                  // marginLeft: this.state.tocOpen === true ? "270px" : "0",
                  borderRadius: "10px",
                  transition: "0.2s",
                  boxSizing: "border-box",
                  overflow: "auto",
                }} id="text">
                  <MilkdownEditorWrapper
                  ></MilkdownEditorWrapper>
                </div>
              </div>
            </div>
            <div className="elevatedRight">
              {/* <div className="calendarContainer">
                <Calendar></Calendar>
              </div> */}
              <div className="elevatedRightTop">

              </div>
              <div className="elevatedRightBottom">

                <div className='outlineContainer'>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;