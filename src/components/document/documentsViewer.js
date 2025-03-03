/**
 * @author wou
 */
import "allotment/dist/style.css";
import chokidar from 'chokidar';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import path from 'path';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uuid } from 'uuidv4';
import '../../App.css';
import { formatDate } from '../../actions';
import { addDocument } from '../../documentSlice';
import CreateDocumentModal from '../../modal/document/CreateDocumentModal';
import AssistantPanel from '../genai/AssistantPanel';
import DocumentListItem from './documentListItem';

import { ChevronDown, ChevronUp, PanelRight, SquarePen } from 'lucide-react';

const fs = require('fs');
const fsp = fs.promises;

const DocumentViewer = ({ location }) => {
    const [documentGridLayout, setDocumentGridLayout] = useState(true);
    const [markdownFiles, setMarkdownFiles] = useState([]);
    const [triggerRerender, setTriggerRerender] = useState(false);
    const [selectedOption, setSelectedOption] = useState('sortByNameAscending');
    const [createDocumentModalOpen, setCreateDocumentModalOpen] = useState(false);
    const [genAIContainerOpen, setGenAIContainerOpen] = useState(false);

    // console.log(triggerRerender)s

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

    const documents = useSelector((state) => state.documents.documents);
    // console.log("documents: " + documents)
    const handleToggleGenAIContainer = () => {
        setGenAIContainerOpen(!genAIContainerOpen)
    }
    // console.log(selectedOption)

    // sort by selected option
    useEffect(() => {
        if (selectedOption) {
            if (selectedOption === 'sortByNameAscending') {
                console.log(selectedOption)
                const sortedFiles = [...markdownFiles].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
                setMarkdownFiles(sortedFiles);
            }
            else if (selectedOption === 'sortByNameDescending') {
                const sortedFiles = [...markdownFiles].sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
                setMarkdownFiles(sortedFiles);
            } else if (selectedOption === 'sortByDateAscending') {
                // extract the date from the date string
                const sortedFiles = [...markdownFiles].sort((a, b) => {
                    const timeA = fs.statSync(documentsPath + "/" + a).birthtime;
                    const timeB = fs.statSync(documentsPath +  "/" + b).birthtime;
                    return timeA - timeB; // For ascending order
                });
                setMarkdownFiles(sortedFiles);
            } else {
                const sortedFiles = [...markdownFiles].sort((a, b) => {
                    const timeA = fs.statSync(documentsPath + "/" + a).birthtime;
                    const timeB = fs.statSync(documentsPath +  "/" + b).birthtime;
                    return timeB - timeA; // For desccending order
                });
                setMarkdownFiles(sortedFiles);
            }
        }
    }, [selectedOption])

    const documentsRef = useRef(null);

    useEffect(() => {
        documentsRef.current = documents;
    }, [documents]);

    // fetch markdown files on component mount
    useEffect(() => {
        const fetchMarkdownFiles = async () => {
            try {
                const files = await fsp.readdir(documentsPath);
                const markdownFiles = files.filter(file => path.extname(file) === '.md');
                setMarkdownFiles(markdownFiles);
                for (const markdownObject of markdownFiles) {
                    const markdownPath = path.join(documentsPath, markdownObject);
                    let documentExists = false;
                    for (let i = 0; i < documentsRef.current.length; ++i) {
                        const currDocument = documentsRef.current[i];
                        // console.log("check " + currDocument[3])
                        // console.log("match " + markdownPath)
                        if (currDocument[3] === markdownPath) {
                            documentExists = true;
                            break;
                        }
                    }
                    const documentCreated = formatDate(fs.statSync(markdownPath).birthtime.toDateString());
                    // console.log("documents: " + documents)
                    if (documentsRef.current.length == 0) {
                        // if redux store is empty, then add document
                        dispatch(addDocument([uuid(), removeMdExtension(markdownObject), documentCreated, markdownPath, []]));
                    }
                    else if (documentExists == false) {
                        // console.log("document does not exist and path is " + markdownPath)
                        dispatch(addDocument([uuid(), removeMdExtension(markdownObject), documentCreated, markdownPath, []]));
                    }
                }
                // setForceUpdate(prev => !prev);
            } catch (error) {
                console.error('Error fetching markdown files:', error);
            }
        };

        fetchMarkdownFiles();

        const watcher = chokidar.watch(documentsPath, {
            ignored: /[\/\\]\./, // ignore dotfiles
            persistent: true,
            usePolling: true,
        });

        watcher
        .on('add', () => {
            fetchMarkdownFiles();
        })
        .on('unlink', () => {
            fetchMarkdownFiles();
        });

        return () => watcher.close();
    }, []);

    // console.log(" exist documents: " + documents)

    /* placeholder document info */
    const documentTestInfo = ["document name", 300]

    return (
        <div className="EditorView">

            {/* <Router> */}

            <div className='container'>

                <CreateDocumentModal show={createDocumentModalOpen} onHide={() => setCreateDocumentModalOpen(false)}></CreateDocumentModal>

                <div className="topicView">
                    <div className="dashboardWrapper" style={{
                        width: genAIContainerOpen ? "calc(100% - 320px)" : "100%",
                    }}>
                         <div className="topicTitleWrapper drag">
                                <h1 className="heroTitle">
                                    Notes
                                </h1>
                                <div className='creationButtonContainer'>
                                    <button className='creationButton' onClick={() => setCreateDocumentModalOpen(true)}>
                                        <SquarePen size={20} color='var(--bg-color)' className='tocIcon'/>
                                        <span className='tocInnerText'>New Note</span>
                                    </button>
                                </div>
                                <div className='genAIInteractionToggleContainer'>
                                    <button className='tocToggleButton' onClick={handleToggleGenAIContainer}>
                                        <div><PanelRight size={20} color='var(--primary-text)' className='tocToggle'/></div>
                                    </button>
                                </div>
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
                                        value={selectedOption}
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
                        <div className="dashboardGreetingContainer">

                            {/* <div className='canScroll'> */}
                                {
                                    markdownFiles.map((filename) => (
                                        <DocumentListItem key={filename} documentInfo={[path.join(documentsPath, filename), removeMdExtension(filename)]}>
                                        </DocumentListItem>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                    {genAIContainerOpen &&
                        <AssistantPanel placeholder={`Find a note or chat with your notes`}/>
                    }
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
