import React, { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Select from 'react-select';

import '../App.css';
import forward from '../icons/forward.png';
import back from '../icons/back.png';

import { PDFDocumentProxy } from 'pdfjs-dist';

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

type PDFFile = string | File | null;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>('./sample.pdf');

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
          <button className='pdfExitButton'>
            Exit
          </button>
        </div>

        {/* <div className='pdfZoomContainer'>
          <img src={demagnify} className='buttonIcon'></img>
        </div>

        <div className='pdfZoomContainer' id="plus">
          <img src={magnify} className='buttonIcon'></img>
        </div>

        <div className='pdfZoomSelectContainer'>
          <Select
            options={options}
            placeholder=""
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: "10px",
                borderColor: "transparent",
                width: "36px",
                fontFamily: "var(--font)",
                backgroundColor: "transparent",
              }),
              input: (baseStyles, state) => ({
                ...baseStyles,
                color: "var(--secondary-text)",
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: "10px",
                backgroundColor: "var(--elevated-bg)",
                fontFamily: "var(--font)",
              }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,
                color: "var(--secondary-text)",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: "var(--primary-text)",
              }),
              indicatorSeparator: (baseStyles, state) => ({
                ...baseStyles,
                display: "none !important",
                backgroundColor: "transparent",
              }),
              valueContainer: (baseStyles, state) => ({
                ...baseStyles,
                display: "none !important",
                backgroundColor: "transparent",
              }),
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                color: "var(--secondary-text)",
                paddingLeft: "0px",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: 'var(--muted-text)',
                primary: 'var(--muted-text)',
              },
            })}
          />
        </div> */}

        <div className='pdfNavContainer'
        onClick={previousPage}>
          <img src={back} className='buttonIcon'></img>
        </div>

        <div className='pdfCurrentPageContainer'>
          <span className='pdfCurrentPage'>
          {pageNumber || (numPages ? 1 : '--')}
          </span>
        </div>
        <div className='pdfPageInfoContainer'>
          <span className='pdfPageInfo'>of {numPages || '--'}</span>
        </div>

        <div className='pdfNavContainer'
        onClick={nextPage}>
          <img src={forward} className='buttonIcon'></img>
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
