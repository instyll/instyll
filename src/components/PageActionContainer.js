/**
 * @author wou
 */
import React, { useState } from 'react';
import "../App.css";

import pdfIcon from '../icons/pdf1.png'
import mathIcon from '../icons/math.png'
import gitIcon from '../icons/git.png'
import bookmarkIcon from '../icons/bookmark.png'
import deleteIcon from '../icons/trash.png'
import renameIcon from '../icons/rename.png'

function PageActionContainer({ rightPanelOpen }) {

    return (
        <div>
            <div className='pageActionContainer'>
            <p className="paneTitle">Note Options</p>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={pdfIcon} className='tocIcon'></img>
                        <span className='tocInnerText'>Export to PDF</span>
                    </button>
                </div>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={mathIcon} className='tocIcon'></img>
                        <span className='tocInnerText'>Export to LaTeX</span>
                    </button>
                </div>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={gitIcon} className='tocIcon'></img>
                        <span className='tocInnerText'>Push to Git</span>
                    </button>
                </div>
                <p className="paneTitle">Actions</p>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={renameIcon} className='tocIcon'></img>
                        <span className='tocInnerText'>Rename</span>
                    </button>
                </div>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={bookmarkIcon} className='tocIcon'></img>
                        <span className='tocInnerText'>Bookmark</span>
                    </button>
                </div>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={deleteIcon} className='tocIcon'></img>
                        <span className='tocInnerText'>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageActionContainer;
