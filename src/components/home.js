/**
 * @author wou
 */
import React, { useEffect, useState } from 'react';
// import Editor from './legacyEditor.js';
import fs from 'fs';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import CommandPalette from 'react-command-palette';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import sampleHeader from '../command-palette/commandPaletteHeader.js';
import DateTime from '../components/dateTime.js';
import { CLOSE, CREATE, DAILY, FILE, OPEN, SET_THEME, TOGGLE } from '../constants.ts';
import { setSelectedImage } from '../imageSlice';
import CreateTopicModal from '../modal/topic/CreateTopicModal.js';
import TopicSettingModal from '../modal/topic/TopicSettingsModal.js';
import DashboardDocumentItem from './dashboardDocumentItem.js';
import TopicGridItem from './topic/topicGridItem.js';


import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../command-palette/commandPalette.css';

import createTopic from '../icons/plus1.png';

const Home = () => {
  const [dockOpen, setDockOpen] = useState(true);
  const [fileNames, setFileNames] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notesDirectory, setNotesDirectory] = useState("/home/wou/Documents/instyllnotes/");
  const [topicSettingsModalOpen, setTopicSettingsModalOpen] = useState(false);
  const [createTopicModalOpen, setCreateTopicModalOpen] = useState(false);

  const dispatch = useDispatch();

  // get topics from redux
  const tags = useSelector((state) => state.tags.tags);

  // get recent bookmarks to show 
  const bookmarkDisplay = useSelector((state) => state.bookmarks.bookmarks);

  const recentNoteDisplay = useSelector((state) => state.documents.documents);

  // generates 3 random notes
  const randomNoteDisplay = useSelector((state) => {
    const documents = state.documents.documents;
    const len = documents.length;
    var ind1 = Math.floor(Math.random() * len);
    var ind2 = Math.floor(Math.random() * len);
    var ind3 = Math.floor(Math.random() * len);
    const doc1 = documents[ind1];
    const doc2 = documents[ind2];
    const doc3 = documents[ind3];
    return [doc1, doc2, doc3];
  });

  const handleClick = async (path) => {
    const fileContent = await fs.promises.readFile(notesDirectory + "" + path, 'utf-8');
    setSelectedFile(path);
    // setMarkdownSrc(fileContent);
  };

  const handleTopicSettingsModalOpen = (value) => {
    setTopicSettingsModalOpen(value);
  }

  const handleCreateTopicModalOpen = (value) => {
    setCreateTopicModalOpen(value);
  }

  /* append selected image to dashboard background */
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl = e.target.result;
      dispatch(setSelectedImage(imageUrl));
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.background = `var(--background-dim), url(${imageUrl})`;
    };

    reader.readAsDataURL(file);
  };

  /* handle dialogue for selecting image */
  const handleBackgroundChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageUpload;
    input.click();
  };

  const location = useLocation();

  useEffect(() => {
    // Clean up the background image when navigating away from the component
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.background = '';
    };
  }, [location]);

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

      <TopicSettingModal
        show={topicSettingsModalOpen}
        onHide={() => setTopicSettingsModalOpen(false)}
      />

      <CreateTopicModal
        show={createTopicModalOpen}
        onHide={() => setCreateTopicModalOpen(false)}
      />

      <div className='homeContainer'>

        <div className="dashboardView">
          <div className="dashboardWrapper" style={{
            width: "100%",
          }}>
            <div className='dashboardGreetingContainer'>

              <div className='topicTitleWrapper'>
                <h1 className='heroTitle'>
                  Dashboard
                </h1>
                <DateTime></DateTime>
              </div>

              <div className='dashboardSuggestionContainer'>

                <div className='dashboardSuggestionItem'>

                  <div className='dashboardSuggestionTitleWrapper'>
                    <div className='dashboardSuggestionItemTitle'>
                      Recents
                    </div>
                    <Link to="/documents">
                      <div className='dashboardSuggestionItemMore'>
                        See all
                      </div>
                    </Link>

                    <div className='dashboardSuggestionItemList'>

                    {recentNoteDisplay && recentNoteDisplay.map((recentNote) => (
                          <DashboardDocumentItem document={recentNote}></DashboardDocumentItem>
                      ))
                    }

                    </div>

                  </div>

                </div>

                <div className='dashboardSuggestionItem'>

                  <div className='dashboardSuggestionTitleWrapper'>
                    <div className='dashboardSuggestionItemTitle'>
                      Bookmarks
                    </div>
                    <Link to="/bookmark">
                    <div className='dashboardSuggestionItemMore'>
                      See all
                    </div>
                    </Link>

                    <div className='dashboardSuggestionItemList'>
                    {bookmarkDisplay && bookmarkDisplay.map((bookmark) => (
                          <DashboardDocumentItem document={bookmark}></DashboardDocumentItem>
                      ))
                    }
                    </div>

                  </div>

                </div>

                <div className='dashboardSuggestionItem'>

                  <div className='dashboardSuggestionTitleWrapper'>
                    <div className='dashboardSuggestionItemTitle'>
                      Created by me
                    </div>
                    <Link to="/documents">
                      <div className='dashboardSuggestionItemMore'>
                        See all
                      </div>
                    </Link>

                    <div className='dashboardSuggestionItemList'>

                    {randomNoteDisplay && randomNoteDisplay.map((randomNote) => (
                         <DashboardDocumentItem document={randomNote}></DashboardDocumentItem>
                      ))
                    }

                    </div>

                  </div>

                </div>

              </div>

              <div className='topicTitleWrapper'>
                <h2 className='secondaryTitle'>
                  Topics <span className='topicCount'>{tags.length}</span>
                </h2>
              </div>
              <div className='dashboardTopicsContainer'>
                {tags.map((tag) => (
                  <TopicGridItem tag={tag}>
                  </TopicGridItem>
                ))}

                <div
                  className='createNewTopicContainer'
                  onClick={setCreateTopicModalOpen}
                >
                  <div className='topicIconContainer'>
                    <div className='topicIconWrapper'>
                      <span>
                        <img src={createTopic} className='buttonIcon'>
                        </img>
                      </span>
                    </div>
                  </div>
                </div>
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
