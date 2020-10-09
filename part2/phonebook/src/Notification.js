import React from 'react'

function Notification({message, type}) {

    return (message === "") ? null : (
        <div className={type + " msg"}>
            {message}
        </div>
    )
}

export default Notification
