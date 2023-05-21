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
import TemplateModal from "./modal/TemplateModal";
import "allotment/dist/style.css";
import getFilesInDirectory from './fileUtils';
import chokidar from 'chokidar'
import fs from 'fs';
import debounce from 'lodash/debounce';
import CommandPalette from 'react-command-palette';
import MenuBar from './components/menuBar';
import TableOfContents from './components/toc.js';
import Calendar from 'react-calendar';
import sampleHeader from './command-palette/commandPaletteHeader.js';
// import moment from 'moment';
import { FILE, SET_THEME, OPEN, CLOSE, TOGGLE, CREATE, DAILY } from './constants.ts';
import TopicModal from './modal/TopicModal.js';
import OutlineContainer from './components/OutlineContainer.js';

import './command-palette/commandPalette.css';
import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-nord.css';

// Plugins
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkGfm from 'remark-gfm'
import emoji from 'remark-emoji'
import wikiLinkPlugin from 'remark-wiki-link'
import { chrome } from 'process';
import { timeStamp } from 'console';

// Assets
import moreDots from './icons/more.png';
import exportIcon from './icons/export.png';
import star from './icons/star.png';
import add from './icons/add_component2.png';
import back from './icons/arrowback.png';
import stats from './icons/stats.png';
import doc from './icons/document.png';
import outline from './icons/outline.png';
import reference from './icons/reference.png';
import edit from './icons/edit.png';
import doubleRight from './icons/doubleright.png'

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
      dockOpen: true,
      isDark: true,
      fileNames: [],
      selectedFile: null,
      notesDirectory: "/home/wou/Documents/instyllnotes/",
      tocHeaders: [],
      cleanup: null,
      orientation: false,
      focused: false,
      modalOpen: false,
      topicModalOpen: false,
      selectedTags: [],
      addedTags: [],
      rightPanelOpen: false,
      rightPanelSetting: "",
    }

    this.onMarkdownChange = this.onMarkdownChange.bind(this);
    this.slideToRight = this.slideToRight.bind(this);
    this.handleToc = this.handleToc.bind(this);
    this.handleDock = this.handleDock.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.fetchFiles = this.fetchFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateToc = this.updateToc.bind(this);
    this.changeLayout = this.changeLayout.bind(this);
    this.setModalOpen = this.setModalOpen.bind(this);
    this.setTopicModalOpen = this.setTopicModalOpen.bind(this);
    this.handleTagsSelection = this.handleTagsSelection.bind(this);
    this.handleAddTags = this.handleAddTags.bind(this);
    this.handleRemoveTags = this.handleRemoveTags.bind(this);
    this.handleRightPanel = this.handleRightPanel.bind(this);
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
    console.log(this.state.tocOpen);
  }

  handleDock() {
    this.setState({
      dockOpen: this.state.dockOpen === true ? false : true
    })
  }

  handleRightPanel(setting) {
    this.setState((prevState) => ({
      rightPanelOpen:
        prevState.rightPanelOpen && prevState.rightPanelSetting === setting ? false : true,
      rightPanelSetting: setting,
    }));
    console.log(this.state.rightPanelOpen);
  }

  // Get headers for sidebar outline

  constructToc() {
    let headers = Sizzle("h1, h2, h3, h4, h5, h6");
    let toc = [];
    // headers.forEach(header => {
    //   let id = header.id;
    //   toc.push({ text: header.innerText, id: id, type: header.tagName });
    // });
    headers.forEach((header) => {
      const id = header.id;
      let text = "";
      const headerText = header.childNodes;
      headerText.forEach((child) => {
        if (child.nodeName === "SPAN" && child.dataset.type === "emoji") {
          const img = child.querySelector("img");
          text += img.alt;
        } else {
          text += child.textContent;
        }
      });
      toc.push({ text, id, type: header.tagName });
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

    if (this.state.isDark === false) {
      theme = "dark";
    }
    else {
      theme = "light";
    }

    console.log(theme);
    html.setAttribute("data-theme", theme);
  }

  toggleTheme(isChecked) {
    this.setState(
      {
        isDark: !isChecked,
      },
      () => {
        this.handleTheme();
      }
    );
  }

  setModalOpen(value) {
    this.setState({
      modalOpen: value
    });
  }

  setTopicModalOpen(value) {
    this.setState({
      topicModalOpen: value
    });
    console.log(this.state.topicModalOpen);
  }

  /* handle tags */

  handleTagsSelection = (selectedTags) => {
    this.setState({ selectedTags });
  };

  handleAddTags = () => {
    console.log('Selected Tags:', this.state.selectedTags);
    this.setState((prevState) => ({
      addedTags: [...prevState.addedTags, ...prevState.selectedTags],
      selectedTags: [],
    }));
  };

  handleRemoveTags = (tag) => {
    console.log(tag);
    this.setState((prevState) => ({
      addedTags: prevState.addedTags.filter((t) => t !== tag),
    }));
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


  sampleChromeCommand(suggestion) {
    const { name, highlight, category, shortcut } = suggestion;
    return (
      <div className="">
        <span className={`my-category ${category}`}>{category}</span>

        <span>{name}</span>

        {/* <kbd className="my-shortcut">{shortcut}</kbd> */}
      </div>
    );
  }

  render() {

    const theme = {
      modal: "my-modal",
      overlay: "my-overlay",
      container: "my-container",
      header: "my-header",
      content: "my-content",
      input: "my-input",
      suggestionsList: "my-suggestionsList",
      suggestion: "my-suggestion",
      suggestionHighlighted: "my-suggestionHighlighted",
      suggestionsContainerOpen: "my-suggestionsContainerOpen",
    }

    const commands = [{
      name: SET_THEME + "Dark",
      category: "Command",
      command: () => {
        // this.setDark(true);
        const html = document.querySelector("html");
        html.setAttribute("data-theme", "dark");

      },
    }, {
      name: SET_THEME + "Light",
      category: "Command",
      command: () => {

        const html = document.querySelector("html");
        html.setAttribute("data-theme", "light");

      }
    },
    {
      name: DAILY + "Open Daily Note",
      category: "Command",
      command() { }
    },
    {
      name: OPEN + "Settings",
      category: "Navigate",
      command: () => {
        // this.changeLayout("vertical");
      }
    },
    {
      name: CLOSE + "Current File",
      category: "Navigate",
      command: () => {
        // this.changeLayout("horizontal");
      }
    },
    {
      name: FILE + "Export as PDF",
      category: "Action",
      command() { }
    },
    {
      name: FILE + "Export as LaTeX",
      category: "Action",
      command() { }
    },
    {
      name: FILE + "Export as Docx",
      category: "Action",
      command() { }
    },
    {
      name: FILE + "Export to Google Drive",
      category: "Action",
      command() { }
    },
    {
      name: FILE + "Export to Notion",
      category: "Action",
      command: () => {
        this.handleToc();
      }
    },
    {
      name: FILE + "Print",
      category: "Action",
      shortcut: "Ctrl + P",
      command() { }
    },
    {
      name: FILE + "Star",
      category: "Action",
      command() { }
    },
    {
      name: TOGGLE + "Left Sidebar",
      category: "Command",
      command: () => {

        this.setState({
          tocOpen: this.state.tocOpen === true ? false : true
        });

      }
    },
    {
      name: TOGGLE + "Dock",
      category: "Command",
      command: () => {
        this.handleDock();
        this.setState ({
          rightPanelOpen: false,
        })
      }
    },
    {
      name: TOGGLE + "Right Panel",
      category: "Command",
      command: () => {
        this.setState ({
          rightPanelOpen: this.state.rightPanelOpen ? false : true,
        })
      }
    },
    {
      name: CREATE + "New Note",
      category: "Action",
      command() { }
    },
    {
      name: CREATE + "New Note From Template",
      category: "Action",
      command() { }
    },
    ];

    return (
      <div className="App">

        <CommandPalette
          commands={commands}
          style={{
            zIndex: "999",
          }}
          trigger={null}
          hotKeys={['ctrl+k', 'command+k']}
          closeOnSelect={true}
          alwaysRenderCommands={true}
          renderCommand={this.sampleChromeCommand}
          resetInputOnOpen={true}
          theme={theme}
          header={sampleHeader()}
          maxDisplayed={500}
        ></CommandPalette>

        <TemplateModal
          show={this.state.modalOpen}
          onHide={() => this.setState({ modalOpen: false })} />
        <TopicModal
          show={this.state.topicModalOpen}
          onHide={() => this.setState({ topicModalOpen: false })}
          tocOpen={this.state.tocOpen}
          selectedTags={this.state.selectedTags}
          onSelectTags={this.handleTagsSelection}
          onAddTags={this.handleAddTags} />

        <div className='container'>

          {/* navbar */}

          <div className="navHorizontal"
            style={{
              width: this.state.tocOpen ? "calc(100% - 240px)" : "calc(100% - 125px)",
              transition: "width 0.2s",
            }}>
            <MenuBar
              handleToc={this.handleToc}
              setModalOpen={this.setModalOpen}
              toggleFocus={this.toggleFocus}
              toggleTheme={this.toggleTheme}
              focused={this.state.focused}
            />
          </div>

          <TableOfContents
            fileNames={this.state.fileNames}
            handleClick={this.handleClick}
            charCount={this.state.charCount}
            wordCount={this.state.wordCount}
            tocHeaders={this.state.tocHeaders}
            handleTheme={this.toggleTheme}
            handleToc={this.handleToc}
            tocOpen={this.state.tocOpen}
            toggleTheme={this.toggleTheme}
          />


          <div className="editingView">
            <div className="elevatedLeft"
              style={{
                width: this.state.tocOpen && this.state.rightPanelOpen
                  ? "calc((100% - 280px) - 376px)"
                  : !this.state.tocOpen && this.state.rightPanelOpen
                    ? "calc((100% - 165px) - 376px)"
                    : this.state.tocOpen && !this.state.rightPanelOpen
                      ? "calc((100% - 280px) - 116px)"
                      : "calc((100% - 165px) - 116px)",
                marginLeft: this.state.tocOpen ? "268px" : "153px",
              }}>
              <div className="elevated">
                <div className="optionsContainer">
                  <div className="leftComponents" >
                    <img

                      className="back" src={back} draggable={false}></img>
                    <div className="optionObject">
                      <button className="addTopicButton" onClick={() => this.setTopicModalOpen(true)}>

                        <img src={add} class="buttonIcon" draggable={false}></img>

                        <span className="buttonText">Add topic</span></button>
                      {this.state.addedTags.map((tag) => (
                        <span
                          key={tag}
                          className="tagItem"
                          onClick={
                            () => this.handleRemoveTags(tag)}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='rightComponents'>
                    {/* <img className="star" src={star} draggable={false}></img>
                  <div className="optionObject">
                    <button className="exportButton">

                      <img src={exportIcon} class="buttonIcon"></img>

                      <span className="buttonText">Export</span></button>
                  </div>
                  <div className="optionObject">
                    <div className="moreDots">
                      <img className="optionsBarIcon" src={moreDots} draggable={false}></img>
                    </div>
                  </div> */}
                  </div>
                </div>

                <div style={{
                  position: "relative",
                  height: "calc(100% - 55px)",
                  bottom: "0",
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

            <div className="elevatedRightPanel" style={{
              width: this.state.rightPanelOpen ? "240px" : "0px",
              marginLeft: this.state.rightPanelOpen ? "28px" : "0px",
            }}>

              {this.state.rightPanelSetting === "outline" && (
                <OutlineContainer
                  tocHeaders={this.state.tocHeaders}
                  rightPanelOpen={this.state.rightPanelOpen}
                />
              )}

            </div>

            <div className="elevatedRight" style={{
              backgroundColor: this.state.dockOpen ? "var(--elevated-bg)" : "transparent",
              marginLeft: this.state.rightPanelOpen ? "20px" : "28px",
            }}>

              <div className="elevatedRightInner">
                <div>
                  {this.state.dockOpen && (
                    <img
                      src={stats}
                      className={`tocIconRightFirst ${this.state.rightPanelSetting === "stats" && this.state.rightPanelOpen ? "selected" : ""}`}
                      draggable={false}
                      onClick={() => this.handleRightPanel("stats")}
                    ></img>
                  )}
                </div>
                <div>
                  {this.state.dockOpen && (
                    <img
                      src={outline}
                      className={`tocIconRight ${this.state.rightPanelSetting === "outline" && this.state.rightPanelOpen ? "selected" : ""}`}
                      draggable={false}
                      onClick={() => this.handleRightPanel("outline")}
                    ></img>
                  )}
                </div>
                <div>
                  {this.state.dockOpen && (
                    <img
                      src={doc}
                      className={`tocIconRight ${this.state.rightPanelSetting === "info" && this.state.rightPanelOpen ? "selected" : ""}`}
                      draggable={false}
                      onClick={() => this.handleRightPanel("info")}
                    ></img>
                  )}
                </div>
                <div>
                  {this.state.dockOpen && (
                    <img
                      src={edit}
                      className={`tocIconRight ${this.state.rightPanelSetting === "style"  && this.state.rightPanelOpen ? "selected" : ""}`}
                      draggable={false}
                      onClick={() => this.handleRightPanel("style")}
                    ></img>
                  )}
                </div>
                <div>
                  {this.state.dockOpen && (
                    <img
                      src={reference}
                      className={`tocIconRight ${this.state.rightPanelSetting === "pane" && this.state.rightPanelOpen ? "selected" : ""}`}
                      draggable={false}
                      onClick={() => this.handleRightPanel("pane")}
                    ></img>
                  )}
                </div>
                <div className="bottomToc" style={{
                  borderTop: this.state.dockOpen ? "1px solid var(--muted-text)" : "none",
                }}>
                  <img src={doubleRight} className="tocIconRightLast" id="closeDock" draggable={false}
                    onClick={this.handleDock} style={{
                      transform: this.state.dockOpen ? "none" : "rotate(180deg)",
                      transition: "transform 0.3s",
                    }}></img>
                </div>
              </div>


              {/* <div className="elevatedRightTopTop">

              <div className="statsContainer">
                <p className='paneTitle'>Stats</p>
                <div className="pageInfo">
                  <span className="leftStatComponents">
                    <div className="infoDisplay"><div className="label">Words</div></div>
                    <div className="infoDisplay"><div className="label">Characters</div></div>
                  </span>
                  <span className="rightStatComponents">
                    <div className="infoDisplay"><span className="precount"></span>300</div>
                    <div className="infoDisplay"><span className="precount"></span>800</div>
                  </span>
                </div>
              </div>
            </div> */}

              {/* <div className="elevatedRightTopBottom">

              <div className='outlineContainer'>
                <p className='paneTitle'>Outline</p>
                <div>
                  {
                    this.state.tocHeaders.map((header, index) => (
                      <div key={index} className="outlineElement"
                        style={{
                          paddingLeft: header.type === 'H2' ? '20px' :
                            header.type === 'H3' ? '40px' :
                              header.type === 'H4' ? '60px' :
                                header.type === 'H5' ? '80px' :
                                  header.type === 'H6' ? '100px' : '5px',
                        }}>
                        <a href={`#${header.id}`} className="headerNav">
                          {header.text}
                        </a>
                      </div>
                    ))}
                </div>
              </div>

            </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;