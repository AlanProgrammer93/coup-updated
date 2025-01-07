import React from 'react'
import './styles.css'

const Loading = ({ text = "Espere..." }) => {
    return (
        <div className='blur'>
            <div className='loadingContainer'>
                <div className='loadingBackground'>
                    <span className='loader'></span>
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Loading