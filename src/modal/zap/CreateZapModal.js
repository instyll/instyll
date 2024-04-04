// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { addZap } from '../../zapSlice';

const CreateZapModal = ({ show, onHide, tocOpen, selectedTags, onSelectTags, onAddTags }) => {

    const dispatch = useDispatch();

    const zaps = useSelector((state) => state.zaps.zaps);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [newZap, setNewZap] = useState('');

    const handleNewZapChange = (event) => {
        setNewZap(event.target.value);
    };

    const handleAddZap = () => {
        if (newZap && !zaps.includes(newZap)) {
            dispatch(addZap(newZap));
            setNewZap('');
            onHide();
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            handleAddZap();
        }
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
                    placeholder="New Zap"
                    value={newZap}
                    onChange={handleNewZapChange}
                    onKeyPress={handleKeyPress}
                    className="topicCreationInput"
                    autoFocus
                />
                <button onClick={handleAddZap} className='modalActionButton'>Create</button>
            </div>
        </Modal >
    );
};

export default CreateZapModal;
