/**
 * @author wou
 */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moreDots from '../../icons/menudots.png';
import '../../App.css';

const TopicGridItem = ({ tag }) => {

  const navigate = useNavigate();

  return (
    <div className='topicItem' key={tag} onClick={() => navigate(`/topics/${tag}`)}>
      <div className='topicTextContainer'>
        <div className='topicTextWrapper'>
          <div className='topicTitle'>
            <span>{tag}</span>
          </div>
          <div className='topicInfo'>
            <span>3 Notes</span>
          </div>
          <div className='topicOptionsMenuContainer'>
            <img src={moreDots} className='moreDots'></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicGridItem;
