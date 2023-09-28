/**
 * @author wou
 */
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
import { useSelector, useDispatch } from 'react-redux';
import TopicSettingModal from '../modal/TopicSettingsModal.js';
import Select from 'react-select';
import CreateTopicModal from '../modal/CreateTopicModal.js';
import CreateGridTopicButton from './createNewGridTopicButton.js';
import CreateListTopicButton from './createNewListTopicButton.js';

import '../command-palette/commandPalette.css';
import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-nord.css';

import layoutGrid from '../icons/layoutGrid.png';
import layoutList from '../icons/layoutList.png';
import TopicGridItem from './topicGridItem.js';
import TopicListItem from './topicListItem.js';
import { useParams } from 'react-router-dom';

const TopicNoteViewer = ({ location }) => {
    const [topicGridLayout, setTopicGridLayout] = useState(true);
    const { topicId } = useParams();

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
        { value: 'sortByDate', label: 'Sort by date' },
        { value: 'sortByName', label: 'Sort by name' },
        { value: 'sortByNumberOfNotes', label: 'Sort by contents' }
    ];

    return (
        <div className="EditorView">

            {/* <Router> */}

            <div className='container'>

                <div className="topicView">
                    <div className="dashboardWrapper" style={{
                        width: "100%",
                    }}>
                        <div className="dashboardGreetingContainer">
                            <div className="topicTitleWrapper">
                                <h1 className="heroTitle">
                                    {topicId}
                                </h1>
                                <div className='changeTopicViewButtonContainer'>
                                    <button className='changeTopicViewButton'
                                    >
                                        <img src={topicGridLayout ? layoutGrid : layoutList} class="buttonIcon" draggable={false}></img>
                                    </button>
                                </div>
                                <div className='selectSortOptionContainer'>
                                    <Select
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

                            
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* </Router> */}

        </div>
    );
}

export default TopicNoteViewer;
