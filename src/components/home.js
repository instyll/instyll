import React, { useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';

import '../command-palette/commandPalette.css';
import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-nord.css';

const Home = () => {
  const [dockOpen, setDockOpen] = useState(true);
  const [fileNames, setFileNames] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notesDirectory, setNotesDirectory] = useState("/home/wou/Documents/instyllnotes/");
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const tags = useSelector((state) => state.tags.tags);

  const fetchFiles = async () => {
    const files = await getFilesInDirectory(notesDirectory);
    setFileNames(files);
    const watcher = chokidar.watch(notesDirectory);
    watcher.on('add', (path) => {
      console.log(path);
      console.log(fileNames)
      const fileName = path.replace(/^.*[\\/]/, '');
      setFileNames(prevFileNames => Array.from(new Set([...prevFileNames, fileName])));
    });

    watcher.on('unlink', (path) => {
      const fileName = path.replace(/^.*[\\/]/, ''); // remove directory path
      setFileNames(prevFileNames => prevFileNames.filter(name => name !== fileName));
    });
  }

  const handleClick = async (path) => {
    const fileContent = await fs.promises.readFile(notesDirectory + "" + path, 'utf-8');
    setSelectedFile(path);
    // setMarkdownSrc(fileContent);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const sampleChromeCommand = (suggestion) => {
    const { name, highlight, category, shortcut } = suggestion;
    return (
      <div className="">
        <span className={`my-category ${category}`}>{category}</span>
        <span>{name}</span>
        {/* <kbd className="my-shortcut">{shortcut}</kbd> */}
      </div>
    );
  }

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
      // this.handleToc();
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
      // this.setState({
      //   tocOpen: this.state.tocOpen === true ? false : true
      // });
    }
  },
  {
    name: TOGGLE + "Dock",
    category: "Command",
    command: () => {
      // this.handleDock();
      // this.setState({
      //   rightPanelOpen: false,
      // })
    }
  },
  {
    name: TOGGLE + "Right Panel",
    category: "Command",
    command: () => {
      // this.setState({
      //   rightPanelOpen: this.state.rightPanelOpen ? false : true,
      // })
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
        renderCommand={sampleChromeCommand}
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
              <div className='dashboardTopicsContainer'>
            {tags.map((tag) => (
                    <li
                        key={tag}
                    >
                        {tag}
                    </li>
                ))}
            </div>
            </div>

          </div>
        </div>

      </div>

      {/* </Router> */}

    </div>
  );
}

export default Home;
