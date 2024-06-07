import React from "react";
import { useState, useEffect } from "react";
import TextareaAutosize from 'react-textarea-autosize'

const DockGenAIContainer = () => {
    return (
        <div className="dockGenAIContainer">
            <div className="dockGenAIInputWrapper">
                <TextareaAutosize className="dockGenAIInput"></TextareaAutosize>
            </div>
        </div>
    )
}

export default DockGenAIContainer