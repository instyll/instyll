/**
 * @author wou
 */
import React from 'react';
import "../App.css";

import createTopic from '../icons/plus1.png';

const CreateListTopicButton = ({setCreateTopicModalOpen}) => {
    return (
    <div 
    className='createNewListTopicContainer'
    onClick={setCreateTopicModalOpen}
    >
        <div className='topicListIconContainer'>
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

export default CreateListTopicButton;