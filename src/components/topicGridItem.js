/**
 * @author wou
 */
import React from 'react';
import moreDots from '../icons/more.png';
import '../App.css';

const TopicGridItem = ({ tag }) => {
  return (
    <li className='topicItem' key={tag}>
      <div className="topicTitleContainer">
        <div className='optionObjectLeft'>
          <div className='topicTitle'>
            <span>{tag}</span>
          </div>
        </div>
        <div className='optionObjectRight'>
        </div>
      </div>
    </li>
  );
};

export default TopicGridItem;
