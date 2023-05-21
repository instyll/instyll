import React, { useState } from 'react';
import "../App.css";

function OutlineContainer({ tocHeaders, rightPanelOpen }) {
  const [lastClickedHeader, setLastClickedHeader] = useState(null);

  const handleHeaderClick = (header) => {
    setLastClickedHeader(header);
  };

  return (
    <div>
      {rightPanelOpen && (
        <div className='outlineContainer'>
          {tocHeaders.map((header, index) => (
            <div
              key={index}
              className={`outlineElement ${lastClickedHeader === header ? 'lastClickedHeader' : ''}`}
              style={{
                paddingLeft:
                  header.type === 'H2' ? '20px' :
                  header.type === 'H3' ? '40px' :
                  header.type === 'H4' ? '60px' :
                  header.type === 'H5' ? '80px' :
                  header.type === 'H6' ? '100px' : '5px',
              }}
            >
              <a
                href={`#${header.id}`}
                className="headerNav"
                onClick={() => handleHeaderClick(header)}
              >
                {header.text}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OutlineContainer;
