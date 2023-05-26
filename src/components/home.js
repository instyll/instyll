import React, { Component } from 'react';
// import Editor from './legacyEditor.js';
import { MilkdownEditorWrapper } from '../mdWrapper.js';
import '../App.css';
import "highlight.js/styles/github.css";
import Sizzle from 'sizzle'
import 'katex/dist/katex.min.css'
import { Allotment } from "allotment";
import TemplateModal from "../modal/TemplateModal";
import "allotment/dist/style.css";
import getFilesInDirectory from '../fileUtils';
import chokidar from 'chokidar'
import fs from 'fs';
import debounce from 'lodash/debounce';
import CommandPalette from 'react-command-palette';
import MenuBar from '../components/menuBar';
import TableOfContents from '../components/toc.js';
import sampleHeader from '../command-palette/commandPaletteHeader.js';
// import moment from 'moment';
import { FILE, SET_THEME, OPEN, CLOSE, TOGGLE, CREATE, DAILY } from '../constants.ts';
import TopicModal from '../modal/TopicModal.js';
import OutlineContainer from '../components/OutlineContainer.js';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DateTime from '../components/dateTime.js';

import '../command-palette/commandPalette.css';
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
import moreDots from '../icons/more.png';
import exportIcon from '../icons/export.png';
import star from '../icons/star.png';
import add from '../icons/add_component2.png';
import back from '../icons/arrowback.png';
import stats from '../icons/stats.png';
import doc from '../icons/document.png';
import outline from '../icons/outline.png';
import reference from '../icons/reference.png';
import edit from '../icons/edit.png';
import doubleRight from '../icons/doubleright.png'
import deleteX from '../icons/delete.png';
import { initial } from 'lodash';

class Home extends Component {
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
      isScrolled: false,
    }

    this.handleToc = this.handleToc.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.fetchFiles = this.fetchFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateToc = this.updateToc.bind(this);
    this.setModalOpen = this.setModalOpen.bind(this);
  }



  // Sidebar toggle

  handleToc() {
    this.setState({
      tocOpen: this.state.tocOpen === true ? false : true
    })
    console.log(this.state.tocOpen);
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
        this.setState({
          rightPanelOpen: false,
        })
      }
    },
    {
      name: TOGGLE + "Right Panel",
      category: "Command",
      command: () => {
        this.setState({
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
      <div className="EditorView">

        {/* <Router> */}

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
              isDark={this.state.isDark}
            />

            <div className="dashboardView">
              <div className="dashboardWrapper" style={{
                marginLeft: this.state.tocOpen ? "268px" : "153px",
                width: this.state.tocOpen ? "calc((100% - 280px) - 16px)" : "calc((100% - 165px) - 16px)",
              }}>
            <div className="dashboardGreetingContainer">
              <div className="heroGreetingWrapper">
              <div className="greetingDateContainer">
                {/* <span className="greetingDate">May 25, 2023</span>
                <span className="greetingTime">9:32 AM</span> */}
                <DateTime></DateTime>
              </div>
              <h1 className="heroGreeting">
                Welcome Back
              </h1>
              </div>
            </div>
                            
            </div>
            </div>

          </div>

        {/* </Router> */}

      </div>
    );
  }
}


export default Home;