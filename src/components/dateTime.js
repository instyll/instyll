import React, { useState, useEffect } from 'react';

const DateTime = () => {
  const [currentDate, setCurrentDate] = useState('Loading...');
  const [currentTime, setCurrentTime] = useState('Loading...');

  useEffect(() => {
    const intervalID = setInterval(() => {
      const dateObj = new Date();

      const formattedDate = dateObj.toLocaleDateString(undefined, {
        weekday: 'long',
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
    <div className="dateTime">
      <div className='timeContainer'>
      <span className="greetingTime">{currentTime}</span>
      </div>
      <div className='dateContainer'>
      <span className="greetingDate">{currentDate}</span>
      </div>
    </div>
  );
};

export default DateTime;
