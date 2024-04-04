/**
 * @author wou
 */
import React, { useState } from "react";
import { Item, Menu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import '../../App.css';
import ZapOptionsModal from "../../modal/zap/ZapOptionsModal";

import { useDispatch } from "react-redux";
import editIcon from '../../icons/editWhite.png';
import UpdateZapModal from "../../modal/zap/UpdateZapModal";
import { removeZap } from "../../zapSlice";

const ZapItem = ({ zapId }) => {

    const [zapOptionsModalOpen, setZapOptionsModalOpen] = useState(false);
    const [selectedZap, setSelectedZap] = useState(null)
    const [updateZapModalOpen, setUpdateZapModalOpen] = useState(false);

    const dispatch = useDispatch();

    // context menu
    const { show } = useContextMenu({
        id: zapId,
    });

    function handleContextMenu(event){
        show({
          event,
          props: {
              key: 'value'
          }
        })
    }

    const handleZapOptionsModalOpen = (value) => {
        setZapOptionsModalOpen(true);
    }

    const handleClick = ( e ) => {
        e.stopPropagation();
        show({
          event,
          props: {
              key: 'value'
          }
        })
        setSelectedZap(zapId);
      }

      // delete zap
    const handleRemoveZap = (zapItem) => {
        dispatch(removeZap(zapItem));
    }

    const handleClose = () => {
        setUpdateZapModalOpen(false);
    }

    return(
        <div className="zapItemContainer">

            {/* <ZapOptionsModal
            show={zapOptionsModalOpen}
            selectedZap={selectedZap}
            onHide={() => setZapOptionsModalOpen(false)}
            /> */}

            <UpdateZapModal 
            show={updateZapModalOpen} 
            onHide={handleClose}
            selectedZap={selectedZap}
            handleClose={handleClose}/>

            <span className="zapItemLabel">{zapId}</span>

            <Menu id={zapId}>
                <Item id="rename" onClick={() => setUpdateZapModalOpen(true)}>Rename</Item>
                <Item id="delete" onClick={() => handleRemoveZap(selectedZap)}>Delete</Item>
            </Menu>

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