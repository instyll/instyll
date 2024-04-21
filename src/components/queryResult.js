import React from 'react';
import { useNavigate } from 'react-router-dom';
import fs from 'fs'
import '../App.css'
import { useState, useEffect, useRef } from 'react';

// document object: [DocumentID, DocumentTitle, DateCreated, DocumentPath, topics: []]

const QueryResult = ({ documentInfo, selected }) => {

    // const [fileContents, setFileContents] = useState(null); // State to store file contents
    const navigate = useNavigate();
    const queryItemRef = useRef();

    // scroll query items into view
    useEffect(() => {
      if (selected && queryItemRef.current) {
        queryItemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest"})
      }
    }, [selected])

    // useEffect(() => {
    //     const readMarkdown = async () => {
    //       try {
    //         const contents = fs.readFileSync(documentInfo[3], 'utf-8');
    //         // console.log(contents)
    //         setFileContents(contents);
    //         // console.log(fileContents)
    //       } catch (error) {
    //         console.error('Error reading file:', error);
    //       }
    //     };
    
    //     readMarkdown();
    //   }, [documentInfo]);

    const updateRouterParams = () => { // bad solution but no easy way in v6
      navigate('/editor', { state: { documentPath: documentInfo[3] } });
      navigate(0)
    }

    return (
        <div ref={queryItemRef} className={`queryResultContainer ` + (selected ? 'selected' : '')} onClick={updateRouterParams}>
            <div className='queryResultWrapper'>
                <div className='queryResultDocumentTitle'>
                {documentInfo[1]}
                </div>
            </div>
            <div className='queryResultTopicContainer'>
                {documentInfo[4] && documentInfo[4].map((topic) => (
                <span className='tagItem'>{topic}</span>
            ))}
            </div>
        </div>
    )
}

export default QueryResult;
