import "allotment/dist/style.css";
import fs from 'fs';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import React, { useState, useEffect } from 'react';
import CommandPalette from 'react-command-palette';
import Sizzle from 'sizzle';
import '../App.css';
import './cmdk/theme.scss';
import sampleHeader from '../command-palette/commandPaletteHeader.js';
import MenuBar from '../components/menuBar';
import TableOfContents from '../components/toc.js';
import { CLOSE, CREATE, DAILY, FILE, OPEN, SET_THEME, TOGGLE } from '../constants.ts';
import TopicModal from '../modal/topic/TopicModal.js';
import { Command } from 'cmdk';

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import '../command-palette/commandPalette.css';

const Layout = ({ children }) => {
    const [tocOpen, setTocOpen] = useState(true);
    const [isDark, setIsDark] = useState(true);
    const [cpOpen, setCpOpen] = useState(false);

    // command palette toggle
    const handleCommandPalette = () => {
        setCommandPaletteOpen(!commandPaletteOpen);
    }

    // Sidebar toggle
    const handleToc = () => {
        setTocOpen(!tocOpen);
        console.log(tocOpen);
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
        console.log("is checked " + isChecked);
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

                <TableOfContents
                    handleTheme={toggleTheme}
                    handleToc={handleToc}
                    tocOpen={tocOpen}
                />

                <div className="raycast">
                    <Command.Dialog open={cpOpen} onOpenChange={setCpOpen} label="Command Menu" >
                        <Command.Input />
                            <Command.List>
                                <Command.Empty>No results found</Command.Empty>
                                <Command.Group heading="heading">
                                    <Command.Item>Set theme: light</Command.Item>
                                    <Command.Item>Set theme: dark</Command.Item>
                                </Command.Group>
                            </Command.List>
                    </Command.Dialog>
                </div>

                <div className='childContainer' style={{
                    width: tocOpen ? "calc((100% - 280px) )" : "calc((100% - 170px) )",
                    marginLeft: tocOpen ? "260px" : "150px",
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
