import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { updateResult } from '../../../store/resultReducer';

const index = ({ result }) => {
    const router = useNavigate();
    const dispatch = useDispatch()

    const goHome = () => {
        localStorage.removeItem('currentGame')
        dispatch(updateResult());

        router('/');
    }
    return (
        <div className='result'>
            <div 
                className='result_container' 
                style={{ backgroundColor: result === 'lost' ? "red" : "yellowgreen" }}
            >
                <h1>
                    {
                        result === 'lost' ? 'PERDISTE EL JUEGO'
                            : "GANASTE EL JUEGO!"
                    }
                </h1>
                <button onClick={goHome}>Ir al Inicio</button>
            </div>
        </div>
    )
}

export default index