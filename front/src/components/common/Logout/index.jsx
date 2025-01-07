import React from 'react'
import './styles.css'
import { MdLogout } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { addUser } from '../../../store/userReducer'
import { useNavigate } from 'react-router';

const index = () => {
    const router = useNavigate();
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(addUser(null));
        router('/login');
    }
    return (
        <div className='logout' onClick={logout}>
            <MdLogout />
        </div>
    )
}

export default index