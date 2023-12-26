/**
 * @author wou
 */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moreDots from '../../icons/more.png';
import '../../App.css';

const DocumentGridItem = ({ documentInfo }) => {

  const navigate = useNavigate();

  return (
    <div className='documentItem' key={documentInfo[0]}>
      <div className='topicTextContainer'>
        <div className='topicTextWrapper'>
          <div className='topicTitle'>
            <span>{documentInfo[1]}</span>
          </div>
          <div className='topicInfo'>
            <span>{documentInfo[2]}</span>
          </div>
      </div>
      </div>
    </div>
  );
};

export default DocumentGridItem;
