import React from 'react';
import './App.css';

function TableOfContents(props) {
  return (
    <div className="tableOfContents">
      <div className="tableInfo">
        <p className="tocTitleFirst">Files</p>
        <div className="fileSys">
          {props.fileNames.map((file, index) => (
            <button
              key={index}
              className="fileElem"
              onClick={() => props.handleClick(file)}>{file.replace(/^.*[\\/]/, '')}</button>
          ))}
        </div>
        <p className='tocTitle'>Stats</p>
        <div className="pageInfo">
          <span className="leftStatComponents">
            <div className="infoDisplay"><div className="label">Characters</div></div>
            <div className="infoDisplay"><div className="label">Words</div></div>
          </span>
          <span className="rightStatComponents">
            <div className="infoDisplay"><span className="precount">{props.charCount}</span>/{props.charCount}</div>
            <div className="infoDisplay"><span className="precount">{props.wordCount}</span>/{props.wordCount} </div>
          </span>
        </div>
        <br></br>
        <br></br>
        <p className='tocTitle'>Outline</p>
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
        </div>
      </div>
    </div>
  );
}

export default React.memo(TableOfContents);