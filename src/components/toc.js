/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useLocation } from 'react-router-dom';

// assets
import tags from '../icons/tag2.png';
import home from '../icons/home.png';
import recent from '../icons/recent.png';
import template from '../icons/template2.png';
import favorites from '../icons/bookmark2.png';
import note from '../icons/note2.png';
import trash from '../icons/trash.png';
import calendar from '../icons/calendar.png';
import help from '../icons/help.png';
import feedback from '../icons/feedback.png';
import banner from '../icons/key500.png';
import closeTOC from '../icons/doubleleft.png';
import settings from '../icons/settings.png';
import cmd from '../icons/cmd.png';

function TableOfContents(props) {

  function toggleTheme() {
    const toggleSwitch = document.querySelector('.toggleSwitch');
    toggleSwitch.addEventListener('change', (event) => {
      const isChecked = event.target.checked;
      props.handleTheme(isChecked);
    });
  }

  function toggleThemeMin() {
    const toggleSwitch = document.querySelector('.toggleSwitchMin');
    toggleSwitch.addEventListener('change', (event) => {
      const isChecked = event.target.checked;
      props.handleTheme(isChecked);
    });
  }

  const location = useLocation();

  useEffect(() => {
    toggleTheme();
    toggleThemeMin();
  }, []);


  return (
    <div className="tableOfContents" style={{
      width: props.tocOpen ? "240px" : "130px",
      transition: "0.2s",
    }}>
      <div className="tableInfo">

        <div className="tocBanner" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={banner} className="tocBannerIcon" draggable={false}></img>
          {props.tocOpen && <span className="tocBannerTextLeft">in<span className="tocBannerTextRight">styll</span></span>}
          <img src={closeTOC} className="tocIcon" id="closeTOC" draggable={false} onClick={props.handleToc} style={{
            marginLeft: props.tocOpen ? "67px" : "23px",
            marginTop: props.tocOpen ? "initial" : "10px",
            display: props.tocOpen ? "initial" : "block",
            transform: props.tocOpen ? "none" : "rotate(180deg)",
            transition: "transform 0.3s",
          }}></img>
        </div>

        {/* expanded switch */}

        {/* <div style={{
          display: props.tocOpen ? "initial" : "none",
          height: props.tocOpen ? "initial" : "0px",
        }}>

          <label className="switch">
            <input type="checkbox" className="toggleSwitch">
            </input>
            <span className="slider">
              {props.tocOpen && <span className="sliderLeft">Light</span>}
              {props.tocOpen && <span className="sliderRight">Dark</span>}
            </span>
          </label>

        </div> */}

        {/* collapsed switch */}


        <Link to="/home">
          <p className={`tocTitleFirst ${location.pathname === '/home' && props.tocOpen ? 'active' : location.pathname === '/home' && props.tocOpen === false ? 'activeMin' : ''}`} style={{
            textAlign: props.tocOpen ? "left" : "center",
          }}>
            <img src={home} className="tocIcon" draggable={false} />
            {props.tocOpen && <span className="tocInnerText">Dashboard</span>}
          </p>
        </Link>

        <Link to="/timeline">
          <p className={`tocTitle ${location.pathname === '/timeline' && props.tocOpen ? 'active' : location.pathname === '/timeline' && props.tocOpen === false ? 'activeMin' : ''}`} style={{
            textAlign: props.tocOpen ? "left" : "center",
          }}>
            <img src={calendar} className="tocIcon" draggable={false} />
            {props.tocOpen && <span className="tocInnerText">Timeline</span>}
          </p>
        </Link>

        <p className="tocTitle" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={template} className="tocIcon" draggable={false} />
          {props.tocOpen && <span className="tocInnerText">Templates</span>}
        </p>

        <Link to="/topics">
        <p className={`tocTitle ${location.pathname === '/topics' && props.tocOpen ? 'active' : location.pathname === '/topics' && props.tocOpen === false ? 'activeMin' : ''}`} style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={tags} className="tocIcon" draggable={false} />
          {props.tocOpen && <span className="tocInnerText">Topics</span>}
        </p>
        </Link>

        <p className="tocTitle" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={favorites} className="tocIcon" draggable={false}></img>
          {props.tocOpen && <span className="tocInnerText">Bookmarks</span>}</p>
      

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

        <p className="tocTitle" id="breakSection" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <span className="tocInnerText">Utilities</span></p>
        <p className="tocTitle" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={settings} className="tocIcon" draggable={false}></img>
          {props.tocOpen && <span className="tocInnerText">Settings</span>}</p>
       
          <p className="tocTitle" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={trash} className="tocIcon" draggable={false}></img>
          {props.tocOpen && <span className="tocInnerText">Recycling</span>}</p>
       
        <p className="tocTitle" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={cmd} className="tocIcon" draggable={false}></img>
          {props.tocOpen && <span className="tocInnerText">Command Palette</span>}</p>

       
       
        <p className="tocTitle" id="breakSection" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <span className="tocInnerText">Support</span></p>
        <p className="tocTitle" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={help} className="tocIcon" draggable={false}></img>
          {props.tocOpen && <span className="tocInnerText">Get Help</span>}</p>
        <p className="tocTitle" style={{
          textAlign: props.tocOpen ? "left" : "center",
        }}>
          <img src={feedback} className="tocIcon" draggable={false}></img>
          {props.tocOpen && <span className="tocInnerText">Submit Feedback</span>}</p>

        <div className="bottomToc" style={{
          // textAlign: props.tocOpen ? "left" : "center",
          left: props.tocOpen ? "auto" : "0",
          right: props.tocOpen ? "auto" : "0",
          marginLeft: props.tocOpen ? "0" : "auto",
          marginRight: props.tocOpen ? "0" : "auto",
          width: props.tocOpen ? "184px" : "69px",
        }}>

          <div style={{
            display: props.tocOpen ? "initial" : "none",
            height: props.tocOpen ? "initial" : "0px",
          }}>

            <label className="switch">
              <input type="checkbox" className="toggleSwitch">
              </input>
              <span className="slider">
                {props.tocOpen && <span className="sliderLeft">Light</span>}
                {props.tocOpen && <span className="sliderRight">Dark</span>}
              </span>
            </label>

          </div>

          <div style={{
            display: props.tocOpen ? "none" : "initial",
            height: props.tocOpen ? "0px" : "initial",
          }}>

            <label className="switchMin">
              <input type="checkbox" className="toggleSwitchMin">
              </input>
              <span className="sliderMin">
                <span className="sliderLeftMin">L</span>
                <span className="sliderRightMin">D</span>
              </span>
            </label>

          </div>


        </div>

      </div>
    </div>
  );
}

export default React.memo(TableOfContents);