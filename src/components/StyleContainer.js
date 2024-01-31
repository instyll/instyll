/**
 * @author wou
 */
import React, { useState } from 'react';
import path from 'path'
import StatItem from './StatItem';
import "../App.css";

import wordCountIcon from '../icons/wordCount.png'
import clockIcon from '../icons/clock.png'
import folderIcon from '../icons/folder.png'
import boldIcon from '../icons/bold.png'
import italicIcon from '../icons/italic.png'
import strikeThroughIcon from '../icons/strikethrough.png'
import bulletListIcon from '../icons/listOrdered.png'
import blockquoteIcon from '../icons/bquote.png'
import numListIcon from '../icons/listUnordered.png'
import heading1Icon from '../icons/header1.png'
import heading2Icon from '../icons/header2.png'
import heading3Icon from '../icons/header3.png'
import { useSelector } from 'react-redux';

function StyleContainer({ rightPanelOpen }) {

    const [selectedFont, setSelectedFont] = useState(null)
    const documentPath = useSelector((state) => state.path.path)

    const updateDocumentFont = (fontSelection) => {
        // change the css --font variable to mono/serif
        console.log(fontSelection)
        if (fontSelection === 'default') {
            setSelectedFont(fontSelection)
            document.documentElement.style.setProperty('--font', `"Inter", sans-serif`)
        } 
        else if (fontSelection === 'serif') {
            setSelectedFont(fontSelection)
            document.documentElement.style.setProperty('--font', `"PT Serif", serif`)
        }
        else if (fontSelection === 'mono') {
            setSelectedFont(fontSelection)
            document.documentElement.style.setProperty('--font', `"JetBrains Mono", monospace`)
        }
    }

    return (
        <div>
            <div className='styleContainer'>
                <p className="paneTitle">Titles</p>
                <div className='styleTitleOptionsContainer'>
                    <button className='titleOptionsButton'>
                        <img src={heading1Icon} className='tooltipIcon'></img>
                    </button>
                    <button className='titleOptionsButton'>
                        <img src={heading2Icon} className='tooltipIcon'></img>
                    </button>
                    <button className='titleOptionsButton'>
                        <img src={heading3Icon} className='tooltipIcon'></img>
                    </button>
                </div>
                <p className="paneTitle">Formatting</p>
                <div className='formattingOptionsContainer'>
                    <button className='formattingOptionButton'>
                        <img src={boldIcon} className='tooltipIcon'></img>
                    </button>
                    <button className='formattingOptionButton'>
                        <img src={italicIcon} className='tooltipIcon'></img>
                    </button>
                    <button className='formattingOptionButton'>
                        <img src={strikeThroughIcon} className='tooltipIcon'></img>
                    </button>
                    <button className='formattingOptionButton'>
                        <img src={bulletListIcon} className='tooltipIcon'></img>
                    </button>
                    <button className='formattingOptionButton'>
                        <img src={numListIcon} className='tooltipIcon'></img>
                    </button>
                    <button className='formattingOptionButton'>
                        <img src={blockquoteIcon} className='tooltipIcon'></img>
                    </button>
                </div>
                <p className="paneTitle">Font</p>
                <div className='fontOptionsContainer'>
                    <button 
                    className={`fontOptionsButton ` + (selectedFont == 'default' ? 'selected': '')} id="default"
                    onClick={() => updateDocumentFont('default')}>
                        Default
                    </button>
                    <button 
                    className={`fontOptionsButton ` + (selectedFont == 'serif' ? 'selected': '')} id='serif'
                    onClick={() => updateDocumentFont('serif')}>
                        Serif
                    </button>
                    <button 
                    className={`fontOptionsButton ` + (selectedFont == 'mono' ? 'selected': '')} id='mono'
                    onClick={() => updateDocumentFont('mono')}>
                        Mono
                    </button>
                </div>
            </div>
        </div>
    );
}

const removePathPrefix = (docPath) => {
    return path.basename(docPath)
}

export default StyleContainer;
