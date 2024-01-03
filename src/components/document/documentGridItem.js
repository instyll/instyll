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

      <div className='documentTextContainer'>
        <div className='documentTextWrapper'>
          <div className='topicTitle'>
            <span>{documentInfo}</span>
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
