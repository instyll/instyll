/**
 * @author wou
 */
import React from "react";
import Modal from "react-modal"; // Import Modal from 'react-modal'
import QueryResult from "../components/queryResult";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePath } from "../pathSlice";
import { ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';

import "../App.css";
import search from '../icons/search.png'

import { useState } from "react";
import { addDocument } from "../documentSlice";

const dotenv = require("dotenv")
dotenv.config();

const SettingsModal = ({ show, onHide }) => {

  const [selectedOption, setSelectedOption] = useState("s");
  const [selectedEditorWidth, setSelectedEditorWidth] = useState("f");
  const [selectedFontSize, setSelectedFontSize] = useState("15");
  const [selectedEditorDirection, setSelectedEditorDirection] = useState("l");
  const [selectedTheme, setSelectedTheme] = useState("l");

  const documentsPath = useSelector((state) => state.path.path);
  const documents = useSelector((state) => state.documents.documents);
  const dispatch = useDispatch();

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    // console.log(selectedOption)
  }

  // handle font size
  const handleFontSize = (option) => {
    if (option === '12px') {
      document.documentElement.style.setProperty('--font-size', '1em');
      setSelectedFontSize('12');
    } else if (option === '15px') {
      document.documentElement.style.setProperty('--font-size', '1.2em');
      setSelectedFontSize('15');
    } else if (option === '18px') {
      setSelectedFontSize('18');
      document.documentElement.style.setProperty('--font-size', '1.4em');
    }
  }

  // handle editor width
  const handleEditorWidth = (option) => {
    if (option === '700px') {
      document.documentElement.style.setProperty('--milkdown-width', '700px');
      setSelectedEditorWidth('700');
    }
    else if (option === '900px') {
      document.documentElement.style.setProperty('--milkdown-width', '900px');
      setSelectedEditorWidth('900');
    } else if (option === 'full') {
      setSelectedEditorWidth('f');
      document.documentElement.style.setProperty('--milkdown-width', '100%');
    }
  }

  // handle editor direction
  const handleEditorDirection = (option) => {
    if (option === 'ltr') {
      document.documentElement.style.setProperty('--milkdown-direction', 'ltr');
      document.documentElement.style.setProperty('--milkdown-align', 'left');
      setSelectedEditorDirection('l')
    }
    else if (option === 'rtl') {
      setSelectedEditorDirection('r')
      document.documentElement.style.setProperty('--milkdown-direction', 'rtl');
      document.documentElement.style.setProperty('--milkdown-align', 'right');
    }
  }

  // handle theme
  const handleTheme = (option) => {
    const html = document.querySelector("html");
    if (option === 'light') {
      html.setAttribute("data-theme", "light");
      setSelectedTheme('l')
    } else {
      html.setAttribute("data-theme", "dark");
      setSelectedTheme('d')
    }
  }

  const copyFiles = (src, dest) => {
    fs.readdirSync(src).forEach(file => {
      const filePath = path.join(src, file);
      const destPath = path.join(dest, file);
      fs.copyFileSync(filePath, destPath);
    });
  };

  // handle path change
  const handleLocationChange = () => {
    const folderPath = ipcRenderer.sendSync('select-folder');
    if (folderPath) {
        const originalPath = documentsPath;
        dispatch(updatePath(folderPath))
        // move notes over to new location
        copyFiles(originalPath, folderPath);
        // add redux info with new path
        for (const document of documents) {
          const updatedDocument = [document[0], document[1], document[2], document[3].replace(originalPath, folderPath), document[4]];
          console.log(updatedDocument)
          dispatch(addDocument(updatedDocument));
        }
    }
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={onHide}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: "999",
        },
        content: {
          backgroundColor: "var(--bg-color)",
          color: "var(--primary-text)",
          fontFamily: "Inter",
          borderRadius: "10px",
          // boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",
          border: "0px none",
          fontSize: "1em",
          boxSizing: "border-box",
          width: "600px",
          height: "360px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "0px",
        },
      }}
    >
      <div className="settingsContainer">
        <div className="settingsWrapper">
          <div className="settingsPaneContainer">
            <div className="settingsPaneOptionsContainer">
              <div className="settingsOptionsTitle">
                Settings
              </div>
              <div>
              <button 
              className={`settingsPaneOption ${selectedOption === 's' ? 'selected' : ''}`}
              onClick={() => handleSelectOption("s")}>
                Editor
              </button>
              </div>
              <div>
              <button 
              className={`settingsPaneOption ${selectedOption === 'f' ? 'selected' : ''}`}
              onClick={() => handleSelectOption("f")}>
                Files
              </button>
              </div>
              <div>
              <button 
              className={`settingsPaneOption ${selectedOption === 'a' ? 'selected' : ''}`}
              onClick={() => handleSelectOption("a")}>
                Appearance
              </button>
              </div>
            </div>
          </div>
          <div className="settingsContentContainer">
            {
              selectedOption == 's' ?
              <div className="settingOptionContainer">
                <div className="editorSettings">
                  <span className="editorSettingsTitle">
                    Max editor width
                  </span>
                  <div className="widthSelector">
                    <div className={selectedEditorWidth === '700' ? `third selected` : 'third'} onClick={() => handleEditorWidth('700px')}>
                      700px
                    </div>
                    <div className={selectedEditorWidth === '900' ? `third selected` : 'third'} onClick={() => handleEditorWidth('900px')}>
                      900px
                    </div>
                    <div className={selectedEditorWidth === 'f' ? `third selected` : 'third'} onClick={() => handleEditorWidth('full')}>
                      Full
                    </div>
                  </div>
                  <span className="editorSettingsTitle">
                    Editor font size
                  </span>
                  <div className="widthSelector">
                    <div className={selectedFontSize === '12' ? `third selected` : 'third'} onClick={() => handleFontSize('12px')}>
                      12px
                    </div>
                    <div className={selectedFontSize === '15' ? `third selected` : 'third'} onClick={() => handleFontSize('15px')}>
                      15px
                    </div>
                    <div className={selectedFontSize === '18' ? `third selected` : 'third'} onClick={() => handleFontSize('18px')}>
                      18px
                    </div>
                  </div>
                  <span className="editorSettingsTitle">
                    Editor direction
                  </span>
                  <div className="widthSelector">
                    <div className={selectedEditorDirection === 'l' ? `second selected` : 'second'} onClick={() => handleEditorDirection('ltr')}>
                      Left to right
                    </div>
                    <div className={selectedEditorDirection === 'r' ? `second selected` : 'second'} onClick={() => handleEditorDirection('rtl')}>
                      Right to left
                    </div>
                  </div>
                </div>
              </div> 
              : selectedOption == 'f' ?
              <div className="settingOptionContainer">
                  <div className="editorSettings">
                  <span className="editorSettingsTitle">
                    Files location
                  </span>
                  <div className="widthSelector">
                    <span className="fileLocation">{documentsPath}</span>
                    <div className="fileLocationControl">
                      <button className="fileLocationControlButton" onClick={handleLocationChange}>
                        Change location
                      </button>
                    </div>
                  </div>
                </div>
              </div> :
              <div className="settingOptionContainer">
                  <div className="editorSettings">
                  <span className="editorSettingsTitle">
                    Theme
                  </span>
                  <div className="widthSelector">
                    <div className={selectedTheme === 'l' ? `second selected` : 'second'} onClick={() => handleTheme('light')}>
                      Light
                    </div>
                    <div className={selectedTheme === 'd' ? `second selected` : 'second'} onClick={() => handleTheme('dark')}>
                      Dark
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
