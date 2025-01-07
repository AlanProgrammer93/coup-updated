import React, { useEffect, useState } from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateAttackerGlobal } from '../../../store/attackerGlobalReducer';
import { emitAllow, emitBlockAttackGlobal, emitBlockCard, emitLostCard, emitLostGame } from '../../../utils/socket';
import { updateVariables } from '../../../store/variableReducer';

const MessageAttackedGlobal = () => {
    const { game, user, attackerGlobal } = useSelector((state) => ({ ...state }));
    const [time, setTime] = useState(6)

    const dispatch = useDispatch()

    useEffect(() => {
        if (time > 0) {
            setTimeout(() => setTime(time - 1), 1000)
        } else {
            dispatch(updateAttackerGlobal(null));
            emitAllow(game.game.idGame, user.user, attackerGlobal.attackerGlobal.attackedBy, attackerGlobal.attackerGlobal.card)
        }
        // eslint-disable-next-line
    }, [time])

    const distrust = () => {
        var userAttacker = game.game.gamer.filter(
            (u) => u.user === attackerGlobal.attackerGlobal.attackedBy
        );
        var cardExist = userAttacker[0].cards.filter(
            (c) => c === attackerGlobal.attackerGlobal.card
        );

        emitBlockAttackGlobal(game.game.idGame)

        if (!cardExist[0]) {
            if (userAttacker[0].cards.length === 1) {
                emitLostGame(game.game.idGame, attackerGlobal.attackerGlobal.attackedBy)
                dispatch(updateAttackerGlobal(null));

                return
            }
            emitLostCard(game.game.idGame, attackerGlobal.attackerGlobal.attackedBy)
            dispatch(updateAttackerGlobal(null));
        } else {
            dispatch(updateAttackerGlobal(null));

            if (game.game.myUser.cards.length === 1) {
                emitLostGame(game.game.idGame, user.user)
                return
            }

            dispatch(updateVariables({ action: 'lostCard' }));
        }
    }

    const block = () => {
        emitBlockCard('duque', game.game.idGame, attackerGlobal.attackerGlobal.attackedBy, user.user)
        dispatch(updateAttackerGlobal(null));
    }

    return (
        <div className='attackedGlobal'>
            <span>Permitir en {time}</span>
            {`${attackerGlobal?.attackerGlobal?.attackedBy} esta usando ${attackerGlobal?.attackerGlobal?.card}`}
            <div style={{ display: 'flex' }}>
                <button onClick={distrust}>Desconfio</button>
                {
                    attackerGlobal.attackerGlobal.card === 'embajador'
                    && <button onClick={block}>Tengo el Duque</button>
                }
            </div>
        </div>
    )
}

export default MessageAttackedGlobal