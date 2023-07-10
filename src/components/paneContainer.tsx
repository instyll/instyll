// import React, { useRef, useState, useEffect } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import '../App.css';
// import pdf from '../icons/pdf.png';
// import "react-pdf/dist/esm/Page/TextLayer.css";

// const PdfUploadButton = () => {
//     const fileInputRef = useRef(null);
//     const [file, setFile] = useState(null);

//     const [numPages, setNumPages] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);  

//     const handleButtonClick = () => {
//         fileInputRef.current.click();
//     };

//     const handleFileSelect = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile && selectedFile.type === 'application/pdf') {
//             setFile(selectedFile);
//         }
//     };

//     const onDocumentLoadSuccess = () => {
//         setNumPages(numPages);
//     }

//     useEffect(() => {
//         pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//     });

//     return (
//         <div className="pdfUploadContainer">
//             <div className='selectPDFButtonContainer'>
//                 <button
//                     className='selectPDFButton'
//                     onClick={handleButtonClick}
//                 >
//                     <img src={pdf} className='buttonIcon' alt="PDF Icon" />
//                     <span className='buttonText'>Select PDF</span>
//                 </button>
//                 <input
//                     type="file"
//                     ref={fileInputRef}
//                     accept="application/pdf"
//                     style={{ display: 'none' }}
//                     onChange={handleFileSelect}
//                 />
//             </div>
//             <div className='pdfDisplayContainer'>
//                 {/* Render the PDF */}
//                 {(
//                     <Document 
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     file={file}
//                     renderTextLayer={false}
//                     renderAnnotationLayer={false}
//                     customTextRenderer={false}
//                     >
//                         <Page pageNumber={pageNumber} />
//                     </Document>
//                 )}
//                 <p>
//                     Page {pageNumber} of {numPages}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default PdfUploadButton;
import React, { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import '../App.css';

import { PDFDocumentProxy } from 'pdfjs-dist';

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

type PDFFile = string | File | null;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>('./sample.pdf');
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__load">
          <input onChange={onFileChange} type="file" id="fileUpload" className='hidden'/>
          <label className="selectPDFButton" for="fileUpload">Select PDF</label>
        </div>
        <div className="Example__container__document">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
