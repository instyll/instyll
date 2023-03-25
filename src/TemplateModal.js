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
    >
      <h2>Select Template</h2>
      <div>
        <label>Search bar:</label>
        <input type="text" />
      </div>
      <div>
        <label>Categories:</label>
        <button>Business</button>
        <button>Education</button>
        <button>Creative</button>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td><button onClick={() => handleSelectTemplate('Template 1')}>Template 1</button></td>
              <td><button onClick={() => handleSelectTemplate('Template 2')}>Template 2</button></td>
              <td><button onClick={() => handleSelectTemplate('Template 3')}>Template 3</button></td>
            </tr>
            <tr>
              <td><button onClick={() => handleSelectTemplate('Template 4')}>Template 4</button></td>
              <td><button onClick={() => handleSelectTemplate('Template 5')}>Template 5</button></td>
              <td><button onClick={() => handleSelectTemplate('Template 6')}>Template 6</button></td>
            </tr>
            <tr>
              <td><button onClick={() => handleSelectTemplate('Template 7')}>Template 7</button></td>
              <td><button onClick={() => handleSelectTemplate('Template 8')}>Template 8</button></td>
              <td><button onClick={() => handleSelectTemplate('Template 9')}>Template 9</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => setSelectedTemplate(null)}>Preview</button>
        <button onClick={handleInsert} disabled={!selectedTemplate}>Insert</button>
      </div>
    </Modal>
  );
};

export default TemplateModal;