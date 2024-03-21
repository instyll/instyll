/**
 * @author wou
 */
import React, { useEffect, useState } from 'react';
// import Editor from './legacyEditor.js';
import "allotment/dist/style.css";
import fs from 'fs';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import CommandPalette from 'react-command-palette';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import '../../App.css';
import sampleHeader from '../../command-palette/commandPaletteHeader.js';
import { CLOSE, CREATE, DAILY, FILE, OPEN, SET_THEME, TOGGLE } from '../../constants.ts';
import CreateTopicModal from '../../modal/topic/CreateTopicModal.js';
import TopicSettingModal from '../../modal/topic/TopicSettingsModal.js';
import CreateGridTopicButton from './createNewGridTopicButton.js';
import CreateListTopicButton from './createNewListTopicButton.js';

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../../command-palette/commandPalette.css';

import layoutGrid from '../../icons/layoutGrid.png';
import layoutList from '../../icons/layoutList.png';
import TopicGridItem from './topicGridItem.js';
import TopicListItem from './topicListItem.js';

const Topics = () => {
    const [dockOpen, setDockOpen] = useState(true);
    const [fileNames, setFileNames] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [notesDirectory, setNotesDirectory] = useState("/home/wou/Documents/instyllnotes/");
    const [topicSettingsModalOpen, setTopicSettingsModalOpen] = useState(false);
    const [createTopicModalOpen, setCreateTopicModalOpen] = useState(false);
    const [topicGridLayout, setTopicGridLayout] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [topics, setTopics] = useState([]);

    const dispatch = useDispatch();

    const tags = useSelector((state) => state.tags.tags);

    useEffect(() => {
        setTopics(tags);
    }, [tags])

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

    /* Handle grid or list layout */
    const handleChangeTopicViewLayout = () => {
        if (topicGridLayout) {
            setTopicGridLayout(false);
        }
        else {
            setTopicGridLayout(true);
        }
    }

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

    /* options for sorting topics */
    const options = [
        { value: 'sortByDate', label: 'Sort by date' },
        { value: 'sortByName', label: 'Sort by name' },
        { value: 'sortByNumberOfNotes', label: 'Sort by contents' }
    ];

    //sort by selected option
    useEffect(() => {
        if (selectedOption) {
            if (selectedOption.value === 'sortByName') {
                const sortedTopics = [...topics].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
                setTopics(sortedTopics);
            }
        }
    }, [selectedOption])

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

            <div className='container'>

                <div className="topicView">
                    <div className="dashboardWrapper" style={{
                        width: "100%",
                    }}>
                        <div className="dashboardGreetingContainer">
                            <div className="topicTitleWrapper">
                                <h1 className="heroTitle">
                                    Topics
                                </h1>
                                <div className='changeTopicViewButtonContainer'>
                                    <button className='changeTopicViewButton'
                                        onClick={handleChangeTopicViewLayout}>
                                        <img src={topicGridLayout ? layoutGrid : layoutList} class="buttonIcon" draggable={false}></img>
                                    </button>
                                </div>
                                <div className='selectSortOptionContainer'>
                                    <Select
                                        onChange={(value) => setSelectedOption(value)}
                                        options={options}
                                        placeholder="Sort by..."
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: "10px",
                                                borderColor: "var(--muted-text)",
                                                width: "180px",
                                                fontFamily: "var(--font)",
                                                backgroundColor: "transparent",
                                            }),
                                            input: (baseStyles, state) => ({
                                                ...baseStyles,
                                                color: "var(--secondary-text)",
                                            }),
                                            menu: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderRadius: "10px",
                                                backgroundColor: "var(--elevated-bg)",
                                                fontFamily: "var(--font)",
                                            }),
                                            singleValue: (baseStyles, state) => ({
                                                ...baseStyles,
                                                color: "var(--secondary-text)",
                                            }),
                                            option: (baseStyles, state) => ({
                                                ...baseStyles,
                                                color: "var(--primary-text)",
                                            }),
                                            indicatorSeparator: (baseStyles, state) => ({
                                                ...baseStyles,
                                                backgroundColor: "var(--muted-text)",
                                            }),
                                            dropdownIndicator: (baseStyles, state) => ({
                                                ...baseStyles,
                                                color: "var(--secondary-text)",
                                            }),
                                        }}
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary25: 'var(--muted-text)',
                                                primary: 'var(--muted-text)',
                                            },
                                        })}
                                    />
                                </div>

                            </div>

                            {/* <div className='canScroll'> */}
                            <div className='dashboardTopicsContainer'>

                                {topicGridLayout ? topics.map((tag) => (

                                        <TopicGridItem tag={tag}>
                                        </TopicGridItem>
                                
                                )): topics.map((tag) => (
                                    <TopicListItem tag={tag}>
                                    </TopicListItem>
                                ))}

                                {topicGridLayout ? 
                                <CreateGridTopicButton setCreateTopicModalOpen={setCreateTopicModalOpen}>
                                </CreateGridTopicButton>
                                : 
                                <CreateListTopicButton setCreateTopicModalOpen={setCreateTopicModalOpen}>
                                </CreateListTopicButton>
                                }
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* </Router> */}

        </div>
    );
}

export default Topics;
