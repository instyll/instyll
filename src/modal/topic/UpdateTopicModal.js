// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { updateTag } from '../../tagSlice';
import {addTags, removeTag} from '../../documentSlice';

const UpdateTopicModal = ({ show, onHide, selectedTag, handleClose }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const tags = useSelector((state) => state.tags.tags);
    const documents = useSelector((state) => state.documents.documents);

    const [newTag, setNewTag] = useState('');

    const handleNewTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleEditTag = () => {
        const tagToUpdate = selectedTag;
        const updated = newTag;
        console.log(tagToUpdate)
        console.log(newTag)
        if (tagToUpdate) {
            dispatch(updateTag({ id: tagToUpdate, newValue: newTag}));
            setNewTag('');
            // update all documents containing the original tag with the updated tag
            for (const documentObj of documents) {
                // if the original tag is found in the note, remove the original tag, and add the new tag
                const documentPath = documentObj[3];
                if (documentObj[4].includes(tagToUpdate)) {
                    const removeRequestObj = [documentPath, tagToUpdate];
                    dispatch(removeTag(removeRequestObj));
                    const updateRequestObj = [documentPath, [updated]];
                    dispatch(addTags(updateRequestObj));
                }
            }
            onHide();
            handleClose();
        }
    }

    const handleEnterEditTag = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleEditTag();
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
                    placeholder="New Topic"
                    defaultValue={selectedTag}
                    onChange={handleNewTagChange}
                    className="topicCreationInput"
                    autoFocus
                    onKeyDown={handleEnterEditTag}
                />
                <button onClick={handleEditTag} className='modalActionButton'>Rename</button>
            </div>
        </Modal >
    );
};

export default UpdateTopicModal;
