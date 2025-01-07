import React, { useState } from 'react'
import './styles.css'

const index = ({ position, right="55px" }) => {
    const [showInstruction, setShowInstruction] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowInstruction(true)}
                className='instruction'
                style={{ top: position, right }}
            >
                ?
            </div>
            {
                showInstruction && (
                    <div className='instruction_modal'>
                        <div
                            onClick={() => setShowInstruction(false)}
                            className='instruction'
                            style={{ top: position, right }}
                        >
                            X
                        </div>
                        <div className='instruction_container'>
                            <h2>Un juego de estrategia y engaño para ser el unico jugador con alguna
                                carta en mano.</h2>
                            <br />

                            <h3>Inicio del juego</h3>
                            <div className='instruction_start_game'>
                                <p>Maximo de 3 jugadores y minimo de 2.</p>
                                <p>Cada jugador recibe 2 cartas y dos monedas.</p>
                                <p>Los jugadores deben familiarizarse con todas las acciones
                                    y personajes antes de que el juego comience.</p>
                            </div>

                            <h3>Acciones Globales</h3>
                            <div className='instruction_start_game'>
                                <p><b>Tomar una moneda:</b> Solo toma una moneda y pasa el turno.</p>
                                <p><b>Usar COUP:</b> Si tienes 7 monedas puedes usar esta accion para eliminar
                                    una carta a un jugador.</p>
                                <p><b>Desconfiar:</b> Cuando alguien usa a un personaje puedes usar la accion
                                    de desconfiar si crees que no tiene ese personaje en su mano, pero
                                    CUIDADO si en verdad tiene al personaje automaticamente pierdes una
                                    carta. Pero si no la tiene ese jugador es quien pierde una carta.</p>
                            </div>

                            <h3>Acciones de Personajes</h3>
                            <div className='instruction_start_game'>

                                <b>Duque </b>
                                <p>- Toma 3 monedas.</p>
                                <p>- Bloquea intercambio al embajador.</p>

                                <b>Asesina </b>
                                <p>- Paga 3 monedas y asesina de un jugador. Si triunfa, este
                                    jugador pierde inmediatamente una carta.</p>
                                <p>(Puede ser bloqueado por la condesa).</p>
                                <p>Cuidado con la asesina, si un jugador usa la asesina y
                                    desconfias y el jugador si tiene la carta automaticamente
                                    pierdes dos cartas una por desconfiar y otra por el asesinato.
                                    De igual manera si finges tener la condesa y eres desafiado.</p>

                                <b>Condesa </b>
                                <p>- Bloquea a la asesina.</p>

                                <b>Capitan </b>
                                <p>- Roba 2 monedas a un jugador, si el jugador tiene solo una
                                    moneda pues solo roba una.</p>
                                <p>- Puede bloquear robos de otro capitan.</p>
                                <p>- (Puede ser bloqueado por el capitan y el embajador).</p>

                                <b>Embajador </b>
                                <p>- Puede intercambiar una carta con el mazo.</p>
                                <p>- Bloquea robos del capitan.</p>
                                <p>- (Puede ser bloqueado por el duque).</p>
                                <br />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default index