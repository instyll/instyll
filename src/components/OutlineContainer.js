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
              {/* <a
                href={`#${header.id}`}
                className="headerNav"
                onClick={() => handleHeaderClick(header)}
              >
                {header.text}
              </a> */}
              {/* <ScrollToHashElement />
              <Link to={`#${header.id}`} className='headerNav'>
              {header.text}
              </Link> */}
              <button className='headerNav' onClick={() => document.getElementById(`${header.id}`).scrollIntoView()}>
                {header.text}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OutlineContainer;
