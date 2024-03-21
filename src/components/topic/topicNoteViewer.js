/**
 * @author wou
 */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import Editor from './legacyEditor.js';
import "allotment/dist/style.css";
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import Select from 'react-select';
import fs from 'fs';
import '../../App.css';
import DocumentGridItem from '../document/documentGridItem';
import DocumentListItem from '../document/documentListItem';

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../../command-palette/commandPalette.css';

import { useParams } from 'react-router-dom';
import layoutGrid from '../../icons/layoutGrid.png';
import layoutList from '../../icons/layoutList.png';

const TopicNoteViewer = ({ location }) => {
    const [documentGridLayout, setDocumentGridLayout] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [notes, setNotes] = useState([])
    const { topicId } = useParams();
    const documentsPath = useSelector((state) => state.path.path)

    const containedNotes = useSelector((state) => {
        const documents = state.documents.documents;
        const filtered = documents.filter((document) => {
            return document[4] && document[4].includes(topicId);
        })
        return filtered
    })

    useEffect(() => {
        setNotes(containedNotes);
    }, [])

    /* Handle grid or list layout */
    const handleChangeDocumentViewLayout = () => {
        if (documentGridLayout) {
            setDocumentGridLayout(false);
        }
        else {
            setDocumentGridLayout(true);
        }
    }

    /* options for sorting topics */
    const options = [
        { value: 'sortByName', label: 'Sort by name' },
        { value: 'sortByDate', label: 'Sort by date' }
    ];

    // sort by selected option
    useEffect(() => {
        if (selectedOption) {
            if (selectedOption.value === 'sortByName') {
                const sortedFiles = [...containedNotes].sort((a, b) => a[1].toLowerCase().localeCompare(b[1].toLowerCase()));
                setNotes(sortedFiles);
            }
            else if (selectedOption.value === 'sortByDate') {
                const sortedFiles = [...containedNotes].sort((a, b) => {
                    const timeA = fs.statSync(a[3]).birthtime;
                    const timeB = fs.statSync(b[3]).birthtime;
                    return timeA - timeB; // For ascending order
                });
                setNotes(sortedFiles);
            }
        }
    }, [selectedOption])

    /* placeholder document info */
    const documentTestInfo = ["document name", 300]

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
                                    onClick={handleChangeDocumentViewLayout}
                                    >
                                        <img src={documentGridLayout ? layoutGrid : layoutList} class="buttonIcon" draggable={false}></img>
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
                                {documentGridLayout ? 
                                // <DocumentGridItem documentInfo={documentTestInfo}>
                                // </DocumentGridItem>
                                notes.map((doc) => (
                                    <DocumentGridItem key={doc[0]} documentInfo={[doc[3], doc[1]]}>
                                    </DocumentGridItem>
                                ))
                                :
                                notes.map((doc) => (
                                    <DocumentListItem key={doc[0]} documentInfo={[doc[3], doc[1]]}>
                                    </DocumentListItem>
                                ))
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

export default TopicNoteViewer;
