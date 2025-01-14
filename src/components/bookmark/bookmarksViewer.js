/**
 * @author wou
 */
import React, { useEffect, useState } from 'react';
// import fs from 'fs/promises';
import "allotment/dist/style.css";
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import { useSelector } from 'react-redux';
import '../../App.css';
import DocumentListItem from '../document/documentListItem';

import { ChevronDown, ChevronUp } from 'lucide-react';

const fs = require('fs');
const fsp = fs.promises;

const BookmarkViewer = ({ location }) => {
    const [documentGridLayout, setDocumentGridLayout] = useState(true);
    const [selectedOption, setSelectedOption] = useState('sortByNameAscending');
    const [displayBookmarks, setDisplayBookmarks] = useState([])

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
        { value: 'sortByDate', label: 'Sort by date' },
        { value: 'sortByName', label: 'Sort by name' },
    ];

    const handleSortByTitle = () => {
        if (selectedOption === 'sortByNameAscending') {
            setSelectedOption('sortByNameDescending');
        } else {
            setSelectedOption('sortByNameAscending');
        }
    }

    const handleSortByDate = () => {
        if (selectedOption === 'sortByDateAscending') {
            setSelectedOption('sortByDateDescending');
        } else {
            setSelectedOption('sortByDateAscending');
        }
    }

    const bookmarks = useSelector((state) => state.bookmarks.bookmarks)
    console.log(bookmarks)
    useEffect(() => {
        setDisplayBookmarks(bookmarks);
    }, [bookmarks])

    // sort by selected option
    useEffect(() => {
        if (selectedOption) {
            if (selectedOption.value === 'sortByName') {
                const sortedBookmarks = [...bookmarks].sort((a, b) => a[1].toLowerCase().localeCompare(b[1].toLowerCase()));
                setDisplayBookmarks(sortedBookmarks);
            } else if (selectedOption.value === 'sortByDate') {
                const sortedBookmarks = [...bookmarks].sort((a, b) => {
                    const timeA = fs.statSync(a[3]).birthTime;
                    const timeB = fs.statSync(b[3]).birthTime;
                    return timeA - timeB;
                })
                setDisplayBookmarks(sortedBookmarks);
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
                            <div className="topicTitleWrapper drag">
                                <h1 className="heroTitle">
                                    Bookmarks
                                </h1>
                                {/* <div className='changeTopicViewButtonContainer'>
                                    <button className={documentGridLayout ? `changeTopicViewButton selected` : `changeTopicViewButton`}
                                        onClick={handleChangeDocumentViewLayout}
                                    >
                                        <img src={layoutGrid} class="buttonIcon" draggable={false}></img>
                                    </button>
                                    <button className={documentGridLayout ? `changeTopicViewButton` : `changeTopicViewButton selected`}
                                        onClick={handleChangeDocumentViewLayout}
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
                                </div> */}

                            </div>

                            {/* <div className='canScroll'> */}
                            <div className='dashboardTopicsContainer' id='notesview'>
                            <div className='listViewHeaderContainer'>
                                        <div className='listViewheaderTitle' onClick={handleSortByTitle}>
                                            <span className='tocInnerText'>Title</span>
                                            {selectedOption.startsWith('sortByName') && <>{selectedOption === 'sortByNameAscending' ? <ChevronUp size={20} color='var(--secondary-text)' className='tocIcon'/> : <ChevronDown size={20} color='var(--secondary-text)' className='tocIcon'/>}</>}
                                        </div>
                                        <div className='listViewHeaderRightWrapper'>
                                            <div className='listViewHeaderTopics'>
                                                <span className='tocInnerText'>Topics</span>
                                                {/* <ChevronUp size={20} color='var(--secondary-text)' className='tocIcon'/> */}
                                            </div>
                                            <div className='listViewHeaderDate' onClick={handleSortByDate}>
                                                <span className='tocInnerText'>Created</span>
                                                {selectedOption.startsWith('sortByDate') && <>{selectedOption === 'sortByDateAscending' ? <ChevronUp size={20} color='var(--secondary-text)' className='tocIcon'/> : <ChevronDown size={20} color='var(--secondary-text)' className='tocIcon'/>}</>}
                                            </div>
                                        </div>
                                    </div>
                                <div className='dashboardGreetingContainer'>
                                    {
                                        displayBookmarks.map((bookmark) => (
                                            <DocumentListItem key={bookmark} documentInfo={[bookmark[3], bookmark[1]]}>
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

export default BookmarkViewer;
