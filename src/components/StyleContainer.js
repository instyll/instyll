/**
 * @author wou
 */
import React, { useState } from 'react';
import path from 'path'
import StatItem from './StatItem';
import "../App.css";

import wordCountIcon from '../icons/wordCount.png'
import clockIcon from '../icons/clock.png'
import folderIcon from '../icons/folder.png'
import { useSelector } from 'react-redux';

function StyleContainer({ rightPanelOpen }) {

    const documentPath = useSelector((state) => state.path.path)

    return (
        <div>
            <div className='statContainer'>
                <p className="paneTitle">Titles</p>
                <p className="paneTitle">Content</p>
                <p className="paneTitle">Formatting</p>
                <p className="paneTitle">Font</p>
            </div>
        </div>
    );
}

const removePathPrefix = (docPath) => {
    return path.basename(docPath)
}

export default StyleContainer;
