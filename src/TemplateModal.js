import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

// Example templates
const templates = [
  { id: 1, name: 'Template 1', content: 'This is the content of template 1' },
  { id: 2, name: 'Template 2', content: 'This is the content of template 2' },
  { id: 3, name: 'Template 3', content: 'This is the content of template 3' },
  { id: 4, name: 'Template 4', content: 'This is the content of template 4' },
  { id: 5, name: 'Template 5', content: 'This is the content of template 5' },
  { id: 6, name: 'Template 6', content: 'This is the content of template 6' },
  { id: 7, name: 'Template 7', content: 'This is the content of template 7' },
];

const TemplateModal = ({ isOpen, closeModal }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleInsertClick = () => {
    // Do something with selectedTemplate
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1 1 auto', paddingRight: '16px' }}>
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateClick(template)}
              style={{ display: 'block', marginBottom: '8px' }}
            >
              {template.name}
            </button>
          ))}
        </div>
        <div style={{ flex: '0 0 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <button onClick={closeModal} style={{ backgroundColor: 'red', width: '100%', height: '48px' }}></button>
          <button onClick={handleInsertClick} style={{ width: '100%', height: '48px' }}>Insert</button>
        </div>
      </div>
    </Modal>
  ); 
};

export default TemplateModal;