/**
 * @author wou
 */
import React, { useState } from 'react';
import "../App.css";

function StatContainer({ rightPanelOpen }) {

    return (
        <div>
            <div className='statContainer'>
                <p className="paneTitle">Stats</p>
                <p className="paneTitle">Properties</p>
                <p className="paneTitle">Location</p>
            </div>
        </div>
    );
}

export default StatContainer;
