import React, { useEffect } from 'react';
// import Editor from './legacyEditor.js';
import "allotment/dist/style.css";
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Initialize from './Initial.js';
import BookmarkViewer from './components/bookmark/bookmarksViewer.js';
import DocumentViewer from './components/document/documentsViewer';
import EditorView from './components/editorView.js';
import Home from './components/home.js';
import Layout from './components/layout.js';
import TopicNoteViewer from './components/topic/topicNoteViewer';
import Topics from './components/topic/topics.js';
import { store } from './store.js';

import 'prism-themes/themes/prism-nord.css';
import 'react-calendar/dist/Calendar.css';
import './command-palette/commandPalette.css';

const App = () => {

  const lastSetTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
      const html = document.querySelector("html");
      html.setAttribute("data-theme", lastSetTheme);                        
    }, [])

    return (

      <Provider store={store}>

      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Initialize />}/>
            <Route path="/editor" element={<Layout> <EditorView /> </Layout>} />
            {/* <Route path="/" element={<Layout> <EditorView /> </Layout>} /> */}
            <Route path="/home" element={<Layout> <Home /> </Layout>} />
            <Route path="/documents" element={<Layout> <DocumentViewer /> </Layout>} />
            <Route path="/topics" element={<Layout> <Topics /> </Layout>} />
            <Route path="/topics/:topicId" element={<Layout> <TopicNoteViewer /> </Layout>} />
            <Route path="/bookmark" element={<Layout> <BookmarkViewer /> </Layout>}></Route>
          </Routes>
        </HashRouter>
      </div>

    </Provider>

    );
}


export default App;