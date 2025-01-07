import React from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { emitLostCardSelected } from '../../../utils/socket';
import { updateVariables } from '../../../store/variableReducer';

const MessageLostCard = () => {
    const { user, game } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const deleteCard = (card) => {
        emitLostCardSelected(game.game.idGame, user.user, card)
        dispatch(updateVariables());
    }

    return (
        <div className='lostCard'>
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

export default MessageLostCard