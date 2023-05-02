import React from 'react';
import './App.css';
import randomColor from 'randomcolor';

// assets
import tags from './icons/tag2.png';
import home from './icons/home.png';
import recent from './icons/recent.png';
import template from './icons/template2.png';
import favorites from './icons/bookmark2.png';
import note from './icons/note2.png';

function TableOfContents(props) {

  return (
    <div className="tableOfContents">
      <div className="tableInfo">
        <p className="tocTitleFirst">
          <img src={home} className="tocIcon"></img>
          <span className="tocInnerText">Home</span></p>
        <p className="tocTitle">
          <img src={recent} className="tocIcon"></img>
          <span className="tocInnerText">Recent</span></p>
        <p className="tocTitle">
          <img src={template} className="tocIcon"></img>
          <span className="tocInnerText">Templates</span></p>
        <p className="tocTitle" id="breakSection">
          <img src={tags} className="tocIcon"></img>
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
          <button className="topic" >
            daily note
          </button>
        </div>
        <p className="tocTitle" id="breakSection">
          <img src={favorites} className="tocIcon"></img>
          <span className="tocInnerText">Bookmarks</span></p>
        <div className="fileSys">
          {props.fileNames.map((file, index) => (
            <button
              key={index}
              className="fileElem"
              onClick={() => props.handleClick(file)}>
              <img src={note} className="tocIcon"></img>
              <span className="tocInnerText">{file.replace(/^.*[\\/]/, '')}</span>
            </button>
          ))}
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default React.memo(TableOfContents);