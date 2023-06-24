/**
 * @author wou
 */
import React from 'react';
import moreDots from '../icons/more.png';
import '../App.css';

const TopicGridItem = ({ tag }) => {
  return (
    <li className='topicItem' key={tag}>
      <div className='topicTextContainer'>
        <div className='topicTextWrapper'>
          <div className='topicTitle'>
            <span>{tag}</span>
          </div>
          <div className='topicInfo'>
            <span>3 Notes</span>
          </div>
      </div>
      </div>
    </li>
  );
};

export default TopicGridItem;
