import OpenAI from "openai";
import React from "react";
import Modal from "react-modal"; // Import Modal from 'react-modal'

import "../../App.css";

import { useState } from "react";
import explainIcon from '../../icons/explainIcon.png';
import feedbackIcon from '../../icons/feedbackIcon.png';
import promptIcon from '../../icons/promptIcon.png';
import questionIcon from '../../icons/questionIcon.png';
import tipsIcon from '../../icons/tipsIcon.png';

const dotenv = require("dotenv")
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_SECRET_KEY, dangerouslyAllowBrowser: true });

const GenAIModal = ({ show, onHide }) => {

    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [sentMessage, setSentMessage] = useState([])
    const [receivedMessage, setReceivedMessage] = useState([])
  
    const handleInputChange = (e) => {
      setInputText(e.target.value);
    };
    
    let nextId = 0;
    let nextId2 = 0;

    const handlePromptSubmit = async (e) => {
        e.preventDefault();
        console.log(inputText)
        setSentMessage((prevMessages) => [
            ...prevMessages,
            { id: nextId++, text: inputText },
          ]);
        try {
          const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputText}],
            stream: true,
          });
          let accumulated = ""
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ""
            accumulated += content
        }
        setReceivedMessage((prev) => [
            ...prev,
            { id: nextId2++, content1: accumulated }, 
        ]);
        setInputText("")
        setOutputText("")
        } catch (error) {
          console.error("Error calling OpenAI API:", error);
        }
      };

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
        { (inputText.length === 0 && receivedMessage.length === 0) &&
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
        }
        <div className="genAIPromptContainer">
            <div className="genAIPromptWrapper">
                
                {sentMessage && 
                sentMessage.map((sent, i) => 
                    <div className="genAIPrompt">
                <div key={sent.id} className="genAIPromptInputContainer">
                    {sent.text}
                </div>
                <div className="genAIPromptOutputContainer">
                {receivedMessage && receivedMessage[i] &&
                <div key={receivedMessage[i].id}>{receivedMessage[i].content1}</div>}
                </div>
                </div>
                )
                }    
                
            </div>

            <input className="genAIPromptInput" 
                autoFocus
                type="text" 
                placeholder="Ask anything..."
                value={inputText}
                onChange={handleInputChange}></input>
                <button 
                type="submit" 
                className="genAIPromptSubmitButton"
                onClick={handlePromptSubmit}>
                    <img src={promptIcon}></img>
                </button>

        </div>
      </div>
    </Modal>
  );
};

export default GenAIModal;
