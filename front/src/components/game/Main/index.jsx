import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux';

const Main = () => {
    const { game } = useSelector((state) => ({ ...state }));

    return (
        <>
            <div className='home__main'>

                <div className='home__main_oponent1'>
                    {
                        game.game && game.game.gamer[0] && game.game.gamer[0].cards.map((card, index) => (
                            <div key={index} className='home__main_oponent_card'></div>
                        ))
                    }

                </div>

                <div className='home__main_table'>
                    <div className='table_money'>
                        <div className='money' style={{ margin: '-10px', position: 'absolute', border: '1px solid yellow' }}></div>
                        <div className='money' style={{ border: '1px solid yellow' }}></div>
                        <div className='money' style={{ margin: '-15px', border: '1px solid yellow' }}></div>
                        <div className='money' style={{ marginTop: '-10px', position: 'absolute', border: '1px solid yellow' }}></div>
                    </div>
                    <div className='table_mazo'></div>
                </div>

                <div className='home__main_oponent2'>
                    {
                        game.game && game.game.gamer[1] && game.game.gamer[1].cards.map((card, index) => (
                            <div key={index} className='home__main_oponent_card'></div>
                        ))
                    }
                </div>

            </div>
            {
                game.game && game.game.gamer[0] && (
                    <>
                        <div className='details_oponent1'>
                            <h2>{game.game.gamer[0].user}</h2>
                            <div className='money_aponent1'>
                                {
                                    game.game.gamer[0].money.map((mon, index) => (
                                        <div key={index} className='money'></div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }


            {
                game.game && game.game.gamer[1] && (
                    <>
                        <div className='details_oponent2'>
                            <h2>{game.game.gamer[1].user}</h2>
                            <div className='money_aponent2'>
                                {
                                    game.game.gamer[1].money.map(mon => (
                                        <div className='money'></div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Main