/**
 * @author wou
 */
import React from 'react';
import moreDots from '../icons/more.png';
import '../App.css';

const TopicGridItem = ({ tag, handleTopicSettingsModalOpen }) => {
  return (
    <li className='topicItem' key={tag}>
      <div className="topicTitleContainer">
        <div className='optionObjectLeft'>
          <div className='topicTitle'>
            <h3>{tag}</h3>
          </div>
        </div>
        <div className='optionObjectRight'>
          <div className="moreDots" onClick={handleTopicSettingsModalOpen}>
            <img className="optionsBarIcon" src={moreDots} draggable={false} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default TopicGridItem;
