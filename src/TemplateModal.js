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
            fontSize: "1em",
            boxSizing: "border-box",
            width: "calc(100% - 800px)",
            height: "calc(100% - 200px)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }
      }}
    >
      <div className="modal-header">
        <h2>Insert Block</h2>
        <button
        className="modalCloseButton"
        onClick={onHide}>✕</button>
      </div>
      <div className="modal-body">
        <div>
          <button className="modalCategoryButton">Business</button>
          <button className="modalCategoryButton">Education</button>
          <button className="modalCategoryButton">Creative</button>
        </div>
        <div>
          <table className="templateSelectorContainer">
            <tbody>
              <tr>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 1')}>Template 1</div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 2')}>Template 2</div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 3')}>Template 3</div></td>
              </tr>
              <tr>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 4')}>Template 4</div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 5')}>Template 5</div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 6')}>Template 6</div></td>
              </tr>
              <tr>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 7')}>Template 7</div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 8')}>Template 8</div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 9')}>Template 9</div></td>
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