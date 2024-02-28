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

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    console.log(selectedOption)
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
                    <div className="third">
                      500px
                    </div>
                    <div className="third">
                      600px
                    </div>
                    <div className="third">
                      700px
                    </div>
                  </div>
                </div>
              </div> 
              : selectedOption == 'f' ?
              <div className="settingOptionContainer">
                  <div className="editorSettings">
                  <span className="editorSettingsTitle">
                    File location
                  </span>
                </div>
              </div> :
              <div className="settingOptionContainer">
                  <div className="editorSettings">
                  <span className="editorSettingsTitle">
                    Theme
                  </span>
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
