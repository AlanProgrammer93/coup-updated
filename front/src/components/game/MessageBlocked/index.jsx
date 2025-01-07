import React from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { emitAllowBlock, emitLostCard, emitLostGame } from '../../../utils/socket';
import { updateBlocker } from '../../../store/blockerReducer';
import { updateVariables } from '../../../store/variableReducer';

const MessageBlocked = () => {
    const { user, game, blocker } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const allow = () => {
        emitAllowBlock(game.game.idGame, user.user, blocker.blocker.blockedBy, blocker.blocker.card)
        dispatch(updateBlocker());
    }

    const distrust = () => {
        var userBlocker = game.game.gamer.filter(
            (u) => u.user === blocker.blocker.blockedBy
        );
        var cardExist = userBlocker[0].cards.filter(
            (c) => c === blocker.blocker.card
        );

        if (!cardExist[0]) {
            if (blocker.blocker.card === 'condesa') {
                emitLostGame(game.game.idGame, blocker.blocker.blockedBy)
                dispatch(updateBlocker());
                return
            }
            if (userBlocker[0].cards.length === 1) {
                emitLostGame(game.game.idGame, blocker.blocker.blockedBy)
                dispatch(updateBlocker());
                return
            }
            emitLostCard(game.game.idGame, blocker.blocker.blockedBy)
            dispatch(updateBlocker());
        } else {
            if (game.game.myUser.cards.length === 1) {
                emitLostGame(game.game.idGame, user.user)
                dispatch(updateBlocker());
                return
            }
            dispatch(updateBlocker());
            dispatch(updateVariables({ action: 'lostCard' }));
        }
    }

    return (
        <div className='blocked'>
            <p>{`${blocker.blocker.blockedBy} esta bloqueando con ${blocker.blocker.card}`}</p>
            <div className='blocked_options'>
                <button onClick={allow}>Permitir</button>
                <button onClick={distrust}>Desconfiar</button>
            </div>
        </div>
    )
}

export default MessageBlocked