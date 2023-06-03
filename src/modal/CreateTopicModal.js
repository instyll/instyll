// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { addTag } from '../tagSlice';
import '../App.css';

const CreateTopicModal = ({ show, onHide, tocOpen, selectedTags, onSelectTags, onAddTags }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            handleAddTag();
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
                    placeholder="New Topic"
                    value={newTag}
                    onChange={handleNewTagChange}
                    onKeyPress={handleKeyPress}
                    className="topicCreationInput"
                />
                <button onClick={handleAddTag} className='modalActionButton'>Create</button>
            </div>
        </Modal >
    );
};

export default CreateTopicModal;
