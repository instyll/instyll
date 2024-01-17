/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import fs from 'fs/promises';
import chokidar from 'chokidar';
import path from 'path';
import '../../App.css';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css'
import "allotment/dist/style.css";
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { addDocument } from '../../documentSlice';
import parseAndFormatDate from '../../DateUtils';
import DocumentGridItem from './documentGridItem';
import DocumentListItem from './documentListItem';

import layoutGrid from '../../icons/layoutGrid.png';
import layoutList from '../../icons/layoutList.png';
import { uuid } from 'uuidv4';

const DocumentViewer = ({ location }) => {
    const [documentGridLayout, setDocumentGridLayout] = useState(true);
    const [markdownFiles, setMarkdownFiles] = useState([]);

    const documentsPath = useSelector((state) => state.path.path)
    const dispatch = useDispatch();

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
        { value: 'sortByNumberOfNotes', label: 'Sort by contents' }
    ];

    const documents = useSelector((state) => state.documents.documents)

    // fetch markdown files on component mount
    useEffect(() => {
        const fetchMarkdownFiles = async () => {
            try {
                const files = await fs.readdir(documentsPath);
                const markdownFiles = files.filter(file => path.extname(file) === '.md');
                setMarkdownFiles(markdownFiles);
                const date = new Date();
                const parsedDate = parseAndFormatDate(date.toString());
                for (const markdownObject of markdownFiles) {
                    console.log("iterate " + markdownObject)
                    for (let i = 0; i < documents.length; ++i) {
                        let currDocument = documents[i];
                        if (currDocument[3] !== path.join(documentsPath, markdownObject)) {
                            dispatch(addDocument([uuid(), removeMdExtension(markdownObject), parsedDate, path.join(documentsPath, markdownObject), []]))
                            break;
                        }
                    }
                }
                setForceUpdate(prev => !prev);
            } catch (error) {
                console.error('Error fetching markdown files:', error);
            }
        };

        // fetchMarkdownFiles();

        const watcher = chokidar.watch(documentsPath, {
            ignored: /[\/\\]\./, // ignore dotfiles
            persistent: true,
        });

        watcher
            .on('add', fetchMarkdownFiles)
            .on('unlink', fetchMarkdownFiles);

        return () => watcher.close();
    }, [documentsPath]);

    console.log(" exist documents: " + documents)

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
                                    Notes
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
                                    markdownFiles.map((filename) => (
                                        <DocumentGridItem key={filename} documentInfo={[path.join(documentsPath, filename), removeMdExtension(filename)]}>
                                        </DocumentGridItem>
                                    ))
                                    :
                                    markdownFiles.map((filename) => (
                                        <DocumentListItem key={filename} documentInfo={[path.join(documentsPath, filename), removeMdExtension(filename)]}>
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

const removeMdExtension = (filename) => {
    return path.basename(filename, '.md');
}

export default DocumentViewer;
