/**
 * @author wou
 */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TopicOptionsModal from '../../modal/TopicOptionsModal';
import moreDots from '../../icons/menudots.png';
import '../../App.css';

const TopicListItem = ({ tag }) => {

  const [topicOptionsModalOpen, setTopicOptionsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleTopicOptionsModalOpen = (value) => {
    setTopicOptionsModalOpen(true);
  }

  const handleClick = (e) => {
    e.stopPropagation();
    console.log("stopped");
    handleTopicOptionsModalOpen(true);
  }

  return (
    <div className='topicListItem' key={tag} >

      <TopicOptionsModal
        show={topicOptionsModalOpen}
        onHide={() => setTopicOptionsModalOpen(false)}
      />

      <div className='topicListTextContainer' onClick={() => navigate(`/topics/${tag}`)}>
        <div className='topicListTextWrapper'>
          <div className='topicListTitle'>
            <span>{tag}</span>
          </div>
          <div className='topicListInfo'>
            <span>3 Notes</span>
          </div>
          <div className='topicOptionsMenuContainer' onClick={handleClick}>
            <img src={moreDots} className='moreDots'></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicListItem;