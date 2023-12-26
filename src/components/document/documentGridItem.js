/**
 * @author wou
 */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DocumentOptionsModal from '../../modal/DocumentOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { useState } from 'react';

const DocumentGridItem = ({ documentInfo }) => {

  const [documentOptionsModalOpen, setDocumentOptionsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const navigate = useNavigate();

  const handleDocumentOptionsModalOpen = (value) => {
    setDocumentOptionsModalOpen(true);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    handleDocumentOptionsModalOpen(true);
    setSelectedDocument(documentInfo);
  }

  return (
    <div className='documentItem' key={documentInfo[0]}>

      <DocumentOptionsModal
        show={documentOptionsModalOpen}
        selectedDocument={selectedDocument}
        onHide={() => setDocumentOptionsModalOpen(false)}
      />

      <div className='topicTextContainer'>
        <div className='topicTextWrapper'>
          <div className='topicTitle'>
            <span>{documentInfo[1]}</span>
          </div>
          <div className='topicInfo'>
            <span>{documentInfo[2]}</span>
          </div>
          <div className='topicOptionsMenuContainer' onClick={handleClick}>
            <img src={moreDots} className='moreDots'></img>
          </div>
      </div>
      </div>
    </div>
  );
};

export default DocumentGridItem;
