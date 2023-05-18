import React, { useState } from 'react';
import Modal from 'react-modal';

const TopicModal = ({ show, onHide }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    const handleTagSelect = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleNewTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setSelectedTags([...selectedTags, newTag]);
            setNewTag('');
        }
    };

    const handleClose = () => {
        onHide();
    }

    return (
        <Modal isOpen={show} onRequestClose={onHide} style={{
            overlay: {
                backgroundColor: "transparent",
                zIndex: "999",
                // backdropFilter: "blur(8px)",
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
                marginLeft: "290px",
                marginTop: "100px",
                // top: "50%",
                // left: "50%",
                // transform: "translate(-50%, -50%)",
            }
        }}>
            <h2>Select Tags</h2>
            <ul className="tags">
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
            <div className="new-tag">
                <input
                    type="text"
                    placeholder="New Tag"
                    value={newTag}
                    onChange={handleNewTagChange}
                />
                <button onClick={handleAddTag}>Add Tag</button>
            </div>
            <button onClick={handleClose}>Close</button>
        </Modal >
    );
};

export default TopicModal;
