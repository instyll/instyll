import "allotment/dist/style.css";
import fs from 'fs';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import React, { useState, useEffect, useRef } from 'react';
import Sizzle from 'sizzle';
import '../App.css';
import './cmdk/theme.scss';
import sampleHeader from '../command-palette/commandPaletteHeader.js';
import MenuBar from '../components/menuBar';
import TableOfContents from '../components/toc.js';
import { CLOSE, CREATE, DAILY, FILE, OPEN, SET_THEME, TOGGLE } from '../constants.ts';
import TopicModal from '../modal/topic/TopicModal.js';
import "react-cmdk/dist/cmdk.css";
import {Command} from 'cmdk';
import { useNavigate } from "react-router-dom";
import SettingsModal from "../modal/SettingsModal";
import DocumentModal from "../modal/document/CreateDocumentModal.js";

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../command-palette/commandPalette.css';
import topicsIcon from '../icons/tag2.png'
import dashboardIcon from '../icons/home.png'
import notesIcon from '../icons/calendar.png'
import zapIcon from '../icons/bolt.png'
import bookmarksIcon from '../icons/bookmark2.png';
import settingsIcon from '../icons/settings.png';
import darkIcon from '../icons/focus.png'
import closeIcon from '../icons/doubleright.png';
import openIcon from '../icons/doubleleft.png'
import themeIcon from '../icons/template2.png';
import documentIcon from '../icons/document.png';

const Layout = ({ children }) => {
    const [tocOpen, setTocOpen] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [cpOpen, setCpOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState("root");
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [documentCreationModalOpen, setDocumentCreationModalOpen] = useState(false);

    const containerRef = useRef(null);
    const navigate = useNavigate();

    // command palette toggle
    const handleCommandPalette = () => {
        setCpOpen(true);
    }

    const handleSettingsModal = () => {
        setSettingsModalOpen(true);
    }

    // Sidebar toggle
    const handleToc = () => {
        setTocOpen(!tocOpen);
        // console.log(tocOpen);
    }

    const handleDock = () => {
        setDockOpen(!dockOpen);
        setRightPanelOpen(false);
    }

    // dark / light mode 
    useEffect(() => {
        const html = document.querySelector("html");
        var theme = isDark ? "light" : "dark";
        html.setAttribute("data-theme", theme);
    }, [isDark])

    const toggleTheme = (isChecked) => {
        // console.log("is checked " + isChecked);
        if (isDark === true) {
            if (isChecked) {
                setIsDark(false);
            } else {
                setIsDark(true);
            }
        }
        // handleTheme();
    }

    // command palette
    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCpOpen((cpOpen) => !cpOpen);
            } else if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setDocumentCreationModalOpen(true);
            }
        }

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [])

    return (
        <div className="layout">

            <div className='container'>
                <div className="navHorizontal"
                    style={{
                        width: tocOpen ? "calc(100% - 240px)" : "calc(100% - 125px)",
                        transition: "width 0.2s",
                    }}>
                    <MenuBar
                        handleToc={handleToc}
                    />
                </div>

                <DocumentModal
                    show={documentCreationModalOpen}
                    onHide={() => setDocumentCreationModalOpen(false)}
                />

                <TableOfContents
                    handleTheme={toggleTheme}
                    handleToc={handleToc}
                    tocOpen={tocOpen}
                    handleCp={handleCommandPalette}

                />

                <SettingsModal show={settingsModalOpen} onHide={() => setSettingsModalOpen(false)}></SettingsModal>

                <Command.Dialog open={cpOpen} onOpenChange={setCpOpen} container={containerRef.current}>
                    <Command.Input placeholder="Type a command"/>

                        <Command.List>

                            <Command.Empty>No results found.</Command.Empty>

                            <Command.Group heading="Navigation">
                            <Command.Item onSelect={() => {navigate('/home'); setCpOpen(false)}}><img className="tocIcon" src={dashboardIcon}/><span className="tocInnerText" >Dashboard</span></Command.Item>
                            <Command.Item onSelect={() => {navigate('/documents'); setCpOpen(false)}}><img className="tocIcon" src={notesIcon}/><span className="tocInnerText">Notes</span></Command.Item>
                            <Command.Item onSelect={() => {navigate('/zap'); setCpOpen(false)}}><img className="tocIcon" src={zapIcon}/><span className="tocInnerText">Zaps</span></Command.Item>
                            <Command.Item onSelect={() => {navigate('/topics'); setCpOpen(false)}}><img className="tocIcon" src={topicsIcon}/><span className="tocInnerText">Topics</span></Command.Item>
                            <Command.Item onSelect={() => {navigate('/bookmark'); setCpOpen(false)}}><img className="tocIcon" src={bookmarksIcon}/><span className="tocInnerText">Bookmarks</span></Command.Item>
                            <Command.Item onSelect={() => {handleSettingsModal(); setCpOpen(false)}}><img className="tocIcon" src={settingsIcon}/><span className="tocInnerText">Settings</span></Command.Item>
                            </Command.Group>
                            <Command.Group heading="Commands">
                            <Command.Item onSelect={() => setDocumentCreationModalOpen(true)}><img className="tocIcon" src={documentIcon}/><span className="tocInnerText">Create Note</span></Command.Item>
                            <Command.Item onSelect={() => setIsDark(true)}><img className="tocIcon" src={themeIcon}/><span className="tocInnerText">Set Theme: Light</span></Command.Item>
                            <Command.Item onSelect={() => setIsDark(false)}><img className="tocIcon" src={themeIcon}/><span className="tocInnerText">Set Theme: Dark</span></Command.Item>
                            <Command.Item onSelect={() => setTocOpen(false)}><img className="tocIcon" src={openIcon}/><span className="tocInnerText">Collapse Sidebar</span></Command.Item>
                            <Command.Item onSelect={() => setTocOpen(true)}><img className="tocIcon" src={closeIcon}/><span className="tocInnerText">Expand Sidebar</span></Command.Item>
                            </Command.Group>
                        </Command.List>
                </Command.Dialog>

                <div className='childContainer' style={{
                    width: tocOpen ? "calc((100% - 280px) )" : "calc((100% - 170px) )",
                    marginLeft: tocOpen ? "260px" : "150px",
                }}
                ref={containerRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
