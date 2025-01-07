import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux';
import { emitStartGame } from '../../../utils/socket';

const Starting = () => {
    const { user, game } = useSelector((state) => ({ ...state }));

    const startGame = () => {
        if (game.game.gamer.length >= 1) {
            emitStartGame(game.game.idGame)
        }
    }

    return (
        <div className='starting'>
            {
                game.game.createdBy === user.user ? (
                    <>
                        <h3>Son {game.game.gamer.length + 1} Jugadores en espera</h3>
                        <button onClick={startGame}>Comenzar Ahora</button>
                    </>
                ) : (
                    <h3>Son {game.game.gamer.length + 1} Jugadores en espera</h3>
                )
            }
        </div>
    )
}

export default Starting