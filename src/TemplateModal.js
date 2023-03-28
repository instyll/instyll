import React, { useState } from 'react';
import Modal from 'react-modal';

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
        },
        content: {
            backgroundColor: "var(--bg-color)",
            color: "var(--primary-text)",
            fontFamily: "SF Pro Display",
            borderRadius: "10px",
            border: "1px solid var(--muted-text)",
            fontSize: "1.2em",
        }
      }}
    >
      <div className="modal-header">
        <h2>Select Template</h2>
        <button
        style={{
          fontFamily: "SF Pro Display",
          padding: "5px 5px 5px 5px",
          fontSize: "1em",
        }} 
        onClick={onHide}>Close</button>
      </div>
      <div className="modal-body">
        <div>
          <label>Search bar:</label>
          <input type="text" />
        </div>
        <div>
          <label>Categories:</label>
          <button style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",
          }}>Business</button>
          <button style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",
          }}>Education</button>
          <button style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",
          }}>Creative</button>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td><button onClick={() => handleSelectTemplate('Template 1')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 1</button></td>
                <td><button onClick={() => handleSelectTemplate('Template 2')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 2</button></td>
                <td><button onClick={() => handleSelectTemplate('Template 3')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 3</button></td>
              </tr>
              <tr>
                <td><button onClick={() => handleSelectTemplate('Template 4')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 4</button></td>
                <td><button onClick={() => handleSelectTemplate('Template 5')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 5</button></td>
                <td><button onClick={() => handleSelectTemplate('Template 6')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 6</button></td>
              </tr>
              <tr>
                <td><button onClick={() => handleSelectTemplate('Template 7')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 7</button></td>
                <td><button onClick={() => handleSelectTemplate('Template 8')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 8</button></td>
                <td><button onClick={() => handleSelectTemplate('Template 9')} style={{
            fontFamily: "SF Pro Display",
            padding: "5px 5px 5px 5px",
            fontSize: "1em",

          }}>Template 9</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
                  style={{
                    fontFamily: "SF Pro Display",
                    padding: "5px 5px 5px 5px",
                    fontSize: "1em",
                  }} 
          onClick={() => setSelectedTemplate(null)}>Preview</button>
          <button
                  style={{
                    fontFamily: "SF Pro Display",
                    padding: "5px 5px 5px 5px",
                    fontSize: "1em",
                  }} 
          onClick={handleInsert} disabled={!selectedTemplate}>Insert</button>
        </div>
      </div>
    </Modal>
  );
};

export default TemplateModal;