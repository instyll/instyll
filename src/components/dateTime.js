/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Tooltip } from 'react-tooltip';

const DateTime = ({createDailyNote}) => {
  const [currentDate, setCurrentDate] = useState('Loading...');
  const [currentTime, setCurrentTime] = useState('Loading...');

  /* formats current date into readable string */
  useEffect(() => {
    const intervalID = setInterval(() => {
      const dateObj = new Date();

      const formattedDate = dateObj.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const formattedTime = dateObj.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
      });

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    // <div className="dateTime">
     <span>
        <Tooltip id='dateTooltip' className='labelTooltip'></Tooltip>
        <h1 className="heroTitle" id="greetingDate" onClick={createDailyNote} data-tooltip-id='dateTooltip' data-tooltip-content='Create Daily Note'>{currentDate}</h1>
      </span>
    // </div>
  );
};

export default DateTime;
