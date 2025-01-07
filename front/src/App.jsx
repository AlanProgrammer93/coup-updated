import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import LoggedRoutes from './routes/LoggedRoutes'
import NotLoggedRoutes from './routes/NotLoggedRoutes'
import LoginScreen from './pages/LoginScreen'
import HomeScreen from './pages/HomeScreen'
import GameScreen from './pages/GameScreen'
import clientAxios from './utils/axios'
import { useDispatch } from 'react-redux'
import { addUser } from './store/userReducer'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

    await clientAxios.get('/auth/current-user', {
      headers: {
        token
      }
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(addUser(res.data.username));
      })
      .catch(err => {
        localStorage.removeItem('token')
        dispatch(addUser(null));
      });
  }

  return (
    <>
      <Routes>
        <Route element={<LoggedRoutes />}>
          <Route
            path="/"
            element={
              <HomeScreen />
            }
            exact
          />
          <Route
            path="/:idGame"
            element={
              <GameScreen />
            }
            exact
          />
        </Route>

        <Route element={<NotLoggedRoutes />}>
          <Route path="/login" element={<LoginScreen />} exact />
        </Route>
      </Routes>
    </>
  )
}

export default App
