/**
 * @author wou
 */
import React, { useEffect, useRef, useState } from 'react';
import CommandPalette from 'react-command-palette';
import { useDispatch, useSelector } from 'react-redux';
import Sizzle from 'sizzle';
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

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../command-palette/commandPalette.css';

// Plugins

import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { MilkdownEditor } from '../mdWrapper.js';



// Assets
import add from '../icons/add_component2.png';
import deleteX from '../icons/delete.png';
import doc from '../icons/document.png';
import doubleRight from '../icons/doubleright.png';
import edit from '../icons/edit.png';
import outline from '../icons/outline.png';
import plus from '../icons/plus.png';
import reference from '../icons/reference.png';
import stats from '../icons/stats.png';

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
    const [rightPanelSetting, setRightPanelSetting] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);

    const {state} = useLocation();
    const { documentPath, documentContent } = state;
    console.log("the loaded state " + state)

    const dispatch = useDispatch();

    // read word count of the contents
    useEffect(() => {
        const words = documentContent.split(/\s+/);
        const chars = documentContent.split('');
        setWordCount(words.length);
        setCharCount(chars.length);
    }, [])

    const existingTags = useSelector((state) => {
        const documents = state.documents.documents;
        const documentIndex = documents.findIndex(doc => doc[3] === documentPath);
        
        if (documentIndex !== -1) {
        //   console.log(documents[documentIndex])  
          const fourthIndex = documents[documentIndex][4];
          console.log(documents[documentIndex][1] + " tags: " + fourthIndex)
          return fourthIndex;
        }
        return null; // Adjust the default value based on your needs
      });

    // console.log(documentContent)

    const documentRef = useRef();

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
        console.log(addedTags)
        const requestObj = [documentPath, selectedTags];
        console.log(requestObj);
        dispatch(addTags(requestObj));
        setSelectedTags([]);
        // Add tags to redux document
        console.log("added tags: " + updatedTags);
    };

    const handleRemoveTags = (tag) => {
        console.log(tag);
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
            handleToc();
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

            setState({
                tocOpen: tocOpen === true ? false : true
            });

        }
    },
    {
        name: TOGGLE + "Dock",
        category: "Command",
        command: () => {
            handleDock();
            setState({
                rightPanelOpen: false,
            })
        }
    },
    {
        name: TOGGLE + "Right Panel",
        category: "Command",
        command: () => {
            setState({
                rightPanelOpen: rightPanelOpen ? false : true,
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
                    renderCommand={sampleChromeCommand}
                    resetInputOnOpen={true}
                    theme={theme}
                    header={sampleHeader()}
                    maxDisplayed={500}
                ></CommandPalette>

                <div className='container'>
                    <div className="editingView">
                        <div className="elevatedLeft"
                            style={{
                                width:
                                    rightPanelSetting === "pane"
                                        && rightPanelOpen ? "calc((100% / 2) - 44px)"
                                        : tocOpen && rightPanelOpen
                                            ? "calc((100%) - 360px)"
                                            : !tocOpen && rightPanelOpen
                                                ? "calc((100%) - 360px)"
                                                : tocOpen && !rightPanelOpen
                                                    ? "calc((100%) - 100px)"
                                                    : "calc((100%) - 100px)",
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

                                                <img src={add} class="buttonIcon" draggable={false}></img>

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
                                                    <img src={deleteX}
                                                        className="buttonIconSmall"
                                                        draggable={false}
                                                        onClick={
                                                            () => handleRemoveTags(tag)}
                                                        style={{
                                                            filter: "var(--editorIconFilter)",
                                                        }}></img>
                                                </span>
                                            ))}

                                            <button

                                                style={{
                                                    display: existingTags && existingTags.length > 0 ? "initial" : "none"
                                                }}

                                                className="minAddTopicButton" onClick={() => setTopicModalOpen(true)}>

                                                <img src={plus} class="buttonIcon" draggable={false}></img>

                                            </button>

                                        </div>
                                    </div>
                                    <div className='rightComponents'>
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

                                    <MilkdownProvider>
                                        <ProsemirrorAdapterProvider>
                                            <MilkdownEditor documentPath={documentPath} documentContents={documentContent} ref={documentRef}/>
                                        </ProsemirrorAdapterProvider>
                                    </MilkdownProvider>

                                </div>

                            </div>
                        </div>

                        <div className="elevatedRightPanel" style={{
                            width: rightPanelOpen
                                && rightPanelSetting === "pane" ? "calc((100% / 2) - 76px)" :
                                rightPanelOpen ? "240px" : "0px",
                            marginLeft: rightPanelOpen ? "20px" : "0px",
                        }}>

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

                        <div className="elevatedRight" style={{
                            backgroundColor: dockOpen ? "var(--elevated-bg)" : "transparent",
                            marginLeft: rightPanelOpen ? "20px" : "20px",
                        }}>

                            <div className="elevatedRightInner">
                                <div>
                                    {dockOpen && (
                                        <img
                                            src={stats}
                                            className={`tocIconRightFirst ${rightPanelSetting === "stats" && rightPanelOpen ? "selected" : ""}`}
                                            draggable={false}
                                            onClick={() => handleRightPanel("stats")}
                                        ></img>
                                    )}
                                </div>
                                <div>
                                    {dockOpen && (
                                        <img
                                            src={outline}
                                            className={`tocIconRight ${rightPanelSetting === "outline" && rightPanelOpen ? "selected" : ""}`}
                                            draggable={false}
                                            onClick={() => handleRightPanel("outline")}
                                        ></img>
                                    )}
                                </div>
                                <div>
                                    {dockOpen && (
                                        <img
                                            src={doc}
                                            className={`tocIconRight ${rightPanelSetting === "info" && rightPanelOpen ? "selected" : ""}`}
                                            draggable={false}
                                            onClick={() => handleRightPanel("info")}
                                        ></img>
                                    )}
                                </div>
                                <div>
                                    {dockOpen && (
                                        <img
                                            src={edit}
                                            className={`tocIconRight ${rightPanelSetting === "style" && rightPanelOpen ? "selected" : ""}`}
                                            draggable={false}
                                            onClick={() => handleRightPanel("style")}
                                        ></img>
                                    )}
                                </div>
                                <div>
                                    {dockOpen && (
                                        <img
                                            src={reference}
                                            className={`tocIconRight ${rightPanelSetting === "pane" && rightPanelOpen ? "selected" : ""}`}
                                            draggable={false}
                                            onClick={() => handleRightPanel("pane")}
                                        ></img>
                                    )}
                                </div>
                                <div className="bottomTocRight" style={{
                                    borderTop: dockOpen ? "1px solid var(--muted-text)" : "none",
                                }}>
                                    <img src={doubleRight} className="tocIconRightLast" id="closeDock" draggable={false}
                                        onClick={handleDock}ƒ style={{
                                            transform: dockOpen ? "none" : "rotate(180deg)",
                                            transition: "transform 0.3s",
                                        }}></img>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* </Router> */}

            </div>
        );
};


export default EditorView;