import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

const TemplateModal = ({ show, onHide }) => {

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  }

  const handleInsert = () => {
    // Do something with selectedTemplate, e.g. insert it into the editor
    onHide();
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={onHide}
      contentLabel="Select Template Modal"
      style={{
        overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: "999",
        },
        content: {
            backgroundColor: "var(--bg-color)",
            color: "var(--primary-text)",
            fontFamily: "SF Pro Display",
            borderRadius: "10px",
            border: "1px solid var(--muted-text)",
            fontSize: "1.2em",
            boxSizing: "border-box",
        }
      }}
    >
      <div className="modal-header">
        <h2>Select Template</h2>
        <button
        className="modalCloseButton"
        onClick={onHide}>Close</button>
      </div>
      <div className="modal-body">
        <div>
          <label>Search bar:</label>
          <input type="text" />
        </div>
        <div>
          <label>Categories:</label>
          <button className="modalDefaultButton">Business</button>
          <button className="modalDefaultButton">Education</button>
          <button className="modalDefaultButton">Creative</button>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 1')}>Template 1</button></td>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 2')}>Template 2</button></td>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 3')}>Template 3</button></td>
              </tr>
              <tr>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 4')}>Template 4</button></td>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 5')}>Template 5</button></td>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 6')}>Template 6</button></td>
              </tr>
              <tr>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 7')}>Template 7</button></td>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 8')}>Template 8</button></td>
                <td><button 
                className="modalDefaultButton"
                onClick={() => handleSelectTemplate('Template 9')}>Template 9</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
          className="modalDefaultButton"
          onClick={() => setSelectedTemplate(null)}>Preview</button>
          <button
          className="modalDefaultButton"
          onClick={handleInsert} disabled={!selectedTemplate}>Insert</button>
        </div>
      </div>
    </Modal>
  );
};

export default TemplateModal;