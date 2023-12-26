/**
 * @author wou
 */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moreDots from '../../icons/menudots.png';
import '../../App.css';

const DocumentListItem = ({ documentInfo }) => {

  const navigate = useNavigate();

  return (
    <div className='topicListItem' key={documentInfo[0]} onClick={() => navigate(`/topics/${tag}`)}>
      <div className='topicListTextContainer'>
        <div className='topicListTextWrapper'>
          <div className='topicListTitle'>
            <span>{documentInfo[1]}</span>
          </div>
          <div className='topicListInfo'>
            <span>{documentInfo[2]}</span> 
          </div>
          <div className='topicOptionsMenuContainer' >
            <img src={moreDots} className='moreDots'></img>
          </div>
      </div>
      </div>
    </div>
  );
};

export default DocumentListItem;