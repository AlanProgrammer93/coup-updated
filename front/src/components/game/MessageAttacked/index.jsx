import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux';

const MessageAttacked = () => {
    const { attacker } = useSelector((state) => ({ ...state }));

    return (
        <div className='attacked'>
            {`${attacker.attacker.attackedBy} esta usando ${attacker.attacker.card}`}
        </div>
    )
}

export default MessageAttacked