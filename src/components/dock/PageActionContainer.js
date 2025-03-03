/**
 * @author wou
 */
import html2pdf from 'html2pdf.js';
import path from 'path';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "../../App.css";
import { addBookmark } from '../../bookmarkSlice';
import { removeDocument } from '../../documentSlice';
import UpdateDocumentModal from '../../modal/document/UpdateDocumentModal';
import PageActionItem from './PageActionItem';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
                <PageActionItem title={`Export to PDF`} icon={1}></PageActionItem>
                </div>
                {/* <PageActionItem title={`Export to LaTeX`} icon={mathIcon}></PageActionItem>
                <PageActionItem title={`Push to Git`} icon={gitIcon}></PageActionItem> */}
            
                <p className="paneTitle">Actions</p>
                <div onClick={() => setUpdateDocumentModalOpen(true)}>
                <PageActionItem title={`Rename`} icon={2}></PageActionItem>
                </div>
                <div onClick={() => handleBookmarkDocument()}>
                <PageActionItem title={`Bookmark`} icon={3}></PageActionItem> 
                </div>
                <div onClick={handleDeleteDocument}>
                <PageActionItem title={`Delete`} icon={4}></PageActionItem>            
                </div>
            </div>
        </div>
    );
}

const removeMdExtension = (filename) => {
    return path.basename(filename, '.md');
}

export default PageActionContainer;
