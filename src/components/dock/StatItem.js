import React from "react";
import { Clock } from 'lucide-react';
import { BookA } from 'lucide-react';
import { Folder } from "lucide-react";

const StatItem = ({title, icon, stat}) => {
    return (
        <div className='statItem'>
        <div className='statItemWrapper'>
            {/* <img src={icon} className='tocIcon'></img> */}
            {icon === 1 ? <BookA size={20} className="tocIcon"/> : ''}
            {icon === 2 ? <Clock size={20} className="tocIcon"/> : ''}
            {icon === 3 ? <Folder size={20} className="tocIcon"/> : ''}
            <span className='tocInnerText'>{title} {stat}</span>
        </div>
        </div>
    )
}

export default StatItem;