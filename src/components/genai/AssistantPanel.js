import React from "react";
import { useEffect, useState } from "react";
import '../../App.css'
import TextareaAutosize from 'react-textarea-autosize'
import OpenAI from "openai";

import { ArrowUp } from "lucide-react";

const dotenv = require("dotenv")
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_SECRET_KEY, dangerouslyAllowBrowser: true });

const AssistantPanel = ({placeholder}) => {

    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [sentMessage, setSentMessage] = useState("");
    const [receivedMessage, setReceivedMessage] = useState([])

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    let nextIdI = 0;
    let nextIdJ = 0;

    const handlePromptSubmit = async (e) => {
        e.preventDefault();
        setSentMessage((prevMessages) => [
            ...prevMessages,
            { id: nextIdI++, text: inputText }
        ]);
        try {
            const stream = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{role: 'user', content: inputText}],
                stream: true,
            });
            let accumulated = "";
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                accumulated += content;
            }
            setReceivedMessage((prev) => [
                ...prev,
                { id: nextIdJ++, contentJ: accumulated}
            ]);
            setInputText("");
            setOutputText("");
        } catch (error) {
            console.log("Error calling OpenAI API:", error)
        }
    }

    return (
        <div className="assistantPanelContainer">
            <div className="assistantResponseContainer">
                {
                  sentMessage && 
                  sentMessage.map((sent, i) => 
                    <div className="genAIPrompt">
                        <div key={sent.id} className="genAIPromptInputContainer">
                            {sent.text}
                        </div>
                        <div className="genAIPromptOutputContainer">
                        {receivedMessage && receivedMessage[i] &&
                            <div key={receivedMessage[i].id}>{receivedMessage[i].contentJ}</div>}
                        </div>
                  </div>
                  )
                }
            </div>
            <div className="assistantPanelInputWrapper">
                <TextareaAutosize className="dockGenAIInput" placeholder={placeholder} onChange={handleInputChange} value={inputText}></TextareaAutosize>
                <button className="dockGenAIInputSubmitButton" type="submit" onClick={handlePromptSubmit}>
                    <div>
                        <ArrowUp size={16} style={{marginTop: '2px'}}/>
                    </div>
                </button>
            </div>        
        </div>
    )
}

export default AssistantPanel
