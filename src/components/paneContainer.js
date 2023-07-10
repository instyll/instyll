import React, { useRef } from 'react';
import '../App.css';
import pdf from '../icons/pdf.png';

const PdfUploadButton = ({ onFileSelect }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            onFileSelect(file);
        }
    };

    return (
        <div className='selectPDFButtonContainer'>
            <button
                className='selectPDFButton'
                onClick={handleButtonClick}>
                    <img src={pdf} className='buttonIcon'></img>
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
    );
};

export default PdfUploadButton;
