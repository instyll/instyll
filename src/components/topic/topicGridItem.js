/**
 * @author wou
 */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TopicOptionsModal from '../../modal/TopicOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';
import { useSelector } from 'react-redux';

const TopicGridItem = ({ tag }) => {

  const [topicOptionsModalOpen, setTopicOptionsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const navigate = useNavigate();

  const containedNotes = useSelector((state) => {
    const documents = state.documents.documents;
    const filtered = documents.filter((document) => {
        return document[4] && document[4].includes(tag);
    })
    return filtered;
  })

  const handleTopicOptionsModalOpen = (value) => {
    setTopicOptionsModalOpen(true);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    console.log("stopped");
    handleTopicOptionsModalOpen(true);
    setSelectedTopic(tag);
    // console.log(selectedTopic);
  }

  return (
    <div className='topicItem' key={tag}>

      <TopicOptionsModal
        show={topicOptionsModalOpen}
        selectedTopic={selectedTopic}
        onHide={() => setTopicOptionsModalOpen(false)}
      />

      <div className='topicTextContainer' onClick={() => navigate(`/topics/${tag}`)}>
        <div className='topicTextWrapper'>
          <div className='topicTitle'>
            <span>{tag}</span>
          </div>
          <div className='topicInfo'>
            {containedNotes.length == 1 && <span>{containedNotes.length} Note</span>}
            {containedNotes.length > 1 && <span>{containedNotes.length} Notes</span>}
          </div>
          <div className='topicOptionsMenuContainer' onClick={handleClick}>
            <img src={moreDots} className='moreDots'></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicGridItem;
