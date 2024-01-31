/**
 * @author wou
 */
import React, { useState } from 'react';
import PageActionItem from './PageActionItem';
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

                <PageActionItem title={`Export to PDF`} icon={pdfIcon}></PageActionItem>
                <PageActionItem title={`Export to LaTeX`} icon={mathIcon}></PageActionItem>
                <PageActionItem title={`Push to Git`} icon={gitIcon}></PageActionItem>
            
                <p className="paneTitle">Actions</p>

                <PageActionItem title={`Rename`} icon={renameIcon}></PageActionItem>
                <PageActionItem title={`Bookmark`} icon={bookmarkIcon}></PageActionItem> 
                <PageActionItem title={`Delete`} icon={deleteIcon}></PageActionItem>            
            </div>
        </div>
    );
}

export default PageActionContainer;
