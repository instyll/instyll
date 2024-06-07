import React from "react";
import { useState, useEffect } from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { ArrowUp } from "lucide-react";

const DockGenAIContainer = () => {
    return (
        <div className="dockGenAIContainer">
            <div className="dockGenAIInputWrapper">
                <TextareaAutosize className="dockGenAIInput"></TextareaAutosize>
                <button className="dockGenAIInputSubmitButton">
                    <div>
                        <ArrowUp size={16} style={{marginTop: '2px'}}/>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default DockGenAIContainer