/**
 * @author wou
 */
import React from "react";
import Modal from "react-modal"; // Import Modal from 'react-modal'
import { useSelector } from "react-redux";
import QueryResult from "../components/queryResult";
import { useEffect } from "react";

import "../App.css";
import search from '../icons/search.png'

import { useState } from "react";

const dotenv = require("dotenv")
dotenv.config();

const SettingsModal = ({ show, onHide }) => {

  const [selectedOption, setSelectedOption] = useState("s");

  const documentsPath = useSelector((state) => state.path.path);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    console.log(selectedOption)
  }

  // handle font size
  const handleFontSize = (option) => {
    if (option === '12px') {
      document.documentElement.style.setProperty('--font-size', '1em');
    } else if (option === '15px') {
      document.documentElement.style.setProperty('--font-size', '1.2em');
    } else if (option === '18px') {
      document.documentElement.style.setProperty('--font-size', '1.4em');
    }
  }

  // handle editor width
  const handleEditorWidth = (option) => {
    if (option === '700px') {
      document.documentElement.style.setProperty('--milkdown-width', '700px');
    }
    else if (option === '900px') {
      document.documentElement.style.setProperty('--milkdown-width', '900px');
    } else if (option === 'full') {
      document.documentElement.style.setProperty('--milkdown-width', '100%');
    }
  }

  // handle theme
  const handleTheme = (option) => {
    const html = document.querySelector("html");
    if (option === 'light') {
      html.setAttribute("data-theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
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
          backdropFilter: "blur(10px)",
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
          height: "300px",
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
                    <div className="third" onClick={() => handleEditorWidth('700px')}>
                      700px
                    </div>
                    <div className="third" onClick={() => handleEditorWidth('900px')}>
                      900px
                    </div>
                    <div className="third" onClick={() => handleEditorWidth('full')}>
                      Full
                    </div>
                  </div>
                  <span className="editorSettingsTitle">
                    Editor font size
                  </span>
                  <div className="widthSelector">
                    <div className="third" onClick={() => handleFontSize('12px')}>
                      12px
                    </div>
                    <div className="third" onClick={() => handleFontSize('15px')}>
                      15px
                    </div>
                    <div className="third" onClick={() => handleFontSize('18px')}>
                      18px
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
                      <button className="fileLocationControlButton">
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
                    <div className="second" onClick={() => handleTheme('light')}>
                      Light
                    </div>
                    <div className="second" onClick={() => handleTheme('dark')}>
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
