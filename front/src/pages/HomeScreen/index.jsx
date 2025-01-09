import React, { useEffect, useState } from 'react'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { emitDeleteGame, emitGetGames, emitJoinGame, emitOpenGame, init } from '../../utils/socket';
import Logout from '../../components/common/Logout'
import Instructions from '../../components/common/Instructions'

const HomeScreen = () => {
  const [myGame, setMyGame] = useState('')

  const router = useNavigate();

  const { user, games } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch()

  useEffect(() => {
    init(dispatch);
    emitGetGames()
    // obtener games
    const currentGame = localStorage.getItem('currentGame');
    if (currentGame) {
      setMyGame(currentGame);
    }
  }, [])

  const openGame = () => {
    const idGame = Math.floor(Math.random() * 100000000);
    setMyGame(idGame);
    localStorage.setItem('currentGame', idGame)
    emitOpenGame(user.user, idGame);
  }

  const endGame = () => {
    localStorage.removeItem('currentGame')
    emitDeleteGame(user.user, myGame)
    setMyGame('');
  }

  const startGame = (idGame) => {
    router(`/${idGame}`)
  }

  const joinGame = (idGame) => {
    emitJoinGame(user.user, idGame);
    setMyGame(localStorage.setItem('currentGame', idGame));
    localStorage.setItem('state', 'playing')
    router(`/${idGame}`);
  }

  return (
    <div className='start'>
      <Logout />
      <Instructions position={'20px'} />
      <button
        onClick={openGame}
        className='openButton'
        disabled={myGame}
      >
        Crear Nueva Partida
      </button>
      <div className='start__list'>
        {
          myGame ? (
            <div key={myGame} className='container_games' style={{ borderBottom: '1px solid #2b2b2b' }}>
              <div className='container__info'>
                <h2>Tu Juego</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button onClick={() => startGame(myGame)} className='btn_start'>Iniciar</button>
                <button onClick={endGame} className='btn_end'>Cancelar</button>
              </div>
            </div>
          ) : (
            ''
          )
        }

        {
          games.games && games.games.filter(game => game.idGame !== myGame).map((game, index) => (
            <div className='container_games' key={index}>
              <div className='container__info'>
                <h2>{game.createdBy}</h2>
              </div>
              {
                !myGame ? (
                  <button
                    onClick={() => joinGame(game.idGame)}
                    className='btn_start'
                  >
                    Unirse
                  </button>
                ) : ''
              }
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default HomeScreen