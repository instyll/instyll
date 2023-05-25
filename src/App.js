import React, { Component } from 'react';
// import Editor from './legacyEditor.js';
import { MilkdownEditorWrapper } from './mdWrapper.js';
import ReactMarkdown from 'react-markdown';
import './App.css';
import "highlight.js/styles/github.css";
import Sizzle from 'sizzle'
import { v4 as uuid } from 'uuid';
import 'katex/dist/katex.min.css'
import { Allotment } from "allotment";
import TemplateModal from "./modal/TemplateModal";
import "allotment/dist/style.css";
import getFilesInDirectory from './fileUtils';
import chokidar from 'chokidar'
import fs from 'fs';
import debounce from 'lodash/debounce';
import CommandPalette from 'react-command-palette';
import MenuBar from './components/menuBar';
import TableOfContents from './components/toc.js';
import Calendar from 'react-calendar';
import sampleHeader from './command-palette/commandPaletteHeader.js';
// import moment from 'moment';
import { FILE, SET_THEME, OPEN, CLOSE, TOGGLE, CREATE, DAILY } from './constants.ts';
import TopicModal from './modal/TopicModal.js';
import OutlineContainer from './components/OutlineContainer.js';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home.js';
import EditorView from './components/editorView.js';
import Timeline from './components/timeline.js';

import './command-palette/commandPalette.css';
import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-nord.css';

class App extends Component {

  render() {

    return (
      <div className="App">

        {/* <Router> */}

        {/* <EditorView></EditorView> */}
        <Router>
          <Routes>
            <Route path="/" element={<EditorView />} />
            <Route path="/home" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </Router>

        {/* </Router> */}

      </div>
    );
  }
}


export default App;