import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import path from 'path';
// import { executeQuery } from '../db.js'; // You need to create a file for database operations
import { addDocument, removeDocument, reset } from '../documentSlice.js';
import { uuid } from 'uuidv4';
import Modal from 'react-modal';
import parseAndFormatDate from '../DateUtils.js';
import { executeFileCreation } from '../actions.js';
import '../App.css';

const DocumentModal = ({ show, onHide, onAddTags }) => {

    const handleClose = () => {
        onHide();
    };

    const navigate = useNavigate();

    const [documentTitle, setDocumentTitle] = useState("");

    const userId = useSelector((state) => state.user.selectedUserId)

    const dispatch = useDispatch();
    const documents = useSelector((state) => state.documents.documents)
    const documentsPath = useSelector((state) => state.path.path)

    const handleDocumentCreation = async () => {
        console.log(documentTitle)
        const date = new Date();
        const parsedDate = parseAndFormatDate(date.toString());
        const filePath = path.join(documentsPath, `${documentTitle}.md`);
        dispatch(addDocument([uuid(), documentTitle, parsedDate, filePath, []])) // empty topics array
        executeFileCreation({documentTitle: documentTitle})
        console.log(documents)
        // open the markdown note corresponds to the documentID and close the modal
        navigate('/editor', { state: { documentPath: filePath, documentContent: '# ' + documentTitle }})
        onHide();
    }

    const temp = () => {
        console.log(documents)
        dispatch(removeDocument(0))
        console.log("ok")
    }

    return (
        <Modal isOpen={show} 
        onRequestClose={onHide} 
        style={{
            overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                zIndex: "999",
                backdropFilter: "blur(8px)",
            },
            content: {
                backgroundColor: "var(--elevated-bg)",
                color: "var(--primary-text)",
                fontFamily: "Inter",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",
                border: "0px none",
                fontSize: "1em",
                boxSizing: "border-box",
                width: "400px",
                // height: "calc(100% - 190px)",
                height: "110px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }
        }}>

            <div className='createDocumentFromTemplateContainer'>
                
            </div>

            <div className='createDocumentTitleContainer'>
                <input className='createDocumentTitleInput' 
                autoFocus placeholder='Name this note...' 
                onChange={(e) => setDocumentTitle(e.target.value)}>
                </input>
            </div>
          
            <div className="modalActionContainer">
                <button onClick={handleClose} className='modalDefaultButton'>Cancel</button>
                <button className='modalActionButton' onClick={handleDocumentCreation}>Create</button>
            </div>
        </Modal >
    );
};

export default DocumentModal;
