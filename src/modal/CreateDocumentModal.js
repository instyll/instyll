import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { addTag } from '../tagSlice';
import '../App.css';

const DocumentModal = ({ show, onHide, tocOpen, selectedTags, onSelectTags, onAddTags }) => {

   
    const handleAddTags = () => {
        onAddTags();
        onHide();
    };

    const handleClose = () => {
        onHide();
    };

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
                height: "140px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }
        }}>

            <div className='createDocumentFromTemplateContainer'>
                
            </div>

            <div className='createDocumentTitleContainer'>
                <input className='createDocumentTitleInput' autoFocus placeholder='Name this note...'>

                </input>
            </div>
          
            <div className="modalActionContainer">
                <button onClick={handleClose} className='modalDefaultButton'>Cancel</button>
                <button onClick={handleAddTags} className='modalActionButton'>Create</button>
            </div>
        </Modal >
    );
};

export default DocumentModal;
