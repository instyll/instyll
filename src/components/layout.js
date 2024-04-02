import "allotment/dist/style.css";
import fs from 'fs';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import React, { useState, useEffect } from 'react';
import CommandPalette from 'react-command-palette';
import Sizzle from 'sizzle';
import '../App.css';
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
    const handleTheme = () => {
        const html = document.querySelector("html");
        var theme = isDark ? "light" : "dark";
        console.log(theme);
        html.setAttribute("data-theme", theme);
    }

    const toggleTheme = (isChecked) => {
        setIsDark(!isChecked);
        handleTheme();
    }

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
                    toggleTheme={toggleTheme}
                    isDark={isDark}
                />

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
