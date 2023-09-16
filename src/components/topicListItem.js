/**
 * @author wou
 */
import React from 'react';
import moreDots from '../icons/more.png';
import '../App.css';

const TopicListItem = ({ tag }) => {
  return (
    <div className='topicListItem' key={tag}>
      <div className='topicListTextContainer'>
        <div className='topicListTextWrapper'>
          <div className='topicListTitle'>
            <span>{tag}</span>
          </div>
          <div className='topicListInfo'>
            <span>3 Notes</span> 
          </div>
      </div>
      </div>
    </div>
  );
};

export default TopicListItem;