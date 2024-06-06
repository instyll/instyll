import React from "react";
import { FileText } from "lucide-react";
import { PenSquare } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Trash } from "lucide-react";

const PageActionItem = ({title, icon}) => {
    return (
        <div className='pageActionItem'>
        <button className='pageActionButton'>
            {icon === 1 && <FileText size={20} className="tocIcon"/>}
            {icon === 2 && <PenSquare size={20} className="tocIcon"/>}
            {icon === 3 && <Bookmark size={20} className="tocIcon"/>}
            {icon === 4 && <Trash size={20} className="tocIcon"/>}
            <span className='tocInnerText'>{title}</span>
        </button>
        </div>
    )
}

export default PageActionItem;