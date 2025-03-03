/**
 * @author wou
 */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import QueryModal from '../modal/QueryModal';
import SettingsModal from '../modal/SettingsModal';

// assets
import { BookText, Bookmark, Hash, Home, PanelLeft, Search, Settings, SquareTerminal } from 'lucide-react';
import { useSelector } from 'react-redux';

// const electron = window.require('electron');
// const currentWindow = electron.remote.getCurrentWindow();
const electronRemote = require('@electron/remote')


function TableOfContents({handleTheme, tocOpen, handleToc, handleCp, searchRef}) {

  // handle settings modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);

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
  const documents = useSelector((state) => state.documents.documents);

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

  useEffect(() => {
    const down = (e) => {
        if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setQueryModalOpen((queryModalOpen) => !queryModalOpen);
        }
    }  

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
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

  const containerRef = searchRef;

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
    }} >
      <SettingsModal show={settingsOpen} onHide={() => setSettingsOpen(false)}></SettingsModal>
      <QueryModal show={queryModalOpen} onOpenChange={() => setQueryModalOpen()} containerRef={containerRef}></QueryModal>
      <div className="tableInfo">

        <div className="tocBanner" style={{borderBottom: tocOpen ? 'initial' : '1px solid var(--muted-text)'}}>
          <button className='tocToggleButton' onClick={handleToc}>
            <div>
            <PanelLeft size={20} color='var(--primary-text)' className='tocToggle'/>
            </div>
          </button>
        </div>

        {tocOpen && <div className='tocSection'>
        {/* <Link to="/home">
          <p className={`tocTitleFirst ${location.pathname === '/home' && tocOpen ? 'active' : location.pathname === '/home' && tocOpen === false ? 'activeMin' : ''}`} style={{
            textAlign: tocOpen ? "left" : "center",
            // marginTop: tocOpen ? "64px" : "32px",
          }}>
            <Home size={20} color={`${location.pathname === '/home' && tocOpen ? 'var(--bg-color)' : 'var(--primary-text)'}`} className='tocIcon' />
            {tocOpen && <span className="tocInnerText">Dashboard</span>}
          </p>
        </Link> */}

        <Link to="/documents">
          <p className={`tocTitleFirst ${location.pathname === '/documents' && tocOpen ? 'active' : location.pathname === '/documents' && tocOpen === false ? 'activeMin' : ''}`} style={{
            textAlign: tocOpen ? "left" : "center",
          }}>
            <BookText size={20} color={`${location.pathname === '/documents' && tocOpen ? 'var(--bg-color)' : 'var(--primary-text)'}`} className='tocIcon' />
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
          <Hash size={20} color={`${location.pathname === '/topics' && tocOpen ? 'var(--bg-color)' : 'var(--primary-text)'}`} className='tocIcon' />
          {tocOpen && <span className="tocInnerText">Topics</span>}
        </p>
        </Link>

        <Link to="/bookmark">
        <p className={`tocTitle ${location.pathname === '/bookmark' && tocOpen ? 'active' : location.pathname === '/bookmark' && tocOpen === false ? 'activeMin' : ''}`} style={{
          textAlign: tocOpen ? "left" : "center",
        }}>
          <Bookmark size={20} color={`${location.pathname === '/bookmark' && tocOpen ? 'var(--bg-color)' : 'var(--primary-text)'}`} className='tocIcon' />
          {tocOpen && <span className="tocInnerText">Bookmarks</span>}</p>
        </Link>
        </div>}

        {tocOpen && <div className='tocSection' style={{marginTop: '16px'}}>
        <p className="tocTitleFirst" onClick={() => setQueryModalOpen(true)} style={{
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