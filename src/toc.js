import React from 'react';
import './App.css';

// assets
import tags from './icons/tag.png';

function TableOfContents(props) {
  return (
    <div className="tableOfContents">
      <div className="tableInfo">
        <p className="tocTitleFirst">
        {/* <img src={tags} className="tocIcon"></img> */}
          <span className="tocInnerText">Topics</span></p>
        <div className="fileSys">
          {props.fileNames.map((file, index) => (
            <button
              key={index}
              className="fileElem"
              onClick={() => props.handleClick(file)}>{file.replace(/^.*[\\/]/, '')}</button>
          ))}
        </div>
        <p className="tocTitle">Starred</p>
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