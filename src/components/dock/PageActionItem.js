import React from "react";

const PageActionItem = ({title, icon}) => {
    return (
        <div className='pageActionItem'>
        <button className='pageActionButton'>
            <img src={icon} className='tocIcon'></img>
            <span className='tocInnerText'>{title}</span>
        </button>
        </div>
    )
}

export default PageActionItem;