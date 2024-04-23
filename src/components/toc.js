/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useLocation } from 'react-router-dom';
import SettingsModal from '../modal/SettingsModal';

// assets
import tags from '../icons/tag2.png';
import home from '../icons/home.png';
import template from '../icons/bolt.png';
import favorites from '../icons/bookmark2.png';
import calendar from '../icons/calendar.png';
import banner from '../icons/key500.png';
import bannerRed from '../icons/keyRed.png';
import bannerGreen from '../icons/keyGreen.png';
import bannerPurple from '../icons/keyPurple.png';
import bannerPink from '../icons/keyPink.png';
import closeTOC from '../icons/doubleleft.png';
import settings from '../icons/settings.png';
import cmd from '../icons/cmd.png';

function TableOfContents({handleTheme, tocOpen, handleToc, handleCp}) {

  // handle settings modal
  const [settingsOpen, setSettingsOpen] = useState(false);

  function handleSettingsModal(val) {
    setSettingsOpen(val);
  }

  /* handle theme toggle from switch */
  function toggleTheme() {
    const toggleSwitch = document.querySelector('.toggleSwitch');
    toggleSwitch.addEventListener('change', (event) => {
      const isChecked = event.target.checked;
      handleTheme(isChecked);
    });
  }

  /* for minimized sidebar */
  function toggleThemeMin() {
    const toggleSwitch = document.querySelector('.toggleSwitchMin');
    toggleSwitch.addEventListener('change', (event) => {
      const isChecked = event.target.checked;
      handleTheme(isChecked);
    });
  }

  const location = useLocation();

  useEffect(() => {
    toggleTheme();
    toggleThemeMin();
  }, []);

  // const primaryTextD = document.documentElement.style.getPropertyValue('--primary-text-d');
  // Map primaryTextD value to the appropriate banner image

  const [primaryTextD, setPrimaryTextD] = useState(getComputedStyle(document.documentElement).getPropertyValue('--primary-text-d').trim());
  
    useEffect(() => {
      const handleUpdate = () => {
        setPrimaryTextD(getComputedStyle(document.documentElement).getPropertyValue('--primary-text-d').trim());
      };
  
      window.addEventListener('colorChange', handleUpdate);
  
      return () => {
        window.removeEventListener('colorChange', handleUpdate);
      };
    }, []);

  const bannerMap = {
    '#c5c5c5': banner,
    'rgb(41, 37, 36)': banner,
    'red': bannerRed,
    'green': bannerGreen,
    'purple': bannerPurple,
    'magenta': bannerPink,
  };

  // Determine the src value based on primaryTextD
  const src = bannerMap[primaryTextD] || banner;

  return (
    <div className="tableOfContents" style={{
      width: tocOpen ? "240px" : "130px",
      transition: "0.2s",
    }}>
      <SettingsModal show={settingsOpen} onHide={() => setSettingsOpen(false)}></SettingsModal>
      <div className="tableInfo">

        <div className="tocBanner" style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          {/* <img 
          src={src}
          className="tocBannerIcon" draggable={false}></img>
          {tocOpen && <span className="tocBannerTextLeft">in<span className="tocBannerTextRight">styll</span></span>} */}
          <img src={closeTOC} className="tocIcon" id="closeTOC" draggable={false} onClick={handleToc} style={{
            marginLeft: tocOpen ? "67px" : "28px",
            float: tocOpen ? "right" : "none",
            marginTop: tocOpen ? "initial" : "36px",
            display: tocOpen ? "initial" : "block",
            transform: tocOpen ? "none" : "rotate(180deg)",
            transition: "transform 0.3s",
          }}></img>
        </div>

        <Link to="/home">
          <p className={`tocTitleFirst ${location.pathname === '/home' && tocOpen ? 'active' : location.pathname === '/home' && tocOpen === false ? 'activeMin' : ''}`} style={{
            textAlign: tocOpen ? "left" : "center",
            marginTop: tocOpen ? "64px" : "32px",
          }}>
            <img src={home} className="tocIcon" draggable={false} />
            {tocOpen && <span className="tocInnerText">Dashboard</span>}
          </p>
        </Link>

        <Link to="/documents">
          <p className={`tocTitle ${location.pathname === '/documents' && tocOpen ? 'active' : location.pathname === '/documents' && tocOpen === false ? 'activeMin' : ''}`} style={{
            textAlign: tocOpen ? "left" : "center",
          }}>
            <img src={calendar} className="tocIcon" draggable={false} />
            {tocOpen && <span className="tocInnerText">Notes</span>}
          </p>
        </Link>

        <Link to="/zap">
        <p className={`tocTitle ${location.pathname === '/zap' && tocOpen ? 'active' : location.pathname === '/zap' && tocOpen === false ? 'activeMin' : ''}`} style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          <img src={template} className="tocIcon" draggable={false} />
          {tocOpen && <span className="tocInnerText">Zaps</span>}
        </p>
        </Link>

        <Link to="/topics">
        <p className={`tocTitle ${location.pathname === '/topics' && tocOpen ? 'active' : location.pathname === '/topics' && tocOpen === false ? 'activeMin' : ''}`} style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          <img src={tags} className="tocIcon" draggable={false} />
          {tocOpen && <span className="tocInnerText">Topics</span>}
        </p>
        </Link>

        <Link to="/bookmark">
        <p className="tocTitle" style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          <img src={favorites} className="tocIcon" draggable={false}></img>
          {tocOpen && <span className="tocInnerText">Bookmarks</span>}</p>
        </Link>

        <p className="tocTitle" id="breakSection" style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          <span className="tocInnerText">Utilities</span></p>
        <p className="tocTitle" style={{
          textAlign: tocOpen ? "left" : "center",
        }}
        onClick={() => setSettingsOpen(true)}>
          <img src={settings} className="tocIcon" draggable={false}></img>
          {tocOpen && <span className="tocInnerText">Settings</span>}</p>
       
        <p className="tocTitle" style={{
          textAlign: tocOpen ? "left" : "center",
        }}
        onClick={handleCp}>
          <img src={cmd} className="tocIcon" draggable={false}></img>
          {tocOpen && <span className="tocInnerText">Command Palette</span>}</p>

        <div className="bottomToc" style={{
          left: tocOpen ? "auto" : "0",
          right: tocOpen ? "auto" : "0",
          marginLeft: tocOpen ? "0" : "auto",
          marginRight: tocOpen ? "0" : "auto",
          width: tocOpen ? "192px" : "69px",
        }}>

          <div style={{
            display: tocOpen ? "initial" : "none",
            height: tocOpen ? "initial" : "0px",
          }}>

            <label className="switch">
              <input type="checkbox" className="toggleSwitch">
              </input>
              <span className="slider">
                {tocOpen && <span className="sliderLeft">Light</span>}
                {tocOpen && <span className="sliderRight">Dark</span>}
              </span>
            </label>

          </div>

          <div style={{
            display: tocOpen ? "none" : "initial",
            height: tocOpen ? "0px" : "initial",
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