import React from "react";

const StatItem = ({title, icon}) => {
    return (
        <div className='statItem'>
        <div className='statItemWrapper'>
            <img src={icon} className='tocIcon'></img>
            <span className='tocInnerText'>{title}</span>
        </div>
        </div>
    )
}

export default StatItem;