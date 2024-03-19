/**
 * @author wou
 */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import '../../App.css';
import { addBookmark } from '../../bookmarkSlice';
import { removeDocument } from '../../documentSlice';
import UpdateDocumentModal from './UpdateDocumentModal';

const DocumentOptionsModal = ({ show, onHide, selectedDocument, documentPath, ovRef, documentObj }) => {

    const dispatch = useDispatch();

    const notify = () => toast("Note Bookmarked!");

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updateDocumentModalOpen, setUpdateDocumentModalOpen] = useState(false);

    const documents = useSelector((state) => state.documents.documents);

    const handleRemoveDocument = (documentItem) => {
        dispatch(removeDocument(documentItem));
        onHide();
    }

    const handleBookmark = (documentItem) => {
        console.log(documentItem)
        dispatch(addBookmark(documentObj));
        notify();
    }

    const handleClose = () => {
        onHide();
    };

    const handleUpdateDocumentModalOpen = (value) => {
        console.log(documents)
        console.log(documentPath)
        setUpdateDocumentModalOpen(value);
    }

    console.log(ovRef)

    return (
        <Modal isOpen={show}
            onRequestClose={onHide}
            contentRef={node => (ovRef = node)}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    zIndex: "999",
                    // backdropFilter: "blur(8px)",
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
                    width: "140px",
                    height: "fit-content",
                    marginTop: "32px",
                    // position: "absolute",
                    // top: "50%",
                    // left: "50%",
                    // transform: "translate(-50%, -50%)",
                }
            }}>
          <ToastContainer />

            <UpdateDocumentModal
            show={updateDocumentModalOpen}
            selectedDocument={selectedDocument}
            documentPath={documentPath}
            handleClose={handleClose}
            onHide={() => {
                setUpdateDocumentModalOpen(false)
            }}
            />


            <div className="tagCreationContainer">
                <button onClick={() => handleRemoveDocument(selectedDocument)} className='modalDangerButton'>Delete</button>
                <button onClick={() => handleUpdateDocumentModalOpen(true)} className='modalActionButton'>Rename</button>
                <button onClick={() => handleBookmark(selectedDocument)} className='modalActionButton' id="bookmark">Bookmark</button>
            </div>
        </Modal >
    );
};

export default DocumentOptionsModal;
