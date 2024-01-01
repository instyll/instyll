/**
 * @author wou
 */
// initial page shown on startup to allow users to choose/select storage path
import React from 'react';
import { useDispatch } from 'react-redux';
import { addPath } from './pathSlice';
import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Folder Selection Page</h1>
      <button onClick={handleSelectFolder}>Select Folder</button>
    </div>
  );
};

export default Initialize;