import React, { Component } from 'react';
// import Editor from './legacyEditor.js';
import './App.css';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css'
import "allotment/dist/style.css";
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import Home from './components/home.js';
import EditorView from './components/editorView.js';
import Timeline from './components/timeline.js';
import { Provider } from 'react-redux';
import { store } from './store.js';
import Layout from './components/layout.js';
import Topics from './components/topics.js';
import TopicNoteViewer from './components/topicNoteViewer';
import DocumentViewer from './components/documentsViewer';

import './command-palette/commandPalette.css';
import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-nord.css';

class App extends Component {

  render() {

    return (

      <Provider store={store}>

      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout> <EditorView /> </Layout>} />
            <Route path="/home" element={<Layout> <Home /> </Layout>} />
            <Route path="/documents" element={<Layout> <DocumentViewer /> </Layout>} />
            <Route path="/topics" element={<Layout> <Topics /> </Layout>} />
            <Route path="/topics/:topicId" element={<Layout> <TopicNoteViewer /> </Layout>} />
          </Routes>
        </HashRouter>
      </div>

    </Provider>

    );
  }
}


export default App;