/**
 * @author wou
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DocumentModal from '../modal/CreateDocumentModal';
import QueryModal from '../modal/QueryModal';
import classNames from 'classnames';
import '../App.css';
// Assets
import logo from '../icons/keylight3.png'
import search from '../icons/search.png'
import create from '../icons/create.png'
import back from '../icons/arrowback.png';
import forward from '../icons/arrowforward.png';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchSelectors, createSearchAction } from 'redux-search';

function MenuBar(props) {

  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  // const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const location = useLocation();

  const documents = useSelector((state) => state.documents.documents)
  // console.log("documents: " + documents)

  // const handleSearchQuery = (e) => {
  //   setQuery(e.target.value);
  // }

  // const fuzzySearch = (input) => {
  //   return documents.filter((doc) =>
  //     doc[1].toString().toLowerCase().includes(input.toString().toLowerCase())
  //   );
  // };

  // const filteredDocuments = query ? fuzzySearch(query) : documents;

  // console.log(filteredDocuments)

  /* allow nav arrows to go to previous or next route */
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous route
  };

  const handleGoForward = () => {
    navigate(1); // Go forward to the next route
  };

  const handleDocumentModalOpen = (value) => {
    setDocumentModalOpen(value);
  }

  return (
    <div className={classNames('menuBar', 'drag')}>

      <DocumentModal
        show={documentModalOpen}
        onHide={() => setDocumentModalOpen(false)}
      />

      <QueryModal 
      show={queryModalOpen}
      onHide={() => setQueryModalOpen(false)}
      />

      <div className="menuIconLogo" id="left">
        <img
          src={back}
          className={`icon ${location.key === "default" ? "disabled" : ""}`}
          id="navLeft"
          draggable={false}
          onClick={() => {
            if (location.key !== 'default') {
              handleGoBack();
            }
          }
          }
        />
      </div>
      <div className="menuIconLogo">
        <img
          src={forward}
          className="icon"
          id="navRight"
          draggable={false}
          onClick={handleGoForward}
        />
      </div>
      <div className='searchWrapper'>
        <img src={search} className="searchIcon" draggable={false}></img>
      </div>
      <input className="search" 
      placeholder="Search your notes"
      // onChange={handleSearchQuery}
      onClick={setQueryModalOpen}
      >
      </input>
      <button
        className="menuAddOptionButton"
        onClick={setDocumentModalOpen}
      >
        <img src={create} className="buttonIcon" draggable={false}></img>
        <span className="buttonText">New</span>
      </button>
    </div>
  );
}

export default React.memo(MenuBar);