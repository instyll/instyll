/**
 * @author wou
 */
import React, { useState } from 'react';
import ScrollToHashElement from './editor/ScrollToHashElement';
import { Link } from 'react-router-dom';
import "../App.css";

function OutlineContainer({ tocHeaders, rightPanelOpen }) {
  const [lastClickedHeader, setLastClickedHeader] = useState(null);

  /* highlight last clicked header */
  const handleHeaderClick = (header) => {
    setLastClickedHeader(header);
  };

  return (
    <div>
      {rightPanelOpen && (
        <div className='outlineContainer'>
          <p className="paneTitle">Outline</p>
          <div className='outlineWrapper'>
          {tocHeaders.map((header, index) => (
            <div
              key={index}
              className={`outlineElement`}
              style={{
                paddingLeft:
                  header.type === 'H2' ? '20px' :
                  header.type === 'H3' ? '40px' :
                  header.type === 'H4' ? '60px' :
                  header.type === 'H5' ? '80px' :
                  header.type === 'H6' ? '100px' : '5px',
              }}
            >
              <button className={`headerNav ${lastClickedHeader === header ? 'lastClickedHeader' : ''}`} onClick={() => {
                document.getElementById(`${header.id}`).scrollIntoView();
                setLastClickedHeader(header)
                }}>
                {header.text}
              </button>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OutlineContainer;
