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

    return (
        <Modal isOpen={show} onRequestClose={onHide} style={{
            overlay: {
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: "999",
            },
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
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal >
  );
};

export default TopicModal;
