import React from "react"
import { useEffect, useState } from "react";
import fs from 'fs';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import '../App.css'

const DashboardDocumentItem = ({document}) => {

    const navigate = useNavigate();
    const [fileContents, setFileContents] = useState(null); // State to store file contents
    const [topicsString, setTopicsString] = useState(null); // concatenate topics
    const notify = () => toast("Note does not exist");

    // read markdown from a path
    useEffect(() => {
        const readMarkdown = async () => {
          try {
            if (document) {
              const contents = fs.readFileSync(document[3], 'utf-8');
              // console.log(contents)
              setFileContents(contents);
              // console.log(fileContents)
            }
          } catch (error) {
            console.error('Error reading file:', error);
          }
        };
    
        readMarkdown();
      }, [fileContents]);

      const updateRouterParams = () => {
        // check if path still exists
        document && fs.access(document[3], fs.constants.F_OK, (err) => {
          if (err) {
            // notify
            notify();
          } else {
            navigate('/editor', { state: { documentPath: document[3], documentContent: fileContents } });
          }
        })
      }

    useEffect(() => {
      let topicString = "";
      if (document) {
        for (const topic of document[4]) {
          topicString += topic + ", ";
        }
        setTopicsString(topicString);
      }
    }, [])

    return (
        <div className='dashboardSuggestionItemChild' onClick={updateRouterParams}>
            {document &&
            <div className='documentTitle'>{document[1]}</div>
            }
            {document && document[4].length > 0 &&
                <div className='documentMetadata'>In {topicsString} - {document[2]}</div>
            }
            {document && document[4].length == 0 &&
                <div className='documentMetadata'>No topic - {document[2]}</div>
            }
            <ToastContainer /> 
        </div>
    )
}

export default DashboardDocumentItem;