import React from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { emitReturnCardAmbassador } from '../../../utils/socket';
import { updateDescart } from '../../../store/descartCardReducer';

const DescartOneCard = () => {
    const { descart, game } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const returnSelected = (card) => {
        var i = descart.descart.cards.indexOf(card);
        let newCards = Array.from(descart.descart.cards);

        newCards.splice(i, 1)

        const data = {
            idGame: game.game.idGame,
            cards: newCards,
            returnCard: card,
            user: descart.descart.user
        }
        emitReturnCardAmbassador(data)
        dispatch(updateDescart());
    }

    return (
        <div className='descartOneCard'>
            <h2>Descartar Una</h2>
            <div className='descartCard'>
                {
                    descart.descart.cards.map((card, index) => (
                        <button key={index} onClick={() => returnSelected(card)}>{card}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default DescartOneCard