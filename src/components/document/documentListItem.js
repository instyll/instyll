/**
 * @author wou
 */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DocumentOptionsModal from '../../modal/DocumentOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { useState } from 'react';

const DocumentListItem = ({ documentInfo }) => {

  const navigate = useNavigate();

  const [documentOptionsModalOpen, setDocumentOptionsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDocumentOptionsModalOpen = (value) => {
    setDocumentOptionsModalOpen(true);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    handleDocumentOptionsModalOpen(true);
    setSelectedDocument(documentInfo);
  }

  return (
    <div className='documentListItem'>
      
      <DocumentOptionsModal
        show={documentOptionsModalOpen}
        selectedDocument={selectedDocument}
        onHide={() => setDocumentOptionsModalOpen(false)}
      />
      
      <div className='documentListTextContainer'>
        <div className='documentListTextWrapper'>
          <div className='topicListTitle'>
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

export default DocumentListItem;