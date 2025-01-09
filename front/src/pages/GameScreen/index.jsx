import React, { useEffect } from 'react'
import './styles.css'
import MessageResult from '../../components/game/MessageResult'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { emitGetGame, getSocket, init } from '../../utils/socket';
import Instructions from '../../components/common/Instructions'
import EndGameOption from '../../components/game/EndGameOption';
import Main from '../../components/game/Main';
import Starting from '../../components/game/Starting';
import Controls from '../../components/game/Controls';
import MessageGame from '../../components/game/MessageGame';
import MessageAttacked from '../../components/game/MessageAttacked';
import MessageAttackedGlobal from '../../components/game/MessageAttackedGlobal';
import MessageBlocked from '../../components/game/MessageBlocked';
import MessageCoup from '../../components/game/MessageCoup';
import DescartOneCard from '../../components/game/DescartOneCard';
import MessageLostCard from '../../components/game/MessageLostCard';

const GameScreen = () => {
  const { idGame } = useParams();

  const {
    user,
    result,
    attacker,
    attackerGlobal,
    blocker,
    variables,
    descart,
    game
  } = useSelector((state) => ({ ...state }));
  
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      //getSocket();

      if (user.user) {
        emitGetGame(idGame, user?.user);
      }
    } catch (error) {
      init(dispatch)
    }
  }, [user])

  return (
    <>
      {
        !result.result ? (
          <div className='home'>
            {
              game.game && game.game.state === 'initial' ? '' : game?.game?.turn === user?.user ? (
                <MessageGame msg="Tu Turno" />
              ) : (
                <MessageGame msg={`Turno de ${game.game && game?.game?.turn}`} />
              )
            }
            {
              attacker.attacker && (<MessageAttacked />)
            }
            {
              attackerGlobal.attackerGlobal && (<MessageAttackedGlobal />)
            }
            {
              blocker.blocker && (<MessageBlocked />)
            }
            {
              variables.variables?.action === 'lostCard' && (<MessageLostCard />)
            }
            {
              variables.variables?.action === 'coup' && (<MessageCoup />)
            }
            {
              descart.descart && (<DescartOneCard />)
            }
            <div>
              <EndGameOption />
              <Instructions position={'350px'} right="20px" />
            </div>
            <Main />
            <Controls />
            {
              game.game && game.game.state === 'initial' && (
                <Starting />
              )
            }
          </div>
        ) : <MessageResult result={result.result} />
      }
    </>
  )
}

export default GameScreen