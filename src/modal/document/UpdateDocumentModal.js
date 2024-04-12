// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { updateDocument } from '../../documentSlice';
import { useNavigate } from 'react-router-dom';

const UpdateDocumentModal = ({ show, onHide, selectedDocument, documentPath, handleClose }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const originPath = useSelector((state) => state.path.path);

    const [newDocumentTitle, setNewDocumentTitle] = useState('');

    const handleNewDocumentTitleChange = (event) => {
        setNewDocumentTitle(event.target.value);
    };

    // console.log(selectedDocument)

    const handleEditDocumentTitle = () => {
        const documentToUpdate = selectedDocument;

        if (documentToUpdate) {
            dispatch(updateDocument([documentPath, originPath, newDocumentTitle]));
            setNewDocumentTitle('');
            navigate('/documents')
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
                    placeholder={selectedDocument ? selectedDocument[1] : ''}
                    defaultValue={selectedDocument ? selectedDocument[1] : ''}
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
