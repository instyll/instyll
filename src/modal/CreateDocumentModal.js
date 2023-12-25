import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { executeQuery } from '../db.js'; // You need to create a file for database operations
import { addDocument, removeDocument } from '../documentSlice.js';
import Modal from 'react-modal';
import '../App.css';

const DocumentModal = ({ show, onHide, onAddTags }) => {

    const handleClose = () => {
        onHide();
    };

    const [documentTitle, setDocumentTitle] = useState("");

    const userId = useSelector((state) => state.user.selectedUserId)

    const dispatch = useDispatch();
    const documents = useSelector((state) => state.documents.documents)

    const handleDocumentCreation = async () => {
        console.log(documentTitle)
        const query = `INSERT INTO Documents (Title, Content, UserID) VALUES ('${documentTitle}', '', '${userId}');`
        executeQuery(query)
        // add document identifier to redux
        const getDocumentInfo = `SELECT * FROM Documents where Title = '${documentTitle}' AND UserID = '${userId}'`
        const documentQueryObject = await executeQuery(getDocumentInfo)
        console.log(documentQueryObject)
        const documentCreationDate = documentQueryObject[0].DateCreated.toString()
        console.log(documentCreationDate)
        const documentId = documentQueryObject[0].DocumentID
        console.log(documents)
        
        dispatch(addDocument([documentId, documentTitle, documentCreationDate]))
        // open the markdown note corresponds to the documentID and close the modal
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
