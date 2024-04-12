// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { updateZap } from '../../zapSlice';

const UpdateZapModal = ({ show, onHide, selectedZap, handleClose }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const zaps = useSelector((state) => state.zaps.zaps);

    const [newZap, setNewZap] = useState('');

    const handleNewZapChange = (event) => {
        setNewZap(event.target.value);
    };

    const handleEditZap = () => {
        const zapToUpdate = selectedZap;
        // console.log(zapToUpdate)
        // console.log(newZap)
        if (zapToUpdate) {
            dispatch(updateZap({ id: zapToUpdate, newValue: newZap}));
            setNewZap('');
            handleClose();
        }
    }

    const handleEnterEditZap = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleEditZap();
            onHide();
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
                    placeholder="New Zap"
                    defaultValue={selectedZap}
                    onChange={handleNewZapChange}
                    className="topicCreationInput"
                    autoFocus
                    onKeyDown={handleEnterEditZap}
                />
                <button onClick={handleEditZap} className='modalActionButton'>Rename</button>
            </div>
        </Modal >
    );
};

export default UpdateZapModal;
