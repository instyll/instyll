/**
 * @author wou
 */
import React, { useEffect, useState, useRef } from 'react';
// import Editor from './legacyEditor.js';
import fs from 'fs';
import path from 'path';
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
import { removeDocument } from '../documentSlice.js';

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../command-palette/commandPalette.css';

import createTopic from '../icons/plus1.png';
import { removeBookmark } from '../bookmarkSlice.js';

const Home = () => {
  const [dockOpen, setDockOpen] = useState(true);
  const [fileNames, setFileNames] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notesDirectory, setNotesDirectory] = useState("/home/wou/Documents/instyllnotes/");
  const [topicSettingsModalOpen, setTopicSettingsModalOpen] = useState(false);
  const [createTopicModalOpen, setCreateTopicModalOpen] = useState(false);
  const [displayRecentNotes, setDisplayRecentNotes] = useState([]);
  const [displayRandomNotes, setDisplayRandomNotes] = useState([]);

  const dispatch = useDispatch();
  const documents = useSelector((state) => state.documents.documents);
  const bookmarkDisplay = useSelector((state) => state.bookmarks.bookmarks);

  const documentsRef = useRef(null);

  useEffect(() => {
      documentsRef.current = documents;
  }, [documents]);

  useEffect(() => {
    // clean deleted notes from redux
    for (const documentObject of documents) {
      const documentObjPath = documentObject[3];
      fs.access(documentObjPath, fs.constants.F_OK, (err) => {
        if (err) {
          dispatch(removeDocument([documentObjPath]));
          for (let i = 0; i < bookmarkDisplay.length; ++i) {
            const same = path.relative(bookmarkDisplay[i][3], documentObjPath);
            if (same.length == 0) {
              dispatch(removeBookmark([documentObjPath]));
            }
          }
        }
      })
    }
    // setDisplayRecentNotes(documentsRef.current)
    // console.log(displayRecentNotes)
  }, [])

  // get topics from redux
  const tags = useSelector((state) => state.tags.tags);

  useEffect(() => {
    const sortedNotes = [...documentsRef.current].sort((a, b) => {
      let timeA = 0;
      let timeB = 0;
  
      if (fs.existsSync(a[3])) {
        timeA = fs.statSync(a[3]).birthTime;
      }
  
      if (fs.existsSync(b[3])) {
        timeB = fs.statSync(b[3]).birthTime;
      }
  
      return timeA - timeB;
    })
    setDisplayRecentNotes(sortedNotes);
  }, [])

  // generates 3 random notes
  useEffect(() => {
    const documents = documentsRef.current;
    const len = documentsRef.current.length;
    // if only 3, 2, 1 notes ƒdocumereturn
    if (len == 3) {
      setDisplayRandomNotes([documents[0], documents[1], documents[2]])
    } else if (len == 2) {
      setDisplayRandomNotes([documents[0], documents[1]])
    } else if (len == 1) {
      setDisplayRandomNotes([documents[0]])
    }
    const shuffled = [...documents].sort(() => (0.5 - Math.random()));
    const doc1 = shuffled[0];
    const doc2 = shuffled[1];
    const doc3 = shuffled[2];
    setDisplayRandomNotes([doc1, doc2, doc3]);
  }, []);

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

  const location = useLocation();

  return (
    <div className="EditorView">

      {/* <Router> */}

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

                    {displayRecentNotes && displayRecentNotes.map((recentNote) => (
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

                    {displayRandomNotes && displayRandomNotes.map((randomNote) => (
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
