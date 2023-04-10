import React from 'react';
import './App.css';
// Assets
import add from './add_component.png'
import settings from './settings.png'
import palette from './palette.png'
import code from './code.png'
import image from './image.png'
import table from './table.png'
import link from './link.png'
import tcontents from './tcontents.png'
import calendar from './calendar.png'
import tabplus from './tabplus.png'
import focus from './focus.png'
import focusFilled from './focus-filled.png'

function MenuBar(props) {
  return (
    <div className="menuBar">
      <div className="menuIcon"
        onClick={props.handleToc}>
        <img src={tcontents} className="icon" draggable={false} />
        <span className="tooltip">Outline</span>
      </div>
      <div className="menuIcon" onClick={() => props.setModalOpen(true)}>
        <img src={add} className="icon" draggable={false} />
        <span className="tooltip">Add Component</span>
      </div>
      <div className="menuIcon">
        <img src={image} className="icon" draggable={false} />
        <span className="tooltip">Insert Image</span>
      </div>
      <div className="menuIcon">
        <img src={code} className="icon" draggable={false} />
        <span className="tooltip">Insert Code Block</span>
      </div>
      <div className="menuIcon">
        <img src={calendar} className="icon" draggable={false} />
        <span className="tooltip">Daily Note</span>
      </div>
      <div className="menuIcon">
        <img src={table} className="icon" draggable={false} />
        <span className="tooltip">Insert Table</span>
      </div>
      <div className="menuIcon">
        <img src={link} className="icon" draggable={false} />
        <span className="tooltip">Insert Link</span>
      </div>
      <input className="search" placeholder="Search">
      </input>

      <span className="rightComponents">
        <div className="menuIcon"
          onClick={props.toggleFocus}>
          {props.focused ? (
            <img src={focusFilled} className="icon" id="focus" draggable={false} />
          ) : (
            <img src={focus} className="icon" id="focus" draggable={false} />
          )}
        </div>
        <div className="menuIcon"
          onClick={props.toggleTheme}>
          <img src={palette} className="icon" draggable={false} />
        </div>
        <div className="menuIcon">
          <img src={settings} className="icon" draggable={false} />
        </div>
      </span>
    </div>
  );
}

export default React.memo(MenuBar);