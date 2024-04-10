// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { updateTag } from '../../tagSlice';

const UpdateTopicModal = ({ show, onHide, selectedTag, handleClose }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const tags = useSelector((state) => state.tags.tags);

    const [newTag, setNewTag] = useState('');

    const handleNewTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleEditTag = () => {
        const tagToUpdate = selectedTag;
        console.log(tagToUpdate)
        console.log(newTag)
        if (tagToUpdate) {
            dispatch(updateTag({ id: tagToUpdate, newValue: newTag}));
            setNewTag('');
            onHide();
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
                    placeholder="New Topic"
                    defaultValue={selectedTag}
                    onChange={handleNewTagChange}
                    className="topicCreationInput"
                    autoFocus
                />
                <button onClick={handleEditTag} className='modalActionButton'>Rename</button>
            </div>
        </Modal >
    );
};

export default UpdateTopicModal;
