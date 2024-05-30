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

    /* options for sorting topics */
    const options = [
        { value: 'sortByName', label: 'Sort by name' },
        // { value: 'sortByNumberOfNotes', label: 'Sort by contents' }
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
                            <div className="topicTitleWrapper drag">
                                <h1 className="heroTitle">
                                    Topics
                                </h1>
                                <div className='changeTopicViewButtonContainer'>
                                    <button className={topicGridLayout ? `changeTopicViewButton selected` : `changeTopicViewButton`}
                                        onClick={handleChangeTopicViewLayout}
                                    >
                                        <img src={layoutGrid} class="buttonIcon" draggable={false}></img>
                                    </button>
                                    <button className={topicGridLayout ? `changeTopicViewButton` : `changeTopicViewButton selected`}
                                        onClick={handleChangeTopicViewLayout}
                                    >
                                        <img src={layoutList} class="buttonIcon" draggable={false}></img>
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
                                {topicGridLayout ? 
                                    <CreateGridTopicButton setCreateTopicModalOpen={setCreateTopicModalOpen}>
                                    </CreateGridTopicButton>
                                    : 
                                    <CreateListTopicButton setCreateTopicModalOpen={setCreateTopicModalOpen}>
                                    </CreateListTopicButton>
                                }
                                {topicGridLayout ? topics.map((tag) => (

                                        <TopicGridItem tag={tag}>
                                        </TopicGridItem>
                                
                                )): topics.map((tag) => (
                                    <TopicListItem tag={tag}>
                                    </TopicListItem>
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

export default Topics;
