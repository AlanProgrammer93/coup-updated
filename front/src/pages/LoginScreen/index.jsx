import React, { useState } from 'react'
import './styles.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Loading from '../../components/common/Loading';
import clientAxios from '../../utils/axios';
import { addUser } from '../../store/userReducer';

const LoginScreen = () => {
    const [loading, setLoading] = useState(false)
    const [showLogin, setShowLogin] = useState(false);
    const [authState, setAuthState] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const dispatch = useDispatch();

    const router = useNavigate();

    const { username, password, confirmPassword } = authState;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthState(prev => ({ ...prev, [name]: value }));
    }

    const register = (e) => {
        e.preventDefault();
        setLoading(true)
        if (!username || !password || !confirmPassword) {
            alert('Todos los campos son requeridos')
            setLoading(false)
            return
        }

        if (username.length < 4) {
            alert('El usuario debe tener al menos 4 caracteres')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres')
            setLoading(false)
            return
        }
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        clientAxios.post('/auth/register', {
            username,
            password
        })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                dispatch(addUser(res.data.username));
                router("/");
            })
            .catch(err => alert("Ocurrio un problema en el servidor. Intentelo de nuevo."))
            .finally(e => {
                setLoading(false)
            })
    }

    const login = (e) => {
        e.preventDefault();
        setLoading(true)
        if (!username || !password) {
            alert('Todos los campos son requeridos')
            setLoading(false)
            return
        }

        clientAxios.post('/auth/login', {
            username,
            password
        })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                dispatch(addUser(res.data.username));
                router("/");
            })
            .catch(err => alert("Usuario o contraseña incorrecta."))
            .finally(e => {
                setLoading(false)
            })
    }

    return (
        <div className={`auth ${showLogin && 'active'}`}>
            {
                loading && <Loading />
            }
            <div className='auth_container'>
                <div className='blueBg'>
                    <div className='box signin'>
                        <h2>Ya tienes una cuenta?</h2>
                        <button
                            onClick={() => setShowLogin(!showLogin)}
                            className='signinBtn'
                        >Iniciar</button>
                    </div>
                    <div className='box signup'>
                        <h2>No tienes una cuenta?</h2>
                        <button
                            onClick={() => setShowLogin(!showLogin)}
                            className='signupBtn'
                        >Registrate Aqui</button>
                    </div>
                </div>
                <div className={`formBx ${showLogin && 'active'}`}>
                    <div className='form signinForm'>
                        <form>
                            <h3>Iniciar Sesion</h3>
                            <input
                                type="text"
                                name='username'
                                value={authState.username}
                                onChange={handleChange}
                                placeholder='Nombre de Usuario'
                            />
                            <input
                                type="password"
                                name='password'
                                value={authState.password}
                                placeholder='Contraseña'
                                onChange={handleChange}
                            />
                            <button onClick={login}>
                                Iniciar Sesion
                            </button>
                       </form>
                    </div>

                    <div className='form signupForm'>
                        <form>
                            <h3>Registrarse</h3>
                            <input
                                type="text"
                                name='username'
                                value={authState.username}
                                placeholder='Nombre de Usuario'
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name='password'
                                value={authState.password}
                                placeholder='Contraseña'
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name='confirmPassword'
                                value={authState.confirmPassword}
                                placeholder='Confirmar Contraseña'
                                onChange={handleChange}
                            />
                            <button onClick={register}>
                                Registrarse
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen