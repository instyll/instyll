import React from "react"
import { useEffect, useState } from "react";
import fs from 'fs';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import '../App.css'

const DashboardDocumentItem = ({document}) => {

    const navigate = useNavigate();
    const [fileContents, setFileContents] = useState(null); // State to store file contents
    const notify = () => toast("Note does not exist");

    // read markdown from a path
    useEffect(() => {
        const readMarkdown = async () => {
          try {
            const contents = fs.readFileSync(document[3], 'utf-8');
            // console.log(contents)
            setFileContents(contents);
            // console.log(fileContents)
          } catch (error) {
            console.error('Error reading file:', error);
          }
        };
    
        readMarkdown();
      }, [fileContents]);

      const updateRouterParams = () => {
        // check if path still exists
        fs.access(document[3], fs.constants.F_OK, (err) => {
          if (err) {
            // notify
            notify();
          } else {
            navigate('/editor', { state: { documentPath: document[3], documentContent: fileContents } });
          }
        })
      }

    return (
        <div className='dashboardSuggestionItemChild' onClick={updateRouterParams}>
            {document &&
            <div className='documentTitle'>{document[1]}</div>
            }
            {document &&
                <div className='documentMetadata'>In {document[4]} - {document[2]}</div>
            }
            <ToastContainer /> 
        </div>
    )
}

export default DashboardDocumentItem;