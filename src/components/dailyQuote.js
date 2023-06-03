import React from 'react';
import { QUOTE1, QUOTE2, QUOTE3, QUOTE4 } from '../quotes.ts';

function DailyQuote() {
  // Generate a random index to select a quote
  const randomIndex = Math.floor(Math.random() * 4); // Assuming you have 4 quotes

  // Select the quote based on the random index
  const selectedQuote = [QUOTE1, QUOTE2, QUOTE3, QUOTE4][randomIndex];

  return (
    <div className='dailyQuoteContainer'>
      <div className='dailyQuote'>
      <p className='quoteText'>{selectedQuote[0]}</p>
      <p className='quoteAuthor'>- {selectedQuote[1]}</p>
      </div>
    </div>
  );
}

export default DailyQuote;
