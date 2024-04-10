/**
 * @author wou
 */
import React from 'react';
import CreateZapModal from "../../modal/zap/CreateZapModal";
import "../../App.css";

import createZap from '../../icons/plus1.png';
import { useState } from "react";

const CreateZapButton = ({setCreateZapModalOpen}) => {

    // const [createZapModalOpen, setCreateZapModalOpen] = useState(false);

    const handleZapModalOpen = (value) => {
        setCreateZapModalOpen(true);
    }

    return (
    <div 
    className='createZapContainer'
    onClick={setCreateZapModalOpen}
    >

        {/* <CreateZapModal
            show={createZapModalOpen}
            onHide={() => setCreateZapModalOpen(false)}
        /> */}

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