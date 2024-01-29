import React from 'react';
import { useNavigate } from 'react-router-dom';
import fs from 'fs'
import '../App.css'
import { useState, useEffect } from 'react';

// document object: [DocumentID, DocumentTitle, DateCreated, DocumentPath, topics: []]

const QueryResult = ({ documentInfo }) => {

    const [fileContents, setFileContents] = useState(null); // State to store file contents
    const navigate = useNavigate();

    useEffect(() => {
        const readMarkdown = async () => {
          try {
            const contents = fs.readFileSync(documentInfo[3], 'utf-8');
            // console.log(contents)
            setFileContents(contents);
            // console.log(fileContents)
          } catch (error) {
            console.error('Error reading file:', error);
          }
        };
    
        readMarkdown();
      }, [fileContents]);

    return (
        <div className='queryResultContainer' onClick={() => navigate('/editor', { state: { documentPath: documentInfo[3], documentContent: fileContents } })}>
            <div className='queryResultWrapper'>
                <div className='queryResultDocumentTitle'>
                {documentInfo[1]}
                </div>
            </div>
            <div className='queryResultTopicContainer'>
                {documentInfo[4].map((topic) => (
                <span className='tagItem'>{topic}</span>
            ))}
            </div>
        </div>
    )
}

export default QueryResult;
