// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { addTag } from '../tagSlice';
import '../App.css';

const TopicModal = ({ show, onHide, tocOpen, selectedTags, onSelectTags, onAddTags }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const tags = useSelector((state) => state.tags.tags);

    const [newTag, setNewTag] = useState('');

    const handleTagSelect = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((selectedTag) => selectedTag !== tag)
            : [...selectedTags, tag];

        onSelectTags(updatedTags);
    };

    const handleNewTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            dispatch(addTag(newTag));
            onSelectTags([newTag]); // Clear the selected tags and select the new tag only
            setNewTag('');
        }
    };

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
        parentSelector={() => document.querySelector('.optionsContainer')}
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
                height: "400px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }
        }}>

            <ul className="tagsList">
                {tags.map((tag) => (
                    <li
                        key={tag}
                        className={selectedTags.includes(tag) ? 'selected' : ''}
                        onClick={() => handleTagSelect(tag)}
                    >
                        {tag}
                    </li>
                ))}
            </ul>
            <div className="tagCreationContainer">
                <input
                    type="text"
                    placeholder="New Topic"
                    value={newTag}
                    onChange={handleNewTagChange}
                    className="topicCreationInput"
                />
                <button onClick={handleAddTag} className='modalDefaultButton'>Create</button>
            </div>
            <div className="modalActionContainer">
                <button onClick={handleClose} className='modalDefaultButton'>Close</button>
                <button onClick={handleAddTags} className='modalActionButton'>Add</button>
            </div>
        </Modal >
    );
};

export default TopicModal;
