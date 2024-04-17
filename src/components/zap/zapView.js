/**
 * @author wou
 */
import React, { useState } from 'react';
// import Editor from './legacyEditor.js';
import '../../App.css';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css'
import "allotment/dist/style.css";
import sparkleIcon from '../../icons/sparkleWhite.png';

import 'react-calendar/dist/Calendar.css';
import 'prism-themes/themes/prism-nord.css';

import layoutGrid from '../../icons/layoutGrid.png';
import layoutList from '../../icons/layoutList.png';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ZapItem from './zapItem';
import CreateZapButton from './createZapButton';
import CreateZapModal from '../../modal/zap/CreateZapModal';
import { generateZaps } from '../../actions';

const ZapView = ({ location }) => {

    const [createZapModalOpen, setCreateZapModalOpen] = useState(false);

    const dispatch = useDispatch();

    const zapList = useSelector((state) => state.zaps.zaps);
    const documents = useSelector((state) => state.documents.documents);

    return (
        <div className="EditorView">

            {/* <Router> */}

            <div className='container'>

                <div className="topicView">
                    <div className="dashboardWrapper" style={{
                        width: "100%",
                    }}>
                        <div className="dashboardGreetingContainer">

                        <CreateZapModal
                            show={createZapModalOpen}
                            onHide={() => setCreateZapModalOpen(false)}
                        />

                            <div className="topicTitleWrapper">
                                <h1 className="heroTitle">
                                    Zaps
                                </h1>
                                <div className='changeTopicViewButtonContainer'>
                                    <button className='zapGenerationButton' onClick={() => generateZaps(documents)}>
                                    <img src={sparkleIcon} className='buttonIcon' />
                                    Generate
                                    </button>
                                </div>
                               
                            {/* <div className='canScroll'> */}
                            <div className='dashboardTopicsContainer'>
                               <div className='zapViewContainer'>
                               <CreateZapButton setCreateZapModalOpen={() => setCreateZapModalOpen(true)}></CreateZapButton>
                                    {
                                        zapList.map((zap) => (
                                            <ZapItem zapId={zap}></ZapItem>
                                        ))
                                    }                               </div>
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
