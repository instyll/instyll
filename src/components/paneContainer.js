import React, { useRef, useState } from 'react';
import '../App.css';
import pdf from '../icons/pdf.png';

const PdfUploadButton = () => {
    const fileInputRef = useRef(null);
    const [filePath, setFilePath] = useState(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(file);
            setFilePath(fileURL);
            console.log(fileURL);
        }
    };

    return (
        <div>
            <div className='selectPDFButtonContainer'>
                <button
                    className='selectPDFButton'
                    onClick={handleButtonClick}
                >
                    <img src={pdf} className='buttonIcon' alt="PDF Icon" />
                    <span className='buttonText'>Select PDF</span>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                />
            </div>
            <div className='pdfDisplayContainer'>
                {/* Render the file path or the PDF */}
                {filePath && (
                    <iframe src={filePath} title="PDF Preview" width="auto" height="auto" />
                )}
            </div>
        </div>
    );
};

export default PdfUploadButton;
