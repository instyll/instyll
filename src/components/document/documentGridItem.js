/**
 * @author wou
 */
import React from 'react';
import fs from 'fs'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DocumentOptionsModal from '../../modal/DocumentOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { useState, useEffect } from 'react';

const DocumentGridItem = ({ documentInfo }) => {

  const [documentOptionsModalOpen, setDocumentOptionsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileContents, setFileContents] = useState(null); // State to store file contents

  const navigate = useNavigate();

  const handleDocumentOptionsModalOpen = (value) => {
    setDocumentOptionsModalOpen(true);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    handleDocumentOptionsModalOpen(true);
    setSelectedDocument(documentInfo);
  }

  useEffect(() => {
    const readMarkdown = async () => {
      try {
        const contents = fs.readFileSync(documentInfo[0], 'utf-8');
        console.log(contents)
        setFileContents(contents);
        console.log(fileContents)
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    readMarkdown();
  }, [fileContents]); 

  return (
    <div className='documentItem'>

      <DocumentOptionsModal
        show={documentOptionsModalOpen}
        selectedDocument={selectedDocument}
        documentPath={documentInfo[0]}
        onHide={() => setDocumentOptionsModalOpen(false)}
      />

      <div className='documentTextContainer' onClick={() => navigate('/editor', { state: {documentPath: documentInfo[0], documentContent: fileContents}})}>
        <div className='documentTextWrapper'>
          <div className='topicTitle'>
            <span>{documentInfo[1]}</span>
          </div>
          <div className='appendedTagsContainer'>
            {/* <span className='tagItem'>projects</span>
            <span className='tagItem'>books</span> */}
            <span className='noteTopicStatus'>No topics</span>
          </div>
          <div className='documentOptionsMenuContainer' onClick={handleClick}>
            <img src={moreDots} className='moreDots'></img>
          </div>
      </div>
      </div>
    </div>
  );
};

export default DocumentGridItem;
