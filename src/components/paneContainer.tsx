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
    <div>

      <div
        className='pdfToolbarContainer'
        style={{
          display: file === "./sample.pdf" ? "none" : "inline-block",
        }}
      >

        <div className='pdfCurrentPageContainer'>
          <span className='pdfCurrentPage'>
            1
          </span>
        </div>
        <div className='pdfPageInfoContainer'>
          <span className='pdfPageInfo'>(1 of 20)</span>
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

            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>

          </div>
        </div>
      </div>
    </div>
  );
}
