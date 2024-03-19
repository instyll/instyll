/**
 * @author wou
 */
import React from 'react';
import fs from 'fs'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DocumentOptionsModal from '../../modal/DocumentOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';

const MENU_ID = 'doc';

const DocumentGridItem = ({ documentInfo }) => {

  const [documentOptionsModalOpen, setDocumentOptionsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileContents, setFileContents] = useState(null); // State to store file contents
  const parentRef = useRef(null);

  // context menu

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event){
      show({
        event,
        props: {
            key: 'value'
        }
      })
  }

  // I'm using a single event handler for all items
  // but you don't have too :)
  const handleItemClick = ({ id, event, props }) => {
    switch (id) {
      case "copy":
        console.log(event, props)
        break;
      case "cut":
        console.log(event, props);
        break;
      //etc...
    }
  }

  const navigate = useNavigate();

  const existingTags = useSelector((state) => {
    const documents = state.documents.documents;
    const documentIndex = documents.findIndex(doc => doc[3] === documentInfo[0]);

    if (documentIndex !== -1) {
      // console.log(documents[documentIndex])
      const fourthIndex = documents[documentIndex][4];
      // console.log(fourthIndex)
      return fourthIndex;
    }
    return null; 
  });

  const documentObj = useSelector((state) => {
    const documents = state.documents.documents;
    const documentIndex = documents.findIndex(doc => doc[3] === documentInfo[0]);

    if (documentIndex !== -1) {
      return documents[documentIndex];
    }
    return null; 
  });

  const handleDocumentOptionsModalOpen = (value) => {
    setDocumentOptionsModalOpen(true);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    show({
      event,
      props: {
          key: 'value'
      }
    })
    setSelectedDocument(documentInfo);
  }

  useEffect(() => {
    const readMarkdown = async () => {
      try {
        const contents = fs.readFileSync(documentInfo[0], 'utf-8');
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
    <div className='documentItem' ref={parentRef} onContextMenu={handleContextMenu}>

      {/* <DocumentOptionsModal
        show={documentOptionsModalOpen}
        selectedDocument={selectedDocument}
        documentPath={documentInfo[0]}
        ovRef={parentRef}
        documentObj={documentObj}
        onHide={() => setDocumentOptionsModalOpen(false)}
      /> */}

    <Menu id={MENU_ID}>
      <Item id="rename" onClick={handleItemClick}>Rename</Item>
      <Item id="save" onClick={handleItemClick}>Bookmark</Item>
      <Item id="delete" onClick={handleItemClick}>Delete</Item>
    </Menu>

      <div className='documentTextContainer' onClick={() => navigate('/editor', { state: { documentPath: documentInfo[0], documentContent: fileContents } })}>
        <div className='documentTextWrapper'>
          <div className='topicTitle'>
            <span>{documentInfo[1]}</span>
          </div>
          <div className='appendedTagsContainer'>
            {existingTags && existingTags.length > 0 ? existingTags.map((tag) => (
              <span
                key={tag}
                className="tagItem"
              >
                {tag}
              </span>
            )) : 
            <span className='noteTopicStatus'>No topics</span>}
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
