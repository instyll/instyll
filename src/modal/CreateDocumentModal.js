import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { executeQuery } from '../db.js'; // You need to create a file for database operations
import Modal from 'react-modal';
import '../App.css';

const DocumentModal = ({ show, onHide, onAddTags }) => {

    const handleClose = () => {
        onHide();
    };

    const [documentTitle, setDocumentTitle] = useState("");

    const dispatch = useDispatch();

    const userId = useSelector((state) => state.userId)

    const handleDocumentCreation = async () => {
        console.log(documentTitle)
        const query = `INSERT INTO Documents (Title, Content, UserID) VALUES ('${documentTitle}', '', '${userId}');`
        executeQuery(query)
        // open the markdown note corresponds to the documentID and close the modal
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
