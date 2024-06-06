/**
 * @author wou
 */
import React, { useEffect, useRef, useState } from 'react';
import CommandPalette from 'react-command-palette';
import { useDispatch, useSelector } from 'react-redux';
import Sizzle from 'sizzle';
import fs from 'fs';
import path from 'path';
import sampleHeader from '../command-palette/commandPaletteHeader.js';
import { addTags, removeTag } from '../documentSlice.js';
// import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { CLOSE, CREATE, DAILY, FILE, OPEN, SET_THEME, TOGGLE } from '../constants.ts';
import TopicModal from '../modal/topic/TopicModal.js';
import OutlineContainer from '../components/dock/OutlineContainer.js';
import PageActionContainer from '../components/dock/PageActionContainer.js';
import StatContainer from '../components/dock/StatContainer.js';
import StyleContainer from '../components/dock/StyleContainer.js';
import PaneContainer from '../components/dock/paneContainer.tsx';
import { Tooltip } from "react-tooltip";
import { getWordCount } from '../actions.js';
import { getCharCount } from '../actions.js';

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../command-palette/commandPalette.css';

// Plugins

import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { MilkdownEditor } from '../mdWrapper.js';



// Assets
import { Plus } from 'lucide-react';
import { X } from 'lucide-react';
import { PanelRight } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import { Info } from 'lucide-react';
import { File } from 'lucide-react';
import { Pen } from 'lucide-react';
import { Columns2 } from 'lucide-react';
import { Sparkles } from 'lucide-react';

// const { ipcRenderer } = require('electron');
// const { getCurrentWebContents } = require('@electron/remote')
// const FindInPage = require('electron-find').FindInPage;

// let findInPage = new FindInPage(getCurrentWebContents());

// ipcRenderer.on('on-find', (e, args) => {
//   findInPage.openFindWindow();
// });

