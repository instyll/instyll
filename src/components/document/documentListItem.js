/**
 * @author wou
 */
import React from 'react';
import fs from 'fs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DocumentOptionsModal from '../../modal/document/DocumentOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import { ToastContainer, toast } from 'react-toastify'
import { addBookmark } from '../../bookmarkSlice';
import { removeDocument } from '../../documentSlice';
import 'react-contexify/ReactContexify.css';

const DocumentListItem = ({ documentInfo }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = () => toast("Note Bookmarked!");

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
          console.log(event, props)
          break;
        case "cut":
          console.log(event, props);
          break;
        //etc...
      }
    }

  const existingTags = useSelector((state) => {
    const documents = state.documents.documents;
    const documentIndex = documents.findIndex(doc => doc[3] === documentInfo[0]);

    if (documentIndex !== -1) {
      console.log(documents[documentIndex])
      const fourthIndex = documents[documentIndex][4];
      console.log(fourthIndex)
      return fourthIndex;
    }
    return null; 
  });

  const [documentOptionsModalOpen, setDocumentOptionsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileContents, setFileContents] = useState(null); // State to store file contents

  // bookmark a note
  const handleBookmark = (doc) => {
    console.log(documentInfo)
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

  const documentObj = useSelector((state) => {
    const documents = state.documents.documents;
    const documentIndex = documents.findIndex(doc => doc[3] === documentInfo[0]);

    if (documentIndex !== -1) {
      return documents[documentIndex];
    }
    return null; 
  });

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
    <div className='documentListItem'>
      
      {/* <DocumentOptionsModal
        show={documentOptionsModalOpen}
        selectedDocument={selectedDocument}
        onHide={() => setDocumentOptionsModalOpen(false)}
      /> */}

    <Menu id={documentInfo[0]}>
      <Item id="rename" onClick={handleItemClick}>Rename</Item>
      <Item id="save" onClick={handleBookmark}>Bookmark</Item>
      <Item id="delete" onClick={() => removeDocument(selectedDocument)}>Delete</Item>
    </Menu>
      
      <div className='documentListTextContainer' onClick={() => navigate('/editor', { state: {documentPath: documentInfo[0], documentContent: fileContents}})}>
        <div className='documentListTextWrapper'>
          <div className='topicListTitle'>
            <span>{documentInfo[1]}</span>
          </div>
          <div className='appendedTagsContainer'>
          {existingTags.length > 0 ? existingTags.map((tag) => (
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

export default DocumentListItem;