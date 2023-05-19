// import { prosePluginsCtx } from '@milkdown/core';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';

const TopicModal = ({ show, onHide, tocOpen, selectedTags, onSelectTags, onAddTags }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tags, setTags] = useState([
        'math',
        'physics',
        'marketing',
        'english',
        'daily notes',
        'projects',
    ]);
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
            const updatedTags = [...tags, newTag];
            setTags(updatedTags);
            onSelectTags(updatedTags);
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
        <Modal isOpen={show} onRequestClose={onHide} style={{
            overlay: {
                backgroundColor: "transparent",
                zIndex: "999",
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
                marginLeft: tocOpen ? "290px" : "175px",
                marginTop: "100px",
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
                    placeholder="New Tag"
                    value={newTag}
                    onChange={handleNewTagChange}
                    className="topicCreationInput"
                />
                <button onClick={handleAddTag} className='modalDefaultButton'>Add Tag</button>
            </div>
            <div className="modalActionContainer">
                <button onClick={handleClose} className='modalDefaultButton'>Close</button>
                <button onClick={handleAddTags} className='modalActionButton'>Add</button>
            </div>
        </Modal >
    );
};

export default TopicModal;
