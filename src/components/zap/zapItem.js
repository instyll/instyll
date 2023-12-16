import { useState } from "react";
import React from "react";
import '../../App.css';
import ZapOptionsModal from "../../modal/ZapOptionsModal";

import editIcon from '../../icons/editWhite.png'

const ZapItem = ({ zapId }) => {

    const [zapOptionsModalOpen, setZapOptionsModalOpen] = useState(false);
    const [selectedZap, setSelectedZap] = useState(null)

    const handleZapOptionsModalOpen = (value) => {
        setZapOptionsModalOpen(true);
    }

    const handleClick = ( e ) => {
        e.stopPropagation();
        console.log("stopped");
        handleZapOptionsModalOpen(true);
        setSelectedZap(zapId);
        // console.log(selectedTopic);
      }

    return(
        <div className="zapItemContainer">

            <ZapOptionsModal
            show={zapOptionsModalOpen}
            selectedZap={selectedZap}
            onHide={() => setZapOptionsModalOpen(false)}
            />

            <span className="zapItemLabel">{zapId}</span>
            <button 
            onClick={handleClick}
            className="zapItemButton"
            >
                <img src={editIcon}></img>
            </button>
        </div>
    )
}

export default ZapItem;