import React from 'react'
import './styles.css'

const MessageGame = ({ msg }) => {
    return (
        <div className='messageGame'>
            {msg}
        </div>
    )
}

export default MessageGame