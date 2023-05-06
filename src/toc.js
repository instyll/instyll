import React, { useState, useEffect } from 'react';
import './App.css';
import randomColor from 'randomcolor';

// assets
import tags from './icons/tag2.png';
import home from './icons/home.png';
import recent from './icons/recent.png';
import template from './icons/template2.png';
import favorites from './icons/bookmark2.png';
import note from './icons/note2.png';
import trash from './icons/trash.png';
import calendar from './icons/calendar.png';
import help from './icons/help.png';
import feedback from './icons/feedback.png';
import banner from './icons/key500.png';
import closeTOC from './icons/doubleleft.png';
import settings from './icons/settings.png';
import cmd from './icons/cmd.png';

function TableOfContents(props) {

  function toggleTheme() {
    const toggleSwitch = document.querySelector('.toggleSwitch');
    toggleSwitch.addEventListener('change', (event) => {
      const isChecked = event.target.checked;
      props.handleTheme(isChecked);
    });
  }

  useEffect(() => {
    toggleTheme();
  }, []);


  return (
    <div className="tableOfContents">
      <div className="tableInfo">

        <div className="tocBanner">
          <img src={banner} className="tocBannerIcon"></img>
          <span className="tocBannerTextLeft">in<span className="tocBannerTextRight">styll</span></span>
          <img src={closeTOC} className="tocIcon" id="closeTOC"></img>
        </div>

        <label className="switch">
          <input type="checkbox" className="toggleSwitch">
          </input>
          <span className="slider">
            <span className="sliderLeft">Light</span>
            <span className="sliderRight">Dark</span>
          </span>
        </label>

        {/* <p className="tocTitle" id="breakSection">
          <span className="tocInnerText">Home</span></p> */}
        <p className="tocTitleFirst">
          <img src={home} className="tocIcon"></img>
          <span className="tocInnerText">Dashboard</span></p>

        <p className="tocTitle">
          <img src={calendar} className="tocIcon"></img>
          <span className="tocInnerText">Timeline</span></p>

        <p className="tocTitle" id="breakSection">
          <span className="tocInnerText">Notes</span></p>
        <p className="tocTitle">
          <img src={recent} className="tocIcon"></img>
          <span className="tocInnerText">Recent</span></p>
        <p className="tocTitle">
          <img src={template} className="tocIcon"></img>
          <span className="tocInnerText">Templates</span></p>
        <p className="tocTitle">
          <img src={tags} className="tocIcon"></img>
          <span className="tocInnerText">Topics</span></p>

        {/* <div className="fileViewTopicsContainer">
          <button className="topic" >
            chemistry
          </button>
          <button className="topic" >
            physics
          </button>
          <button className="topic" >
            projects
          </button>
          <button className="topic" >
            english
          </button>
          <button className="topic" >
            marketing
          </button>
          <button className="topic" >
            daily note
          </button>
        </div> */}

        <p className="tocTitle">
          <img src={favorites} className="tocIcon"></img>
          <span className="tocInnerText">Bookmarks</span></p>
        <p className="tocTitle">
          <img src={trash} className="tocIcon"></img>
          <span className="tocInnerText">Recycling</span></p>

        {/* <div className="fileSys">
          {props.fileNames.map((file, index) => (
            <button
              key={index}
              className="fileElem"
              onClick={() => props.handleClick(file)}>
              <img src={note} className="tocIcon"></img>
              <span className="tocInnerText">{file.replace(/^.*[\\/]/, '')}</span>
            </button>
          ))}
        </div> */}
        <p className="tocTitle" id="breakSection">
          <span className="tocInnerText">Support</span></p>
        <p className="tocTitle">
          <img src={help} className="tocIcon"></img>
          <span className="tocInnerText">Get Help</span></p>
        <p className="tocTitle" >
          <img src={feedback} className="tocIcon"></img>
          <span className="tocInnerText">Submit Feedback</span></p>

        <div className="bottomToc">
          <p className="tocTitle" >
            <img src={settings} className="tocIcon"></img>
            <span className="tocInnerText">Settings</span></p>
          <p className="tocTitle" >
            <img src={cmd} className="tocIcon"></img>
            <span className="tocInnerText">Command Palette</span></p>
        </div>

      </div>
    </div>
  );
}

export default React.memo(TableOfContents);