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
        <div className="modalCategorySelectorContainer">
          <button className="modalCategoryButton">Business</button>
          <button className="modalCategoryButton">Education</button>
          <button className="modalCategoryButton">Creative</button>
          <button className="modalCategoryButton">Lifestyle</button>
        </div>
        <div>
          <table className="templateSelectorContainer">
            <tbody>
              <tr>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 1')}><span className="templateName"><div className="templateNameLabel">Project Management</div></span></div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 2')}><span className="templateName"><div className="templateNameLabel">Meeting Notes</div></span></div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 3')}><span className="templateName"><div className="templateNameLabel">Meeting Agenda</div></span></div></td>
              </tr>
              <tr>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 4')}><span className="templateName"><div className="templateNameLabel">Report</div></span></div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 5')}><span className="templateName"><div className="templateNameLabel">Lecture Notes</div></span></div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 6')}><span className="templateName"><div className="templateNameLabel">Brainstorming</div></span></div></td>
              </tr>
              <tr>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 7')}><span className="templateName"><div className="templateNameLabel">Daily Journal</div></span></div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 8')}><span className="templateName"><div className="templateNameLabel">Goal Setting</div></span></div></td>
                <td><div 
                className="templateSelector"
                onClick={() => handleSelectTemplate('Template 9')}><span className="templateName"><div className="templateNameLabel">To-do List</div></span></div></td>
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