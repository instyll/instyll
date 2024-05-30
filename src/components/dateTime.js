/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Tooltip } from 'react-tooltip';
import { Calendar } from 'lucide-react';

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
          <Calendar size={20} color='var(--bg-color)' className='tocIcon'/>
          <span className='tocInnerText'>{currentDate}</span></button>
      </span>
    // </div>
  );
};

export default DateTime;
