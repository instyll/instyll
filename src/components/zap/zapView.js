/**
 * @author wou
 */
import React, { useState } from 'react';
// import Editor from './legacyEditor.js';
import '../../App.css';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css'
import "allotment/dist/style.css";

import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-nord.css';

import layoutGrid from '../../icons/layoutGrid.png';
import layoutList from '../../icons/layoutList.png';
import { useParams } from 'react-router-dom';

const ZapView = ({ location }) => {
    const [documentGridLayout, setDocumentGridLayout] = useState(true);
    const { topicId } = useParams();

    /* options for sorting topics */

    /* placeholder document info */

    return (
        <div className="EditorView">

            {/* <Router> */}

            <div className='container'>

                <div className="topicView">
                    <div className="dashboardWrapper" style={{
                        width: "100%",
                    }}>
                        <div className="dashboardGreetingContainer">
                            <div className="topicTitleWrapper">
                                <h1 className="heroTitle">
                                    Zaps
                                </h1>
                               
                            {/* <div className='canScroll'> */}
                            <div className='dashboardTopicsContainer'>
                               
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* </Router> */}

        </div>
        </div>
    );
}

export default ZapView;
