/**
 * @author wou
 */
import fs from 'fs';
import React, { useEffect, useState } from 'react';
import { Item, Menu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../App.css';
import { addBookmark } from '../../bookmarkSlice';
import { removeDocument } from '../../documentSlice';
import moreDots from '../../icons/menudots.png';
import UpdateDocumentModal from '../../modal/document/UpdateDocumentModal';

const DocumentListItem = ({ documentInfo }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifyBookmark = () => toast("Note Bookmarked!");
  const notifyExists = () => toast("Note is already bookmarked");

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

  const documentCreationDate = useSelector((state) => {
    const documents = state.documents.documents;
    const documentIndex = documents.findIndex(doc => doc[3] === documentInfo[0]);

    if (documentIndex !== -1) {
      // console.log(documents[documentIndex])
      const date = documents[documentIndex][2];
      // console.log(fourthIndex)
      return date;
    }
    return null; 
  });

  const [documentOptionsModalOpen, setDocumentOptionsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileContents, setFileContents] = useState(null); // State to store file contents
  const [updateDocumentModalOpen, setUpdateDocumentModalOpen] = useState(false);

  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);

  // bookmark a note
  const handleBookmark = (doc) => {
    // console.log(documentInfo)
    // console.log(documentObj)
    if (!bookmarks.includes(documentObj)) {
      dispatch(addBookmark(documentObj));
      notifyBookmark();
    } else {
      notifyExists();
    }
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
    <div className='documentListItem'>
      
      {/* <DocumentOptionsModal
        show={documentOptionsModalOpen}
        selectedDocument={selectedDocument}
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

    <Menu id={documentInfo[0]} style={{
      fontFamily: "var(--font)"
    }}>
      <Item id="rename" onClick={() => setUpdateDocumentModalOpen(true)}>Rename</Item>
      <Item id="save" onClick={() => handleBookmark(selectedDocument)}>Bookmark</Item>
      <Item id="delete" onClick={() => handleRemoveDocument(selectedDocument)}>Delete</Item>
    </Menu>
      
      <div className='documentListTextContainer' onClick={() => navigate('/editor', { state: {documentPath: documentInfo[0], documentContent: fileContents}})}>

          <div className='topicListTitle'>
            <span>{documentInfo[1]}</span>
          </div>

          <div className='documentListRightWrapper'>
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

            <div className='documentDateContainer'>
              {documentCreationDate}
            </div>
          </div>
         
          {/* <div className='documentOptionsMenuContainer' onClick={handleClick}>
            <img src={moreDots} className='moreDots'></img>
          </div> */}
      </div>
      <ToastContainer />

    </div>
  );
};

export default DocumentListItem;