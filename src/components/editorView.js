/**
 * @author wou
 */
import React, { Component, useState, useEffect } from 'react';
// import Editor from './legacyEditor.js';
import { MilkdownEditorWrapper } from '../mdWrapper.js';
import '../App.css';
import "highlight.js/styles/github.css";
import Sizzle from 'sizzle'
import 'katex/dist/katex.min.css'
import { Allotment } from "allotment";
import "allotment/dist/style.css";
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
import PaneContainer from './paneContainer.tsx';
import StatContainer from './StatContainer.js';
import { BrowserRouter, BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../components/home.js';

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


import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { MilkdownEditor } from '../mdWrapper.js';



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
import plus from '../icons/plus.png';
import { initial } from 'lodash';

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

    const {state} = useLocation();
    const { documentPath, documentContent } = state;

    console.log(documentContent)

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
        setSelectedTags()
    };

    const handleAddTags = () => {
        console.log('Selected Tags:', state.selectedTags);
        setAddedTags((prevAddedTags) => [...prevAddedTags, ...selectedTags]);
        setSelectedTags([])
    };

    const handleRemoveTags = (tag) => {
        console.log(tag);
        setAddedTags((prevAddedTags) => prevAddedTags.filter((t) => t !== tag));
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
                                                    display: addedTags.length > 0 ? "none" : "initial"
                                                }}

                                                className="addTopicButton" onClick={() => setTopicModalOpen(true)}>

                                                <img src={add} class="buttonIcon" draggable={false}></img>

                                                <span className="buttonText">Add topic</span></button>


                                            <TopicModal
                                                show={topicModalOpen}
                                                onHide={() => setState({ topicModalOpen: false })}
                                                tocOpen={tocOpen}
                                                selectedTags={selectedTags}
                                                onSelectTags={handleTagsSelection}
                                                onAddTags={handleAddTags} />

                                            {addedTags.map((tag) => (
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
                                                    display: addedTags.length > 0 ? "initial" : "none"
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
                                            <MilkdownEditor documentPath={documentPath} documentContents={documentContent}/>
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
                                <StatContainer>

                                </StatContainer>
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
                                        onClick={handleDock} style={{
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