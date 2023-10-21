/**
 * @author wou
 */
import React, { useState } from 'react';
import "../App.css";

function StatContainer({ rightPanelOpen }) {

    return (
        <div>
            <div className='statContainer'>
                <p className="paneTitle">Words</p>
                <p className="paneTitle">Characters</p>
                <p className="paneTitle">Reading Time</p>
            </div>
        </div>
    );
}

export default StatContainer;
