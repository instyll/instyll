/**
 * @author wou
 */
import html2pdf from 'html2pdf.js';
import path from 'path';
import React, { useState } from 'react';
import "../../App.css";
import PageActionItem from './PageActionItem';
import UpdateDocumentModal from '../../modal/document/UpdateDocumentModal';
import { removeDocument } from '../../documentSlice';
import { addBookmark } from '../../bookmarkSlice';
import { ToastContainer, toast } from 'react-toastify';

import bookmarkIcon from '../../icons/bookmark.png';
import pdfIcon from '../../icons/pdf1.png';
import renameIcon from '../../icons/rename.png';
import deleteIcon from '../../icons/trash.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

function PageActionContainer({ rightPanelOpen, documentPath, documentRef}) {

    const [updateDocumentModalOpen, setUpdateDocumentModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notify = () => toast("Note Bookmarked!");

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

    //delete document
    const handleDeleteDocument = () => {
        dispatch(removeDocument([documentPath]))
        navigate('/documents')
    }

    //bookmark document
    const handleBookmarkDocument = () => {
        dispatch(addBookmark(selectedDocument))
        notify();
    }    

    const selectedDocument = useSelector((state) => {
        const documents = state.documents.documents;
        const documentIndex = documents.findIndex(doc => doc[3] === documentPath);
    
        if (documentIndex !== -1) {
          return documents[documentIndex];
        }
        return null; 
    })

    const handleClose = () => {
        setUpdateDocumentModalOpen(false);
    }

    return (
        <div>

            <UpdateDocumentModal 
            show={updateDocumentModalOpen} 
            onHide={() => setUpdateDocumentModalOpen(false)} 
            selectedDocument={selectedDocument}
            documentPath={documentPath}
            handleClose={handleClose}>
            </UpdateDocumentModal>

          <div className='pageActionContainer'>
            <p className="paneTitle">Note Options</p>
                <div onClick={exportPDF}>
                <PageActionItem title={`Export to PDF`} icon={pdfIcon}></PageActionItem>
                </div>
                {/* <PageActionItem title={`Export to LaTeX`} icon={mathIcon}></PageActionItem>
                <PageActionItem title={`Push to Git`} icon={gitIcon}></PageActionItem> */}
            
                <p className="paneTitle">Actions</p>
                <div onClick={() => setUpdateDocumentModalOpen(true)}>
                <PageActionItem title={`Rename`} icon={renameIcon}></PageActionItem>
                </div>
                <div onClick={() => handleBookmarkDocument()}>
                <PageActionItem title={`Bookmark`} icon={bookmarkIcon}></PageActionItem> 
                </div>
                <div onClick={handleDeleteDocument}>
                <PageActionItem title={`Delete`} icon={deleteIcon}></PageActionItem>            
                </div>
            </div>
        </div>
    );
}

const removeMdExtension = (filename) => {
    return path.basename(filename, '.md');
}

export default PageActionContainer;
