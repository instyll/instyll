import React from "react";
import Modal from "react-modal"; // Import Modal from 'react-modal'

import "../App.css";

import questionIcon from '../icons/questionIcon.png'
import explainIcon from '../icons/explainIcon.png'
import feedbackIcon from '../icons/feedbackIcon.png'
import tipsIcon from '../icons/tipsIcon.png'
import promptIcon from '../icons/promptIcon.png'

const GenAIModal = ({ show, onHide }) => {
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
          backgroundColor: "var(--elevated-bg)",
          color: "var(--primary-text)",
          fontFamily: "Inter",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",
          border: "0px none",
          fontSize: "1em",
          boxSizing: "border-box",
          width: "400px",
          height: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div className="genAIContainer">
        <div className="genAIPreviewContainer">
            <div className="genAIPreviewWrapper">
                <div className="genAIPreview">
                    <span className="genAIPreviewIcon" id="question">
                        <img src={questionIcon}></img>
                    </span>
                    <span className="genAIPreviewDescription">Questions</span>
                </div>
                <div className="genAIPreview">
                    <span className="genAIPreviewIcon" id="feedback">
                        <img src={feedbackIcon}></img>
                    </span>
                    <span className="genAIPreviewDescription">Feedback</span>
                </div>
                <div className="genAIPreview">
                    <span className="genAIPreviewIcon" id="explain">
                        <img src={explainIcon}></img>
                    </span>
                    <span className="genAIPreviewDescription">Explain</span>
                </div>
                <div className="genAIPreview">
                    <span className="genAIPreviewIcon" id="tips">
                        <img src={tipsIcon}></img>
                    </span>
                    <span className="genAIPreviewDescription">Tips</span>
                </div>
            </div>
        </div>
        <div className="genAIPromptContainer">
            <div className="genAIPromptWrapper">
                <input className="genAIPromptInput" 
                type="text" 
                placeholder="Ask anything..."></input>
                <button type="submit" className="genAIPromptSubmitButton">
                    <img src={promptIcon}></img>
                </button>
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default GenAIModal;
