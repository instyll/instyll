import React from 'react';
import '../App.css';
// Assets
import logo from '../icons/keylight3.png'
import search from '../icons/search.png'
import create from '../icons/create.png'
import back from '../icons/arrowback.png';
import forward from '../icons/arrowforward.png';

function MenuBar(props) {
  return (
    <div className="menuBar">
      {/* <div className="logo"
          onClick={props.toggleTheme}>
          <img src={logo} className="icon" draggable={false} />
        </div> */}
        <div className="menuIconLogo">
          <img src={back} className="icon" id="navLeft" draggable={false}></img>
        </div>
        <div className="menuIconLogo">
          <img src={forward} className="icon" id="navRight" draggable={false}></img>
        </div>
        <div className='searchWrapper'>
      <img src={search} className="searchIcon" draggable={false}></img>
      </div>
      <input className="search" placeholder="Search your notes">
      </input>
      <button className="menuAddOptionButton">
        <img src={create} className="buttonIcon" draggable={false}></img>
        <span className="buttonText">Create</span></button>
    </div>
  );
}

export default React.memo(MenuBar);