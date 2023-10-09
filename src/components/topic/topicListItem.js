/**
 * @author wou
 */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moreDots from '../../icons/more.png';
import '../../App.css';

const TopicListItem = ({ tag }) => {

  const navigate = useNavigate();

  return (
    <div className='topicListItem' key={tag} onClick={() => navigate(`/topics/${tag}`)}>
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