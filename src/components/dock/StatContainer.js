/**
 * @author wou
 */
import path from 'path';
import React from 'react';
import "../../App.css";
import StatItem from './StatItem';
import fs from 'fs';

import { useSelector } from 'react-redux';
import clockIcon from '../../icons/clock.png';
import folderIcon from '../../icons/folder.png';
import wordCountIcon from '../../icons/wordCount.png';

function StatContainer({ rightPanelOpen, documentPath, wordCount, charCount }) {

    const rootPath = useSelector((state) => state.path.path)

    // document creation time
    const documentCreated = formatDate(fs.statSync(documentPath).birthtime.toDateString());

    // document update time
    const documentUpdated = formatDate(fs.statSync(documentPath).mtime.toDateString());

    return (
        <div>
            <div className='statContainer'>
                <p className="paneTitle">Stats</p>
                <StatItem title={`Words`} icon={wordCountIcon} stat={wordCount}></StatItem>
                <StatItem title={`Characters`} icon={wordCountIcon} stat={charCount}></StatItem>
                <p className="paneTitle">Properties</p>
                <StatItem title={`Created`} icon={clockIcon} stat={documentCreated}></StatItem>
                <StatItem title={`Updated`} icon={clockIcon} stat={documentUpdated}></StatItem>
                <p className="paneTitle">Location</p>
                <StatItem title={removePathPrefix(rootPath)} icon={folderIcon}></StatItem>
            </div>
        </div>
    );
}

const removePathPrefix = (docPath) => {
    return path.basename(docPath)
}

const formatDate = (dateString) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    return `${month} ${day}`;
}

export default StatContainer;
