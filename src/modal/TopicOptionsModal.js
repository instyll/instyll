/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { addTag, removeTag } from '../tagSlice';
import UpdateTopicModal from './UpdateTopicModal';
import '../App.css';

const TopicOptionsModal = ({ show, onHide, selectedTopic }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updateTopicModalOpen, setUpdateTopicModalOpen] = useState(false);

    const tags = useSelector((state) => state.tags.tags);

    const [newTag, setNewTag] = useState('');

    const handleNewTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            dispatch(addTag(newTag));
            setNewTag('');
            onHide();
        }
    };

    const handleRemoveTag = (tagItem) => {
        dispatch(removeTag(tagItem));
        onHide();
    }

    const handleClose = () => {
        onHide();
    };

    const handleUpdateTopicModalOpen = (value) => {
        setUpdateTopicModalOpen(value);
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


            <UpdateTopicModal
            show={updateTopicModalOpen}
            selectedTag={selectedTopic}
            onHide={() => {
                setUpdateTopicModalOpen(false)
            }}
            />


            <div className="tagCreationContainer">
                <button onClick={() => handleRemoveTag(selectedTopic)} className='modalDangerButton'>Delete</button>
                <button onClick={() => handleUpdateTopicModalOpen(true)} className='modalActionButton'>Rename</button>
            </div>
        </Modal >
    );
};

export default TopicOptionsModal;
