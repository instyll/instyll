import React from 'react';
import '../App.css'

// document object: [DocumentID, DocumentTitle, DateCreated, DocumentPath, topics: []]

const QueryResult = ({ documentInfo }) => {
    return (
        <div className='queryResultContainer'>
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
