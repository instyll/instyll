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
import { setTheme, updateTheme } from "../themeSlice.js";

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../command-palette/commandPalette.css';
import { useDispatch, useSelector } from "react-redux";

import { Home } from 'lucide-react';
import { BookText } from 'lucide-react';
import { Hash } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { Search } from 'lucide-react';
import { Settings } from 'lucide-react';
import { ArrowLeftFromLine } from "lucide-react";
import { ArrowRightFromLine } from "lucide-react";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { PenSquare } from "lucide-react";

const Layout = ({ children }) => {
    const lastSetTheme = useSelector((state) => state.theme.theme);
    // console.log(lastSetTheme)
    const themeRef = useRef(null);
    useEffect(() => {
        themeRef.current = lastSetTheme;
        // console.log("ref " + themeRef.current)
    }, [lastSetTheme])

    const [tocOpen, setTocOpen] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [cpOpen, setCpOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState("root");
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [documentCreationModalOpen, setDocumentCreationModalOpen] = useState(false);

    const containerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        console.log(themeRef.current)
        html.setAttribute("data-theme", themeRef.current);
    }, [])

    useEffect(() => {
        const html = document.querySelector("html");
        var theme = isDark ? "light" : "dark";
        html.setAttribute("data-theme", theme);
        console.log("theme " + theme)
        dispatch(updateTheme(theme))
    }, [isDark])

    // const toggleTheme = (isChecked) => {
    //     // console.log("is checked " + isChecked);
    //     if (isDark === true) {
    //         if (isChecked) {
    //             setIsDark(false);
    //             // dispatch(updateTheme('dark'))
    //         } else {
    //             setIsDark(true);
    //             // dispatch(updateTheme('light'))
    //         }
    //     }
    //     // handleTheme();
    // }

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
                {/* <div className="navHorizontal"
                    style={{
                        width: tocOpen ? "calc(100% - 240px)" : "calc(100% - 125px)",
                        transition: "width 0.2s",
                    }}>
                    <MenuBar
                        handleToc={handleToc}
                    />
                </div> */}

                <DocumentModal
                    show={documentCreationModalOpen}
                    onHide={() => setDocumentCreationModalOpen(false)}
                />

                <TableOfContents
                    // handleTheme={toggleTheme}
                    handleToc={handleToc}
                    tocOpen={tocOpen}
                    handleCp={handleCommandPalette}
                    searchRef={containerRef}
                />

                <SettingsModal show={settingsModalOpen} onHide={() => setSettingsModalOpen(false)}></SettingsModal>

                <Command.Dialog open={cpOpen} onOpenChange={setCpOpen} container={containerRef.current}>
                    <Command.Input placeholder="Type a command"/>

                        <Command.List>

                            <Command.Empty>No results found.</Command.Empty>

                            <Command.Group heading="Navigation">
                            <Command.Item onSelect={() => {navigate('/home'); setCpOpen(false)}}><Home size={20} className="tocIcon"/><span className="tocInnerText" >Dashboard</span></Command.Item>
                            <Command.Item onSelect={() => {navigate('/documents'); setCpOpen(false)}}><BookText size={20} className="tocIcon"/><span className="tocInnerText">Notes</span></Command.Item>
                            <Command.Item onSelect={() => {navigate('/topics'); setCpOpen(false)}}><Hash size={20} className="tocIcon"/><span className="tocInnerText">Topics</span></Command.Item>
                            <Command.Item onSelect={() => {navigate('/bookmark'); setCpOpen(false)}}><Bookmark size={20} className="tocIcon"/><span className="tocInnerText">Bookmarks</span></Command.Item>
                            <Command.Item onSelect={() => {handleSettingsModal(); setCpOpen(false)}}><Settings size={20} className="tocIcon"/><span className="tocInnerText">Settings</span></Command.Item>
                            </Command.Group>
                            <Command.Group heading="Commands">
                            <Command.Item onSelect={() => setDocumentCreationModalOpen(true)}><PenSquare size={20} className="tocIcon"/><span className="tocInnerText">Create Note</span></Command.Item>
                            <Command.Item onSelect={() => setIsDark(true)}><Sun size={20} className="tocIcon"/><span className="tocInnerText">Set Theme: Light</span></Command.Item>
                            <Command.Item onSelect={() => setIsDark(false)}><Moon size={20} className="tocIcon"/><span className="tocInnerText">Set Theme: Dark</span></Command.Item>
                            <Command.Item onSelect={() => setTocOpen(false)}><ArrowLeftFromLine size={20} className="tocIcon"/><span className="tocInnerText">Collapse Sidebar</span></Command.Item>
                            <Command.Item onSelect={() => setTocOpen(true)}><ArrowRightFromLine size={20} className="tocIcon"/><span className="tocInnerText">Expand Sidebar</span></Command.Item>
                            </Command.Group>
                        </Command.List>
                </Command.Dialog>
                <div className='childContainer' style={{
                    width: tocOpen ? "calc((100% - 240px) )" : "calc((100% - 120px))",
                    marginLeft: tocOpen ? '240px' : '120px',
                    // paddingRight: tocOpen ? 'initial' : '120px',
                }}
                ref={containerRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