const EditorView = () => {

    const [tocOpen, setTocOpen] = useState(true);
    const [dockOpen, setDockOpen] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [tocHeaders, setTocHeaders] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [topicModalOpen, setTopicModalOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [addedTags, setAddedTags] = useState([]);
    const [rightPanelOpen, setRightPanelOpen] = useState(false);
    const [rightPanelSetting, setRightPanelSetting] = useState("outline");
    const [genAIContainerOpen, setGenAIContainerOpen] = useState(false);

    const {state} = useLocation();
    const location = useLocation();
    console.log("location " + location.pathname + location.hash)
    let { documentPath } = state;
    // console.log("the loaded state " + state)

    const dispatch = useDispatch();

    // remove any % symbol from document path
    let documentPathTemp1 = documentPath;
    documentPathTemp1 = documentPathTemp1.replace(/%/g, " ");
    documentPathTemp1 = documentPathTemp1.replace(/∴/g, "");
    documentPath = documentPathTemp1;

    // read word count of the contents
    const wordCount = getWordCount(documentPath);
    const charCount = getCharCount(documentPath);
    // console.log(wordCount)
    const content = fs.readFileSync(documentPath, 'utf-8');

    const noteTitle = path.basename(documentPath, '.md')

    const existingTags = useSelector((state) => {
        const documents = state.documents.documents;
        const documentIndex = documents.findIndex(doc => doc[3] === documentPath);
        
        if (documentIndex !== -1) {
        //   console.log(documents[documentIndex])  
          const fourthIndex = documents[documentIndex][4];
        //   console.log(documents[documentIndex][1] + " tags: " + fourthIndex)
          return fourthIndex;
        }
        return null; // Adjust the default value based on your needs
      });

    // console.log(documentContent)

    const documentRef = useRef(null);

    const handleDock = () => {
        setDockOpen((prevState) => !prevState)
        setRightPanelOpen(false);
    }

    const handleRightPanel = (setting) => {
        // console.log(state.rightPanelSetting);
        setRightPanelOpen((prevState) => {
            // Toggle rightPanelOpen only if dock is open or if the setting is different
            return dockOpen ? !prevState || rightPanelSetting !== setting : false;
        });
    
        setRightPanelSetting(setting);
    }

    const handleToggleGenAIContainer = () => {
        setGenAIContainerOpen(!genAIContainerOpen)
    }

    // Get headers for sidebar outline

    const constructToc = () => {
        let headers = Sizzle("h1, h2, h3, h4, h5, h6");
        let toc = [];
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

    /* append newly created headers to outline */
    const updateToc = () => {
        var toc = constructToc();
        setTocHeaders(toc)
    }

    /* handle tags */

    const handleTagsSelection = (selectedTags) => {
        setSelectedTags(selectedTags)
    };

    const handleAddTags = () => {
        setAddedTags([])
        const updatedTags = [...addedTags, ...selectedTags];
        setAddedTags(updatedTags);
        // console.log(addedTags)
        const requestObj = [documentPath, selectedTags];
        // console.log(requestObj);s
        dispatch(addTags(requestObj));
        setSelectedTags([]);
        // Add tags to redux document
        // console.log("added tags: " + updatedTags);
    };

    const handleRemoveTags = (tag) => {
        // console.log(tag);
        setAddedTags((prevAddedTags) => prevAddedTags.filter((t) => t !== tag));
        dispatch(removeTag([documentPath, tag]))
    }

    useEffect(() => {
        const handleMessage = (event) => {
          if (event.data.type === "updateToc") {
            updateToc();
          }
        }
    
        // Attach event listener
        window.addEventListener('message', handleMessage);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('message', handleMessage);
        };
      }, []);

    return (
            <div className="EditorView">

                {/* <Router> */}

                <div className='container'>
                    <div className="editingView" style={{width: genAIContainerOpen ? 'calc(100% - 320px)' : '100%'}}>
                    <div className="topicTitleWrapper drag">
                                <h1 className="heroTitle">
                                    {noteTitle}
                                </h1>
                                <div className='genAIInteractionToggleContainer'>
                                    <button className='tocToggleButton' onClick={handleToggleGenAIContainer}>
                                        <div><PanelRight size={20} color='var(--primary-text)' className='tocToggle'/></div>
                                    </button>
                                </div>
                         </div>
                        <div className="elevatedLeft"
                            style={{
                                width: '100%',
                            }}>
                            <div className="elevated">
                                <div className="optionsContainer">
                                    <div className="leftComponents" >
                                        {/* <img

                                            className="back" src={back} draggable={false}></img> */}
                                        <div className="optionObject">

                                            <button

                                                style={{
                                                    display: existingTags && existingTags.length > 0 ? "none" : "initial"
                                                }}

                                                className="addTopicButton" onClick={() => setTopicModalOpen(true)}>

                                                <Plus size={20} className='buttonIcon'/>
                                                <span className="buttonText">Add topic</span></button>


                                            <TopicModal
                                                show={topicModalOpen}
                                                onHide={() => setTopicModalOpen(false)}
                                                tocOpen={tocOpen}
                                                selectedTags={selectedTags}
                                                onSelectTags={handleTagsSelection}
                                                onAddTags={handleAddTags} />

                                            {existingTags && existingTags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="tagItem"
                                                >
                                                    {tag}
                                                    {/* <img src={deleteX}
                                                        className="buttonIconSmall"
                                                        draggable={false}
                                                        onClick={
                                                            () => handleRemoveTags(tag)}
                                                        style={{
                                                            filter: "var(--editorIconFilter)",
                                                        }}></img> */}
                                                        <X size={12} className='buttonIconSmall' onClick={
                                                            () => handleRemoveTags(tag)}/>
                                                </span>
                                            ))}

                                            <button

                                                style={{
                                                    display: existingTags && existingTags.length > 0 ? "initial" : "none"
                                                }}

                                                className="minAddTopicButton" onClick={() => setTopicModalOpen(true)}>
                                                <Plus size={20} className='buttonIcon' color='var(--primary-text)' />

                                            </button>

                                        </div>
                                    </div>
                                    <div className='rightComponents'>
                                    </div>
                                </div>

                                <div style={{
                                    position: "relative",
                                    height: "calc(100%)",
                                    bottom: "0",
                                    borderRadius: "10px",
                                    transition: "0.2s",
                                    boxSizing: "border-box",
                                    overflow: "auto",
                                }} id="text">

                                    <MilkdownProvider>
                                        <ProsemirrorAdapterProvider>
                                            <MilkdownEditor documentPath={documentPath} documentContents={content}/>
                                        </ProsemirrorAdapterProvider>
                                    </MilkdownProvider>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="elevatedRightPanel" style={{
                            // width: genAIContainerOpen ? '320px' : '0px',
                            display: genAIContainerOpen ? 'inline-block' : 'none'
                        }}> 
                        <div className='elevatedRightPanelTabSelector'>
                                <div className='elevatedRightPanelTabWrapper'>
                                    <div className={rightPanelSetting === 'stats' ? `elevatedRightPanelTab active` : `elevatedRightPanelTab`}><Info size={20} className='tabIcon' onClick={() => setRightPanelSetting('stats')}/></div>
                                    <div className={rightPanelSetting === 'outline' ? `elevatedRightPanelTab active` : `elevatedRightPanelTab`}><AlignJustify size={20} className='tabIcon' onClick={() => setRightPanelSetting('outline')}/></div>
                                    <div className={rightPanelSetting === 'info' ? `elevatedRightPanelTab active` : `elevatedRightPanelTab`}><File size={20} className='tabIcon' onClick={() => setRightPanelSetting('info')}/></div>
                                    <div className={rightPanelSetting === 'style' ? `elevatedRightPanelTab active` : `elevatedRightPanelTab`}><Pen size={20} className='tabIcon' onClick={() => setRightPanelSetting('style')}/></div>
                                    <div className={rightPanelSetting === 'pane' ? `elevatedRightPanelTab active` : `elevatedRightPanelTab`}><Columns2 size={20} className='tabIcon' onClick={() => setRightPanelSetting('pane')}/></div>
                                    <div className={rightPanelSetting === 'genai' ? `elevatedRightPanelTab active` : `elevatedRightPanelTab`}><Sparkles size={20} className='tabIcon' onClick={() => setRightPanelSetting('genai')}/></div>
                                </div>
                            </div>


                            {rightPanelSetting === "outline" && (
                                <OutlineContainer
                                    tocHeaders={tocHeaders}
                                    rightPanelOpen={rightPanelOpen}
                                />
                            )}
                            {rightPanelSetting === "pane" && (
                                <PaneContainer>

                                </PaneContainer>
                            )}
                            {rightPanelSetting === "stats" && (
                                <StatContainer documentPath={documentPath} wordCount={wordCount} charCount={charCount}>

                                </StatContainer>
                            )}
                            {rightPanelSetting === "info" && (
                                <PageActionContainer documentPath={documentPath} documentRef={documentRef}>

                                </PageActionContainer>
                            )}
                            {rightPanelSetting === "style" && (
                                <StyleContainer>

                                </StyleContainer>
                            )}

                        </div>
                </div>

                {/* </Router> */}

            </div>
        );
};


export default EditorView;