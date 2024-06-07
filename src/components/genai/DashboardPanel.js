import React from "react";
import { useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize'
import { ArrowUp } from "lucide-react";

const DashboardPanel = () => {
    return (
        <div className="dashboardPanelContainer">
             <div className="dashboardGenAIInputWrapper">
                <TextareaAutosize className="dashboardGenAIInput"></TextareaAutosize>
                <button className="dashboardGenAIInputSubmitButton">
                    <div>
                        <ArrowUp size={16} style={{marginTop: '2px'}}/>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default DashboardPanel;