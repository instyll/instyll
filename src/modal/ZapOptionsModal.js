/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { addZap, removeZap } from '../zapSlice';
import UpdateZapModal from './UpdateZapModal';
import '../App.css';

const ZapOptionsModal = ({ show, onHide, selectedZap }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updateZapModalOpen, setUpdateZapModalOpen] = useState(false);

    const zaps = useSelector((state) => state.zaps.zaps);

    const [newZap, setNewZap] = useState('');

    const handleRemoveZap = (zapItem) => {
        dispatch(removeZap(zapItem));
        onHide();
    }

    const handleClose = () => {
        onHide();
    };

    const handleUpdateZapModalOpen = (value) => {
        setUpdateZapModalOpen(value);
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
                    width: "140px",
                    height: "104px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }
            }}>


            <UpdateZapModal
            show={updateZapModalOpen}
            selectedZap={selectedZap}
            handleClose={handleClose}
            onHide={() => {
                setUpdateZapModalOpen(false)
            }}
            />


            <div className="tagCreationContainer">
                <button onClick={() => handleRemoveZap(selectedZap)} className='modalDangerButton'>Delete</button>
                <button onClick={() => handleUpdateZapModalOpen(true)} className='modalActionButton'>Rename</button>
            </div>
        </Modal >
    );
};

export default ZapOptionsModal;
