import React, { Component } from 'react';
// import Editor from './legacyEditor.js';
import { MilkdownEditorWrapper } from '../mdWrapper.js';
import '../App.css';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css'
import "allotment/dist/style.css";
import getFilesInDirectory from '../fileUtils';
import chokidar from 'chokidar'
import fs from 'fs';
import CommandPalette from 'react-command-palette';
import sampleHeader from '../command-palette/commandPaletteHeader.js';
import { FILE, SET_THEME, OPEN, CLOSE, TOGGLE, CREATE, DAILY } from '../constants.ts';
import DateTime from '../components/dateTime.js';
import { QUOTE1, QUOTE2, QUOTE3, QUOTE4 } from '../quotes.ts';
import DailyQuote from '../components/dailyQuote.js';

import '../command-palette/commandPalette.css';
import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-nord.css';


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

    this.fetchFiles = this.fetchFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setModalOpen = this.setModalOpen.bind(this);
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
    this.fetchFiles();
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

          <div className='container'>

            <div className="dashboardView">
              <div className="dashboardWrapper" style={{
                width: "100%",
              }}>
            <div className="dashboardGreetingContainer">
              <div className="heroGreetingWrapper">
              <div className="greetingDateContainer">
                <DateTime></DateTime>
              </div>
              <h1 className="heroGreeting">
                Welcome Back, Wesley
              </h1>
              <DailyQuote></DailyQuote>
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