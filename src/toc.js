import React from 'react';
import './App.css';
import randomColor from 'randomcolor';

// assets
import tags from './icons/tag.png';

function TableOfContents(props) {

  return (
    <div className="tableOfContents">
      <div className="tableInfo">
        <p className="tocTitleFirst"><span className="tocInnerText">Home</span></p>
        <p className="tocTitle"><span className="tocInnerText">Recent</span></p>
        <p className="tocTitle"><span className="tocInnerText">Templates</span></p>
        <p className="tocTitle" id="breakSection">
        {/* <img src={tags} className="tocIcon"></img> */}
          <span className="tocInnerText">Topics</span></p>
 <div className="fileViewTopicsContainer">
      <button className="topic" >
        chemistry
      </button>
      <button className="topic" >
        physics
      </button>
      <button className="topic" >
        projects
      </button>
      <button className="topic" >
        english
      </button>
      <button className="topic" >
        marketing
      </button>
    </div>
        <p className="tocTitle" id="breakSection">Starred</p>
        <div className="fileSys">
          {props.fileNames.map((file, index) => (
            <button
              key={index}
              className="fileElem"
              onClick={() => props.handleClick(file)}>{file.replace(/^.*[\\/]/, '')}</button>
          ))}
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default React.memo(TableOfContents);