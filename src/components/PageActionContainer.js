/**
 * @author wou
 */
import React, { useState } from 'react';
import ReactDOMServer from "react-dom/server";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js'
import path from 'path';
import PageActionItem from './PageActionItem';
import "../App.css";

import pdfIcon from '../icons/pdf1.png'
import mathIcon from '../icons/math.png'
import gitIcon from '../icons/git.png'
import bookmarkIcon from '../icons/bookmark.png'
import deleteIcon from '../icons/trash.png'
import renameIcon from '../icons/rename.png'

function PageActionContainer({ rightPanelOpen, documentPath, documentRef}) {

    const options = {
        filename: removeMdExtension(documentPath) + '.pdf',
        margin: 1,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy']},
    };

    const exportPDF = () => {
        const element = document.getElementById('text');
        html2pdf().set(options).from(element).save();
      };

    return (
        <div>
            <div className='pageActionContainer'>
            <p className="paneTitle">Note Options</p>
                <div onClick={exportPDF}>
                <PageActionItem title={`Export to PDF`} icon={pdfIcon}></PageActionItem>
                </div>
                {/* <PageActionItem title={`Export to LaTeX`} icon={mathIcon}></PageActionItem>
                <PageActionItem title={`Push to Git`} icon={gitIcon}></PageActionItem> */}
            
                <p className="paneTitle">Actions</p>

                <PageActionItem title={`Rename`} icon={renameIcon}></PageActionItem>
                <PageActionItem title={`Bookmark`} icon={bookmarkIcon}></PageActionItem> 
                <PageActionItem title={`Delete`} icon={deleteIcon}></PageActionItem>            
            </div>
        </div>
    );
}

const removeMdExtension = (filename) => {
    return path.basename(filename, '.md');
}

export default PageActionContainer;
