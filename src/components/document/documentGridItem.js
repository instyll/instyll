/**
 * @author wou
 */
import React from 'react';
import fs from 'fs'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DocumentOptionsModal from '../../modal/document/DocumentOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { useState, useEffect, useRef } from 'react';
import UpdateDocumentModal from '../../modal/document/UpdateDocumentModal';
import { useSelector, useDispatch } from 'react-redux';
import { addBookmark } from '../../bookmarkSlice';
import { removeDocument } from '../../documentSlice';
import { ToastContainer, toast } from 'react-toastify'
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';

const MENU_ID = 'doc';

const DocumentGridItem = ({ documentInfo }) => {

  const [updateDocumentModalOpen, setUpdateDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileContents, setFileContents] = useState(null); // State to store file contents
  const parentRef = useRef(null);

  // context menu

  const { show } = useContextMenu({
    id: documentInfo[0],
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
        // console.log(event, props)
        break;
      case "cut":
        // console.log(event, props);
        break;
      //etc...
    }
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // bookmark toast
  const notify = () => toast("Note Bookmarked!");

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

  // bookmark a note
  const handleBookmark = (doc) => {
    // console.log(documentInfo)
    // console.log(documentObj)
    dispatch(addBookmark(documentObj));
    notify();
  }

  // delete a note
  const handleRemoveDocument = (documentItem) => {
    dispatch(removeDocument(documentItem));
  }

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

  const handleClose = () => {
    setUpdateDocumentModalOpen(false);
  };

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

    <UpdateDocumentModal
            show={updateDocumentModalOpen}
            selectedDocument={selectedDocument}
            documentPath={documentInfo[0]}
            handleClose={handleClose}
            onHide={() => {
                setUpdateDocumentModalOpen(false)
            }}
    />

    <Menu id={documentInfo[0]}>
      <Item id="rename" onClick={() => setUpdateDocumentModalOpen(true)}>Rename</Item>
      <Item id="save" onClick={() => handleBookmark(selectedDocument)}>Bookmark</Item>
      <Item id="delete" onClick={() => handleRemoveDocument(selectedDocument)}>Delete</Item>
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

      <ToastContainer />

    </div>
  );
};

export default DocumentGridItem;
