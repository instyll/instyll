/**
 * @author wou
 */
import React from 'react';
import CreateZapModal from "../../modal/zap/CreateZapModal";
import "../../App.css";

import createZap from '../../icons/plus1.png';
import { useState } from "react";

const CreateZapButton = ({ }) => {

    const [zapOptionsModalOpen, setZapOptionsModalOpen] = useState(false);

    const handleZapOptionsModalOpen = (value) => {
        setZapOptionsModalOpen(true);
    }

    return (
    <div 
    className='createZapContainer'
    onClick={handleZapOptionsModalOpen}
    >

<CreateZapModal
            show={zapOptionsModalOpen}
            onHide={() => setZapOptionsModalOpen(false)}
            />

        <div className='zapIconContainer'>
            <div className='zapIconWrapper'>
                <span>
                    <img src={createZap} className='buttonIcon'>
                    </img>
                </span>
            </div>
        </div>
    </div>
    );
};

export default CreateZapButton;