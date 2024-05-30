/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Tooltip } from 'react-tooltip';

import monday from '../icons/calendar/monday.png';
import tuesday from '../icons/calendar/tuesday.png';
import wednesday from '../icons/calendar/wednesday.png';
import thursday from '../icons/calendar/thursday.png';
import friday from '../icons/calendar/friday.png';
import saturday from '../icons/calendar/saturday.png';
import sunday from '../icons/calendar/sunday.png';

const DateTime = ({createDailyNote}) => {
  const [currentDate, setCurrentDate] = useState('Loading...');
  const [currentTime, setCurrentTime] = useState('Loading...');
  const [currentDay, setCurrentDay] = useState(null);

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

      setCurrentDay(dateObj.getDay());
      // console.log(currentDay)
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
        <button className="dateButton" id="greetingDate" onClick={createDailyNote} data-tooltip-id='dateTooltip' data-tooltip-content='Create Daily Note'>
          <img src={currentDay === 1 ? monday : currentDay === 2 ? tuesday : currentDay === 3 ? wednesday : currentDay === 4 ? thursday : currentDay === 5 ? friday : currentDay === 6 ? saturday : currentDay === 0 ? sunday : ''} className='buttonIcon'/> 
          {currentDate}</button>
      </span>
    // </div>
  );
};

export default DateTime;
