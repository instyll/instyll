/**
 * @author wou
 */
import React from 'react';
import "../App.css";

import createTopic from '../icons/plus1.png';

const CreateGridTopicButton = ({setCreateTopicModalOpen}) => {
    return (
    <div 
    className='createNewTopicContainer'
    onClick={setCreateTopicModalOpen}
    >
        <div className='topicIconContainer'>
            <div className='topicIconWrapper'>
                <span>
                    <img src={createTopic} className='buttonIcon'>
                    </img>
                </span>
            </div>
        </div>
    </div>
    );
};

export default CreateGridTopicButton;