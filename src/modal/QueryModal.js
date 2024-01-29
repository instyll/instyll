import React from "react";
import Modal from "react-modal"; // Import Modal from 'react-modal'
import { useSelector } from "react-redux";
import QueryResult from "../components/queryResult";

import "../App.css";
import search from '../icons/search.png'

import { useState } from "react";

const dotenv = require("dotenv")
dotenv.config();

const QueryModal = ({ show, onHide }) => {

  const [query, setQuery] = useState("");

  const documents = useSelector((state) => state.documents.documents)

  const handleSearchQuery = (e) => {
    setQuery(e.target.value);
  }

  const fuzzySearch = (input) => {
    return documents.filter((doc) =>
      doc[1].toString().toLowerCase().includes(input.toString().toLowerCase())
    );
  };

  const filteredDocuments = fuzzySearch(query);

  return (
    <Modal
      isOpen={show}
      onRequestClose={onHide}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
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
      <div className="queryContainer">
      <div className='modalSearchWrapper'>
        <img src={search} className="modalSearchIcon" draggable={false}></img>
      </div>
      <input className="modalSearch" 
      placeholder="Search your notes"
      onChange={handleSearchQuery}
      autoFocus
      >
        </input>
        <div className="queryResultsContainer">
            <span className="slashGroupHeaderSearch">{query ? 'Suggestions' : 'Recents'}</span>
            {filteredDocuments.map((filteredDocument) => (
                <QueryResult documentInfo={filteredDocument}>
                </QueryResult>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default QueryModal;
