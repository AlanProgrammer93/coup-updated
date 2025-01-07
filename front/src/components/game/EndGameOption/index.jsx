import React, { useState } from 'react'
import './styles.css'
import { useSelector } from 'react-redux';
import { emitLostGame } from '../../../utils/socket';
import MessageFeedback from '../MessageFeedback';

const EndGameOption = () => {
    const [error, setError] = useState('')
    const { user, game } = useSelector((state) => ({ ...state }));

    const endGame = () => {
        if (game.game.turn !== user.user) {
            setError('No es tu turno. Puedes salir de la partida en tu turno.')
            return
        }
        emitLostGame(game.game.idGame, user.user)
    }

    return (
        <>
            {error && <MessageFeedback msg={error} setError={setError} />}
            <div
                onClick={endGame}
                className='endGameOption'
            >
                X
            </div>
        </>
    )
}

export default EndGameOption