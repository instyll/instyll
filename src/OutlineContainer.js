import React from 'react';
import "./App.css";

function OutlineContainer({ tocHeaders }) {
  return (
    <div className='outlineContainer'>
      <div>
        {tocHeaders.map((header, index) => (
          <div
            key={index}
            className="outlineElement"
            style={{
              paddingLeft:
                header.type === 'H2' ? '20px' :
                header.type === 'H3' ? '40px' :
                header.type === 'H4' ? '60px' :
                header.type === 'H5' ? '80px' :
                header.type === 'H6' ? '100px' : '5px',
            }}
          >
            <a href={`#${header.id}`} className="headerNav">
              {header.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OutlineContainer;