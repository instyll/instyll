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
import Topics from './components/topic/topics.js';
import TopicNoteViewer from './components/topic/topicNoteViewer';
import DocumentViewer from './components/document/documentsViewer';
import ZapView from './components/zap/zapView';
import Login from './Login';

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
            <Route path="/" element={<Login />}/>
            <Route path="/app" element={<Layout> <EditorView /> </Layout>} />
            {/* <Route path="/" element={<Layout> <EditorView /> </Layout>} /> */}
            <Route path="/home" element={<Layout> <Home /> </Layout>} />
            <Route path="/documents" element={<Layout> <DocumentViewer /> </Layout>} />
            <Route path="/topics" element={<Layout> <Topics /> </Layout>} />
            <Route path="/topics/:topicId" element={<Layout> <TopicNoteViewer /> </Layout>} />
            <Route path="/zap" element={<Layout> <ZapView /> </Layout>}></Route>
          </Routes>
        </HashRouter>
      </div>

    </Provider>

    );
  }
}


export default App;