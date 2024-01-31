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

function PageActionContainer({ rightPanelOpen }) {

    return (
        <div>
            <div className='pageActionContainer'>
            <p className="paneTitle">Note Options</p>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={pdfIcon} className='tocIcon'></img>
                        Export to PDF
                    </button>
                </div>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={mathIcon} className='tocIcon'></img>
                        Export to LaTeX
                    </button>
                </div>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={gitIcon} className='tocIcon'></img>
                        Push to Git
                    </button>
                </div>
                <p className="paneTitle">Actions</p>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={bookmarkIcon} className='tocIcon'></img>
                        Bookmark
                    </button>
                </div>
                <div className='pageActionItem'>
                    <button className='pageActionButton'>
                        <img src={deleteIcon} className='tocIcon'></img>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageActionContainer;
