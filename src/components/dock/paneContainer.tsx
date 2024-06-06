import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import '../../App.css';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';


const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

type PDFFile = string | File | null;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>('./sample.pdf');

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const clearFile = () => {
    setFile("./sample.pdf")
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage = () => {
    changePage(-1);
  }

  const nextPage = () => {
    changePage(1);
  }


  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  return (
    <div>

      <div
        className='pdfToolbarContainer'
        style={{
          display: file === "./sample.pdf" ? "none" : "inline-block",
        }}
      >

        <div className='pdfExitContainer'>
          <button 
          className='pdfExitButton'
          onClick={clearFile}>
            Exit
          </button>
        </div>

        <div className={`pdfNavContainer ${pageNumber <= 1 ? "disabled" : ""}`}
        onClick={previousPage}>
          <div className='pdfNavWrapper'>
          <ChevronLeft size={20} className='buttonIcon'/>
          </div>
        </div>

        <div className='pdfCurrentPageContainer'>
          <span className='pdfCurrentPage'>
          {pageNumber || (numPages ? 1 : '--')}
          </span>
        </div>
        <div className='pdfPageInfoContainer'>
          <span className='pdfPageInfo'>of {numPages || '--'}</span>
        </div>

        <div className={`pdfNavContainer ${pageNumber >= numPages ? "disabled" : ""}`}
        onClick={nextPage}>
          <div className='pdfNavWrapper'>
          <ChevronRight size={20} className='buttonIcon'/>
          </div>
        </div>

      </div>

      <div
        className='selectPDFButtonContainer'
        style={{
          display: file !== "./sample.pdf" ? "none" : "initial",
        }}>
        <input onChange={onFileChange} type="file" id="fileUpload" className='hidden' />
        <label
          className="selectPDFButton"
          for="fileUpload"
        >Select PDF
        </label>
      </div>

      <div className="Example__container">
        <div className="Example__container__load">

          <div className="Example__container__document">

            {/* <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document> */}
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>

          </div>
        </div>
      </div>
    </div>
  );
}
