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

function StatContainer({ rightPanelOpen }) {

    const documentPath = useSelector((state) => state.path.path)

    return (
        <div>
            <div className='statContainer'>
                <p className="paneTitle">Stats</p>
                <StatItem title={`Words`} icon={wordCountIcon}></StatItem>
                <StatItem title={`Characters`} icon={wordCountIcon}></StatItem>
                <p className="paneTitle">Properties</p>
                <StatItem title={`Created`} icon={clockIcon}></StatItem>
                <StatItem title={`Updated`} icon={clockIcon}></StatItem>
                <p className="paneTitle">Location</p>
                <StatItem title={removePathPrefix(documentPath)} icon={folderIcon}></StatItem>
            </div>
        </div>
    );
}

const removePathPrefix = (docPath) => {
    return path.basename(docPath)
}

export default StatContainer;
