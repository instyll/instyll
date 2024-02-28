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

  return (
    <Modal
      isOpen={show}
      onRequestClose={onHide}
      style={{
        overlay: {
          // backgroundColor: "var(--bg-color)",
          backgroundColor: "transparent",
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
          height: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div className="settingsContainer">
     test
      </div>
    </Modal>
  );
};

export default SettingsModal;
