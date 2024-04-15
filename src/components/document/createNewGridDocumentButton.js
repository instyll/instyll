/**
 * @author wou
 */
import React from 'react';
import "../../App.css";

import createDoc from '../../icons/plus1.png';

const CreateGridDocumentButton = ({setCreateDocumentModalOpen}) => {
    return (
    <div 
    className='createNewDocumentContainer'
    onClick={setCreateDocumentModalOpen}
    >
        <div className='documentIconContainer'>
            <div className='topicIconWrapper'>
                <span>
                    <img src={createDoc} className='buttonIcon'>
                    </img>
                </span>
            </div>
        </div>
    </div>
    );
};

export default CreateGridDocumentButton;