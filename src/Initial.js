/**
 * @author wou
 */
// initial page shown on startup to allow users to choose/select storage path
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPath } from './pathSlice';
import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';
import { VERSION } from "./version.ts";

import './Initial.css'

const Initialize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useSelector((state) => state.path.path);

  const handleSelectFolder = async () => {
    const folderPath = ipcRenderer.sendSync('select-folder');
    if (folderPath) {
        dispatch(addPath(folderPath))
        navigate("/home")
    }
  };

  const handleCreateFolder = async () => {
    const createdFolderPath = ipcRenderer.sendSync('create-folder')
    if (createdFolderPath) {
        dispatch(addPath(createdFolderPath))
        navigate('/home')
    }
  }

  useEffect(() => {
    if (path) {
      navigate("/home")
    } 
  }, [])

    return (
      <div className='initialContainer drag'>
          <div className='initialWrapper'>
              <h1 className='initialHeading'>Welcome to Instyll</h1>
              <span className='initialVersioning'>Version {VERSION}</span>
              <div className='initialSelectFolderContainer'>
                  <div className='initialText'>
                      <span className='initialSelectFolderLabel'>Create new folder</span>
                      <span className='initialSelectFolderLabelSecondary'>Create a new folder to store your notes.</span>
                  </div>
                  <button 
                  onClick={handleCreateFolder}
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