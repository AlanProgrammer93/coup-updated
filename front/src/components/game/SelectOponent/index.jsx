import React from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { emitLostGame, emitUseCard } from '../../../utils/socket';
import { updateAction } from '../../../store/actionsReducer';

const SelectOponent = ({ gamers, card, setCardSelected, setError }) => {
    const { user, game } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const playCard = (userSelected) => {
        setCardSelected('')
        switch (card) {
            case 'capitan':
                emitUseCard('capitan', game.game.idGame, userSelected, user.user)
                dispatch(updateAction({ msg: `Atacaste a ${userSelected} con el Capitan` }));
                break;

            case 'asesina':
                if (game.game.myUser.money.length > 2) {
                    emitUseCard('asesina', game.game.idGame, userSelected, user.user)
                    dispatch(updateAction({ msg: `Atacaste a ${userSelected} con la Asesina` }));
                    return
                }
                setError('No tienes suficiente monedas.')
                break;

            case 'coup':
                if (game.game.myUser.money.length > 6) {
                    var attackedUser = game.game.gamer.filter(
                        (g) => g.user === userSelected
                    );
                    if (attackedUser[0].cards.length === 1) {
                        emitLostGame(game.game.idGame, userSelected)
                        return
                    }
                    emitUseCard('coup', game.game.idGame, userSelected, user.user)
                    dispatch(updateAction({ msg: `Atacaste a ${userSelected} con COUP` }));
                    return
                } else {
                    setError('No tienes suficiente monedas.')
                }
                break;

            default:
                break;
        }
    }

    return (
        <div className='selectOponent'>
            <h1>Selecciona tu oponente</h1>
            <div style={{ display: 'flex' }}>
                {
                    gamers.map(g => (
                        <button onClick={() => playCard(g.user)}>
                            {g.user}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectOponent