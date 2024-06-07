import React from "react";
import { useEffect, useState } from "react";
import '../../App.css'
import TextareaAutosize from 'react-textarea-autosize'

import { ArrowUp } from "lucide-react";

const AssistantPanel = () => {
    return (
        <div className="assistantPanelContainer">
            <div className="assistantPanelInputWrapper">
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

export default AssistantPanel
