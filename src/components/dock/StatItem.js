import React from "react";

const StatItem = ({title, icon, stat}) => {
    return (
        <div className='statItem'>
        <div className='statItemWrapper'>
            <img src={icon} className='tocIcon'></img>
            <span className='tocInnerText'>{title} {stat}</span>
        </div>
        </div>
    )
}

export default StatItem;