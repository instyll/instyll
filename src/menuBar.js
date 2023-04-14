import React from 'react';
import './App.css';
// Assets
import add from './icons/add_component.png'
import settings from './icons/settings.png'
import palette from './icons/palette.png'
import code from './icons/code.png'
import image from './icons/image.png'
import table from './icons/table.png'
import link from './icons/link.png'
import tcontents from './icons/tcontents.png'
import calendar from './icons/calendar.png'
import focus from './icons/focus.png'
import focusFilled from './icons/focus-filled.png'
import nodes from './icons/nodes.png'
import star from './icons/star.png'
import logo from './icons/keylight3.png'
import search from './icons/search.png'

function MenuBar(props) {
  return (
    <div className="menuBar">
      {/* <div className="menuIcon"
        onClick={props.handleToc}>
        <img src={tcontents} className="icon" id="firstIcon" draggable={false} />
        <span className="tooltip">Outline</span>
      </div> */}
      {/* <div className="menuIcon" onClick={() => props.setModalOpen(true)}>
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
      </div> */}
      {/* <div className="searchContainer"> */}
      <div className="menuIconLogo"
          onClick={props.toggleTheme}>
          <img src={logo} className="icon" draggable={false} />
        </div>
        <div className='searchWrapper'>
      <img src={search} className="searchIcon" draggable={false}></img>
      </div>
      <input className="search" placeholder="Search anything">
      </input>
      <button className="menuAddOptionButton"><span className="addSymbol">＋</span>&nbsp;&nbsp;New</button>
      {/* </div> */}

      {/* <span className="rightComponents"> */}
        {/* <div className="menuIcon"
          onClick={props.toggleFocus}>
          {props.focused ? (
            <img src={focusFilled} className="icon" id="focus" draggable={false} />
          ) : (
            <img src={focus} className="icon" id="focus" draggable={false} />
          )}
        </div> */}
        {/* <button className="menuAddOptionButton">New</button> */}
        {/* <div className="menuIcon"
          onClick={props.toggleTheme}>
          <img src={star} className="icon" draggable={false} />
        </div> */}
        {/* <div className="menuIcon"
          onClick={props.toggleTheme}>
          <img src={palette} className="icon" draggable={false} />
        </div>
        <div className="menuIcon"
          onClick={props.toggleTheme}>
          <img src={nodes} className="icon" draggable={false} />
        </div>
        <div className="menuIcon">
          <img src={settings} className="icon" draggable={false} />
        </div> */}
      {/* </span> */}
    </div>
  );
}

export default React.memo(MenuBar);