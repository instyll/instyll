/**
 * @author wou
 */
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useLocation } from 'react-router-dom';
import SettingsModal from '../modal/SettingsModal';

// assets
import { Home } from 'lucide-react';
import { BookText } from 'lucide-react';
import { Hash } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { Search } from 'lucide-react';
import { Settings } from 'lucide-react';
import { SquareTerminal } from 'lucide-react';
import { PanelLeft } from 'lucide-react';

// const electron = window.require('electron');
// const currentWindow = electron.remote.getCurrentWindow();
const electronRemote = require('@electron/remote')


function TableOfContents({handleTheme, tocOpen, handleToc, handleCp}) {

  // handle settings modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);

  function handleSettingsModal(val) {
    setSettingsOpen(val);
  }

  /* handle theme toggle from switch */
  // function toggleTheme() {
  //   const toggleSwitch = document.querySelector('.toggleSwitch');
  //   toggleSwitch.addEventListener('change', (event) => {
  //     const isChecked = event.target.checked;
  //     handleTheme(isChecked);
  //   });
  // }

  // /* for minimized sidebar */
  // function toggleThemeMin() {
  //   const toggleSwitch = document.querySelector('.toggleSwitchMin');
  //   toggleSwitch.addEventListener('change', (event) => {
  //     const isChecked = event.target.checked;
  //     handleTheme(isChecked);
  //   });
  // }

  const location = useLocation();

  useEffect(() => {
    const currentWindow = electronRemote.getCurrentWindow();
    const onMaximize = () => {
      setMaximized(true)
    };
    const onUnmaximize = () => setMaximized(false);

    currentWindow.on('enter-full-screen', onMaximize);
    currentWindow.on('leave-full-screen', onUnmaximize)

    return () => {
        currentWindow.removeListener('maximize', onMaximize);
        currentWindow.removeListener('unmaximize', onUnmaximize);
    };
  }, [])

  // useEffect(() => {
  //   toggleTheme();
  //   toggleThemeMin();
  // }, []);

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

  // const bannerMap = {
  //   '#c5c5c5': banner,
  //   'rgb(41, 37, 36)': banner,
  //   'red': bannerRed,
  //   'green': bannerGreen,
  //   'purple': bannerPurple,
  //   'magenta': bannerPink,
  // };

  // Determine the src value based on primaryTextD
  // const src = bannerMap[primaryTextD] || banner;

  return (
    <div className="tableOfContents drag" style={{
      width: tocOpen ? "240px" : "120px",
      transition: "0.2s",
      borderRight: tocOpen ? '1px solid var(--muted-text)' : 'none'
    }}>
      <SettingsModal show={settingsOpen} onHide={() => setSettingsOpen(false)}></SettingsModal>
      <div className="tableInfo">

        {!maximized && <div className="tocBanner">
          <button className='tocToggleButton' onClick={handleToc}>
            <div>
            <PanelLeft size={20} color='var(--primary-text)' className='tocToggle'/>
            </div>
          </button>
        </div>}

        {tocOpen && <div className='tocSection'>
        <Link to="/home">
          <p className={`tocTitleFirst ${location.pathname === '/home' && tocOpen ? 'active' : location.pathname === '/home' && tocOpen === false ? 'activeMin' : ''}`} style={{
            textAlign: tocOpen ? "left" : "center",
            // marginTop: tocOpen ? "64px" : "32px",
          }}>
            <Home size={20} color={`${location.pathname === '/home' && tocOpen ? 'var(--button-highlight-text)' : 'var(--primary-text)'}`} className='tocIcon' />
            {tocOpen && <span className="tocInnerText">Dashboard</span>}
          </p>
        </Link>

        <Link to="/documents">
          <p className={`tocTitle ${location.pathname === '/documents' && tocOpen ? 'active' : location.pathname === '/documents' && tocOpen === false ? 'activeMin' : ''}`} style={{
            textAlign: tocOpen ? "left" : "center",
          }}>
            <BookText size={20} color={`${location.pathname === '/documents' && tocOpen ? 'var(--button-highlight-text)' : 'var(--primary-text)'}`} className='tocIcon' />
            {tocOpen && <span className="tocInnerText">Notes</span>}
          </p>
        </Link>

        {/* <Link to="/zap">
        <p className={`tocTitle ${location.pathname === '/zap' && tocOpen ? 'active' : location.pathname === '/zap' && tocOpen === false ? 'activeMin' : ''}`} style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          <img className="tocIcon" draggable={false} />
          {tocOpen && <span className="tocInnerText">Zaps</span>}
        </p>
        </Link> */}

        <Link to="/topics">
        <p className={`tocTitle ${location.pathname === '/topics' && tocOpen ? 'active' : location.pathname === '/topics' && tocOpen === false ? 'activeMin' : ''}`} style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          <Hash size={20} color={`${location.pathname === '/topics' && tocOpen ? 'var(--button-highlight-text)' : 'var(--primary-text)'}`} className='tocIcon' />
          {tocOpen && <span className="tocInnerText">Topics</span>}
        </p>
        </Link>

        <Link to="/bookmark">
        <p className={`tocTitle ${location.pathname === '/bookmark' && tocOpen ? 'active' : location.pathname === '/bookmark' && tocOpen === false ? 'activeMin' : ''}`} style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          <Bookmark size={20} color={`${location.pathname === '/bookmark' && tocOpen ? 'var(--button-highlight-text)' : 'var(--primary-text)'}`} className='tocIcon' />
          {tocOpen && <span className="tocInnerText">Bookmarks</span>}</p>
        </Link>
        </div>}

        {tocOpen && <div className='tocSection' style={{marginTop: '16px'}}>
        <p className="tocTitleFirst" style={{
          textAlign: tocOpen ? "left" : "center",
        }}
        >
          <Search size={20} color='var(--primary-text)' className='tocIcon' />
          {tocOpen && <span className="tocInnerText">Search</span>}</p>
        <p className="tocTitle" style={{
          textAlign: tocOpen ? "left" : "center",
        }}
        onClick={() => setSettingsOpen(true)}>
          <Settings size={20} color='var(--primary-text)' className='tocIcon' />
          {tocOpen && <span className="tocInnerText">Settings</span>}</p>
       
        <p className="tocTitle" style={{
          textAlign: tocOpen ? "left" : "center",
        }}
        onClick={handleCp}>
          <SquareTerminal size={20} color='var(--primary-text)' className='tocIcon' />
          {tocOpen && <span className="tocInnerText">Command Palette</span>}</p>


        <div className="bottomToc" style={{
          left: tocOpen ? "auto" : "0",
          right: tocOpen ? "auto" : "0",
          marginLeft: tocOpen ? "0" : "auto",
          marginRight: tocOpen ? "0" : "auto",
          // width: tocOpen ? "192px" : "69px",
        }}>

        </div>

          {/* <div style={{
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

          </div> */}

          {/* <div style={{
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

          </div> */}


        </div>}

      </div>
    </div>
  );
}

export default React.memo(TableOfContents);