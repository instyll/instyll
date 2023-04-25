import React from 'react';
import './App.css';
import randomColor from 'randomcolor';

// assets
import tags from './icons/tag.png';

function TableOfContents(props) {

  // const colors = randomColor({ count: 5, luminosity: 'light', hue: 'random' });
  // const { hue, saturation, lightness } = randomColor({ hue: colors[0], format: 'hsl' });

  return (
    <div className="tableOfContents">
      <div className="tableInfo">
        <p className="tocTitleFirst"><span className="tocInnerText">Home</span></p>
        <p className="tocTitle"><span className="tocInnerText">Recent</span></p>
        <p className="tocTitle"><span className="tocInnerText">Templates</span></p>
        <p className="tocTitle" id="breakSection">
        {/* <img src={tags} className="tocIcon"></img> */}
          <span className="tocInnerText">Topics</span></p>
        {/* <div className="fileSys">
          {props.fileNames.map((file, index) => (
            <button
              key={index}
              className="fileElem"
              onClick={() => props.handleClick(file)}>{file.replace(/^.*[\\/]/, '')}</button>
          ))}
        </div> */}
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
        {/* <p className='tocTitle'>Outline</p>
        <div>
          {
            props.tocHeaders.map((header, index) => (
              <div key={index} className="outlineElement">
                <a href={`#${header.id}`} className="headerNav">
                  <span className="headerDelim">
                    {
                      header.type === 'H2' ? '## ' :
                        header.type === 'H3' ? '### ' :
                          header.type === 'H4' ? '#### ' :
                            header.type === 'H5' ? '##### ' :
                              header.type === 'H6' ? '###### ' : '# '}
                  </span>
                  {header.text}
                </a>
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
}

export default React.memo(TableOfContents);