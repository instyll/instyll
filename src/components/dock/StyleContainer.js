/**
 * @author wou
 */
import path from 'path';
import React, { useState } from 'react';
import "../../App.css";





import { useSelector } from 'react-redux';

function StyleContainer({ rightPanelOpen }) {

    const [selectedFont, setSelectedFont] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const documentPath = useSelector((state) => state.path.path)

    const updateDocumentFont = (fontSelection) => {
        // change the css --font variable to mono/serif
        // console.log(fontSelection)
        if (fontSelection === 'default') {
            setSelectedFont(fontSelection)
            document.documentElement.style.setProperty('--font', `-apple-system, BlinkMacSystemFont, "Inter", sans-serif`)
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

    const updateDocumentColor = (colorSelection) => {
        if (colorSelection == 'defaultColor') {
            if (document.querySelector("html").getAttribute("data-theme") == "dark") {
                document.documentElement.style.setProperty('--primary-text-d', `#c5c5c5`)
                document.documentElement.style.setProperty('--button-highlight', `#5271ff`)
            } else {
                document.documentElement.style.setProperty('--primary-text-d', `rgb(41, 37, 36)`)
                document.documentElement.style.setProperty('--button-highlight', `#5271ff`)
            }
            window.dispatchEvent(new Event('colorChange'));
        } else if (colorSelection == 'red') {
            document.documentElement.style.setProperty('--primary-text-d', `red`)
            document.documentElement.style.setProperty('--button-highlight', `red`)
            window.dispatchEvent(new Event('colorChange'));
        } else if (colorSelection == 'blue') {
            document.documentElement.style.setProperty('--primary-text-d', `#5271ff`)
            document.documentElement.style.setProperty('--button-highlight', `#5271ff`)
            window.dispatchEvent(new Event('colorChange'));
        } else if (colorSelection == 'green') {
            document.documentElement.style.setProperty('--primary-text-d', `green`)
            document.documentElement.style.setProperty('--button-highlight', `green`)
            window.dispatchEvent(new Event('colorChange'));
        } else if (colorSelection == 'purple') {
            document.documentElement.style.setProperty('--primary-text-d', `purple`)
            document.documentElement.style.setProperty('--button-highlight', `purple`)
            window.dispatchEvent(new Event('colorChange'));
        } else if (colorSelection == 'pink') {
            document.documentElement.style.setProperty('--primary-text-d', `magenta`)
            document.documentElement.style.setProperty('--button-highlight', `magenta`)
            window.dispatchEvent(new Event('colorChange'));
        }
    }

    return (
        <div>
            <div className='styleContainer'>
                {/* <p className="paneTitle">Titles</p>
                <div className='styleTitleOptionsContainer'>
                    <button 
                    className='titleOptionsButton'
                    onClick={() => callCommand(wrapInHeadingCommand.key, 1)}
                    >
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
                </div> */}
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
                    <p className="paneTitle">Color</p>
                    <div className='colorOptionsContainer'>
                        <button 
                        className='colorOptionsButton' id='defaultColor'
                        onClick={() => updateDocumentColor('defaultColor')}
                        >

                        </button>
                        <button 
                        className='colorOptionsButton' id='red'
                        onClick={() => updateDocumentColor('red')}
                        >
                            
                        </button>
                        <button 
                        className='colorOptionsButton' id='blue'
                        onClick={() => updateDocumentColor('blue')}
                        >
                            
                        </button>
                        <button 
                        className='colorOptionsButton' id='green'
                        onClick={() => updateDocumentColor('green')}
                        >
                            
                        </button>
                        <button 
                        className='colorOptionsButton' id='purple'
                        onClick={() => updateDocumentColor('purple')}
                        >
                            
                        </button>
                        <button 
                        className='colorOptionsButton' id='pink'
                        onClick={() => updateDocumentColor('pink')}
                        >
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const removePathPrefix = (docPath) => {
    return path.basename(docPath)
}

export default StyleContainer;
