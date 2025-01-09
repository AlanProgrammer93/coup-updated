import React, { useState } from 'react'
import './styles.css'

import data from '../../../cards.json'
import { useDispatch, useSelector } from 'react-redux';
import { emitAllow, emitBlockCard, emitLostCard, emitLostGame, emitTakeMoney, emitUseCard, emitUseCardGlobal } from '../../../utils/socket';
import { updateTurnGame } from '../../../store/gameReducer';
import { updateAction } from '../../../store/actionsReducer';
import { updateAttacker } from '../../../store/attackerReducer';
import { updateVariables } from '../../../store/variableReducer';
import SelectOponent from '../SelectOponent';
import MessageFeedback from '../MessageFeedback';
import MessageActions from '../MessageActions';

const Controls = () => {
    const { user, game, attacker, action } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const [showMenu, setShowMenu] = useState(false)
    const [error, setError] = useState('')
    const [cardSelected, setCardSelected] = useState('')

    const takeMoney = () => {
        if (game.game.turn !== user.user || game.game.state === 'initial') {
            setError('No es tu turno')
            return
        }
        emitTakeMoney(game.game.idGame, user.user)
        setCardSelected('')
    }

    const playCard = (card) => {
        if (game.game.state === 'initial') {
            setError('No es tu turno')
            return
        }
        if (game.game.gamer.length === 1) {
            switch (card) {
                case 'capitan':
                    dispatch(updateTurnGame(game.game.gamer[0].user));

                    emitUseCard('capitan', game.game.idGame, game.game.gamer[0].user, user.user)

                    dispatch(updateAction({ msg: `Atacaste a ${game.game.gamer[0].user} con el Capitan` }));
                    break;

                case 'asesina':
                    if (game.game.myUser.money.length > 2) {
                        dispatch(updateTurnGame(game.game.gamer[0].user));
                        emitUseCard('asesina', game.game.idGame, game.game.gamer[0].user, user.user)
                        dispatch(updateAction({ msg: `Atacaste a ${game.game.gamer[0].user} con el Capitan` }));

                        return
                    }
                    setError('No tienes suficiente monedas.')
                    break;

                case 'coup':
                    if (game.game.myUser.money.length > 6) {
                        dispatch(updateTurnGame(game.game.gamer[0].user));
                        if (game.game.gamer[0].cards.length === 1) {
                            emitLostGame(game.game.idGame, game.game.gamer[0].user)
                            return
                        }
                        emitUseCard('coup', game.game.idGame, game.game.gamer[0].user, user.user)
                        dispatch(updateAction({ msg: `Atacaste a ${game.game.gamer[0].user} con COUP` }));

                        return
                    } else {
                        setError('No tienes suficiente monedas.')
                    }
                    break;

                default:
                    break;
            }
        } else {
            setCardSelected(card)
        }
    }

    const playCardGlobal = (card) => {
        if (game.game.state === 'initial') {
            setError('No es tu turno')
            return
        }
        switch (card) {
            case 'embajador':
                dispatch(updateTurnGame(game.game.gamer[0].user));
                emitUseCardGlobal('embajador', game.game.idGame, user.user)
                dispatch(updateAction({ msg: `Usaste el Embajador` }));

                break;

            case 'duque':
                dispatch(updateTurnGame(game.game.gamer[0].user));
                emitUseCardGlobal('duque', game.game.idGame, user.user)
                dispatch(updateAction({ msg: `Usaste el Duque` }));

                break;

            default:
                break;
        }
    }

    const blockCard = (card) => {
        emitBlockCard(card, game.game.idGame, attacker.attacker.attackedBy, user.user)
        dispatch(updateAttacker());
        dispatch(updateAction({ msg: `Bloqueaste a ${attacker.attacker.attackedBy} con ${card}` }));
    }

    const allow = () => {
        if (attacker.attacker.card === 'asesina') {
            dispatch(updateAttacker());

            if (game.game.myUser.cards.length === 1) {
                emitLostGame(game.game.idGame, user.user)
                return
            }

            dispatch(updateVariables({ action: 'lostCard' }));
            return
        }

        emitAllow(game.game.idGame, user.user, attacker.attacker.attackedBy, attacker.attacker.card)
        dispatch(updateAttacker());
    }

    const distrust = () => {
        var userAttacker = game.game.gamer.filter(
            (u) => u.user === attacker.attacker.attackedBy
        );
        var cardExist = userAttacker[0].cards.filter(
            (c) => c === attacker.attacker.card
        );

        if (!cardExist[0]) {
            if (userAttacker[0].cards.length === 1) {
                emitLostGame(game.game.idGame, attacker.attacker.attackedBy)
                dispatch(updateAttacker());
                return
            }
            emitLostCard(game.game.idGame, attacker.attacker.attackedBy)
            dispatch(updateAttacker());
        } else {
            if (game.game.myUser.cards.length === 1) {
                emitLostGame(game.game.idGame, user.user)
                dispatch(updateAttacker());
                return
            }

            if (attacker.attacker.card === 'asesina') {
                emitLostGame(game.game.idGame, user.user)
                dispatch(updateAttacker());
                return
            }

            dispatch(updateAttacker());
            dispatch(updateVariables({ action: 'lostCard' }));
        }
    }
    return (
        <>
            {
                cardSelected &&
                <SelectOponent
                    gamers={game.game.gamer}
                    card={cardSelected}
                    setCardSelected={setCardSelected}
                    setError={setError}
                />
            }
            {error && <MessageFeedback msg={error} setError={setError} />}
            {action.action && <MessageActions />}
            <div className='home__controls'>
                <div className='home__controls_money'>
                    {
                        game.game && game.game.myUser.money.map((mon, index) => (
                            <div key={index} className='money'></div>
                        ))
                    }
                </div>
                <div className='home__controls_cards'>
                    {
                        game.game && game.game.myUser.cards.map((card, index) => (
                            <div className='home__controls_card' key={index}>
                                <img src={`src/assets/cards/${card}.png`} alt="" />
                                <div className='detail_card'>
                                    <p>{card}</p>
                                    <span>{data[card]}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='home__controls_bottons'>
                    <button onClick={takeMoney}>Tomar Moneda</button>
                    <button onClick={() => setShowMenu(!showMenu)}>Jugar</button>
                </div>
            </div>
            {
                showMenu
                    ? game.game.turn === user.user ? (
                        <div className='optionGame'>
                            <button onClick={() => playCard('capitan')}>Tengo el Capitan</button>
                            <button onClick={() => playCardGlobal('embajador')}>Tengo el Embajador</button>
                            <button onClick={() => playCardGlobal('duque')}>Tengo el Duque</button>
                            <button onClick={() => playCard('asesina')}>Tengo la Asesina</button>
                            <button onClick={() => playCard('coup')}>COUP</button>
                        </div>
                    ) : (
                        <div className='optionGame'>
                            {
                                attacker.attacker
                                    ? attacker.attacker.card === 'capitan'
                                        ? (
                                            <>
                                                <button onClick={() => blockCard('capitan')}>Tengo el Capitan</button>
                                                <button onClick={() => blockCard('embajador')}>Tengo el Embajador</button>
                                                <button onClick={distrust}>Desconfio</button>
                                                <button onClick={allow}>Permitir</button>
                                            </>
                                        )
                                        : attacker.attacker.card === 'asesina'
                                            ? (
                                                <>
                                                    <button onClick={() => blockCard('condesa')}>Tengo la Condesa</button>
                                                    <button onClick={distrust}>Desconfio</button>
                                                    <button onClick={allow}>Permitir</button>
                                                </>
                                            )
                                            : attacker.attacker.card === 'duque'
                                                ? (
                                                    <>
                                                        <button onClick={distrust}>Desconfio</button>
                                                        <button onClick={allow}>Permitir</button>
                                                    </>
                                                )
                                                : attacker.attacker.card === 'embajador' && (
                                                    <>
                                                        <button >Tengo el Duque</button>
                                                        <button onClick={distrust}>Desconfio</button>
                                                        <button onClick={allow}>Permitir</button>
                                                    </>
                                                )
                                    : (
                                        <>
                                            <button>Tengo el Capitan</button>
                                            <button>Tengo el Embajador</button>
                                            <button>Tengo la Condesa</button>
                                            <button>Tengo el Duque</button>
                                            <button>Desconfio</button>
                                        </>
                                    )
                            }
                        </div>
                    )
                    : ''
            }
        </>
    )
}

export default Controls