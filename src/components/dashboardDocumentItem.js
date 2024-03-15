import React from "react"

const DashboardDocumentItem = ({document}) => {
    return (
        <div className='dashboardSuggestionItemChild'>
            <div className='documentTitle'>{document[1]}</div>
            <div className='documentMetadata'>In {document[4]} - {document[2]}</div>
        </div>
    )
}

export default DashboardDocumentItem;