import React from "react"
import { useEffect, useState } from "react";
import fs from 'fs';
import { useNavigate } from "react-router-dom";

import '../App.css'

const DashboardDocumentItem = ({document}) => {

    const navigate = useNavigate();
    const [fileContents, setFileContents] = useState(null); // State to store file contents

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

      const updateRouterParams = () => { // because react router v6 is fucking stupid
        navigate('/editor', { state: { documentPath: document[3], documentContent: fileContents } });
        navigate(0)
      }

    return (
        <div className='dashboardSuggestionItemChild' onClick={updateRouterParams}>
            <div className='documentTitle'>{document[1]}</div>
            <div className='documentMetadata'>In {document[4]} - {document[2]}</div>
        </div>
    )
}

export default DashboardDocumentItem;