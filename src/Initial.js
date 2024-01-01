/**
 * @author wou
 */
// initial page shown on startup to allow users to choose/select storage path
import React from 'react';
import { useDispatch } from 'react-redux';
import { addPath } from './pathSlice';
import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';

import './Initial.css'

const Initialize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectFolder = async () => {
    const folderPath = ipcRenderer.sendSync('select-folder');
    if (folderPath) {
        dispatch(addPath(folderPath))
        navigate("/home")
    }
  };

  return (
    <div className='initialContainer'>
        <div className='initialWrapper'>
            <h1 className='initialHeading'>Welcome to Instyll</h1>
            <span className='initialVersioning'>Version 0.1.0-beta</span>
            <div className='initialSelectFolderContainer'>
                <div className='initialText'>
                    <span className='initialSelectFolderLabel'>Create new folder</span>
                    <span className='initialSelectFolderLabelSecondary'>Create a new folder to store your notes.</span>
                </div>
                <button 
                onClick={handleSelectFolder}
                className='initialPrimaryButton'
                >Create
                </button>
            </div>
            <div className='initialSelectFolderContainer'>
                <div className='initialText'>
                    <span className='initialSelectFolderLabel'>Open existing folder</span>
                    <span className='initialSelectFolderLabelSecondary'>Use an existing folder of markdown notes.</span>
                </div>
                <button 
                onClick={handleSelectFolder}
                className='initialSecondaryButton'
                >Open
                </button>
            </div>
        </div>
    </div>
  );
};

export default Initialize;