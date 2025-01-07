import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux';

const MessageActions = () => {
    const { action } = useSelector((state) => ({ ...state }));

    return (
        <div className='messageAction'>
            {action.action.msg}
        </div>
    )
}

export default MessageActions