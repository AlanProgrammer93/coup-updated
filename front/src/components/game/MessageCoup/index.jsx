import React from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { emitLostCardSelected } from '../../../utils/socket';
import { updateVariables } from '../../../store/variableReducer';

const MessageCoup = () => {
    const { user, game, variables } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const deleteCard = (card) => {
        emitLostCardSelected(game.game.idGame, user.user, card)
        dispatch(updateVariables());
    }

    return (
        <div className='coup'>
            <h3>{`${variables.variables.attackedBy} esta usando COUP`}</h3>
            <p>Elimina una carta</p>
            <div className='cards'>
                {
                    game.game && game.game.myUser.cards.map((card, index) => (
                        <button
                            key={index}
                            className='card'
                            onClick={() => deleteCard(card)}
                        >
                            {card}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageCoup