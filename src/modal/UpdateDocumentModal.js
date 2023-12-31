// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { updateDocument } from '../documentSlice';
import '../App.css';

const UpdateDocumentModal = ({ show, onHide, selectedDocument, handleClose }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const documents = useSelector((state) => state.documents.documents);

    const [newDocumentTitle, setNewDocumentTitle] = useState('');

    const handleNewDocumentTitleChange = (event) => {
        setNewDocumentTitle(event.target.value);
    };

    const handleEditDocumentTitle = () => {
        const documentToUpdate = selectedDocument;

        if (documentToUpdate) {
            dispatch(updateDocument({ id: documentToUpdate[0], newValue: newDocumentTitle}));
            setNewDocumentTitle('');
            handleClose();
        }
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
                    height: "70px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }
            }}>


            <div className="tagCreationContainer">
                <input
                    type="text"
                    placeholder="Name this note..."
                    value={newDocumentTitle}
                    onChange={handleNewDocumentTitleChange}
                    className="topicCreationInput"
                    autoFocus
                />
                <button onClick={handleEditDocumentTitle} className='modalActionButton'>Rename</button>
            </div>
        </Modal >
    );
};

export default UpdateDocumentModal;