import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../hooks/useAuthContext'

function Authentication() {

  const { user, dispatch } = useAuthContext()

  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')


  const autoLoginUser = async () => {
    if (JSON.parse(localStorage.getItem('loggedIn')) === true) {
      await dispatch({ type: "LOGIN", payload: JSON.parse(localStorage.getItem('loggedIn')) })
    }
  }

  useEffect(() => {

    autoLoginUser()

  })

  const handleRegistration = (event) => {
    event.preventDefault()

    const existingUsers = JSON.parse(localStorage.getItem('users'))

    const usernameExists = existingUsers.filter(user => user.username === username)

    if (username === '' || usernameExists.length > 0) {
      alert('Enter a new username!')
      return
    }
    if (password === '') {
      alert('Enter a password!')
      return
    }

    const newUser = {
      id: uuidv4(),
      username,
      password
    }

    const newUsers = [newUser, ...existingUsers]

    localStorage.setItem('users', JSON.stringify(newUsers))
    setIsAlreadyRegistered(true)

  }
  const handleLogin = async (event) => {
    event.preventDefault()

    console.log({ loginUsername, loginPassword })


    const existingUsers = JSON.parse(localStorage.getItem('users'))
    const usernameExists = existingUsers.filter(user => user.username === loginUsername)


    if (usernameExists[0].password === loginPassword) {
      await dispatch({ type: "LOGIN", payload: usernameExists[0].username })
      localStorage.setItem('loggedIn', JSON.stringify(usernameExists[0].username))

    }
  }

  return (<>
    {!isAlreadyRegistered && <>
      <section
        className='card p-3'
      >
        <h4
          className='card-header my-3'
        >
          Register
        </h4>
        <form onSubmit={handleRegistration}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <button className='btn btn-outline-success my-3' onClick={() => setIsAlreadyRegistered(true)}>Already Registered? Login</button>
      </section>
    </>}
    {isAlreadyRegistered && <>
      <section
        className='card p-3'
      >
        <h4
          className='card-header my-3'
        >
          Login
        </h4>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={loginUsername}
              onChange={e => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <button className="btn btn-outline-secondary my-3" onClick={() => setIsAlreadyRegistered(false)} >Don't have an account? Register</button>
      </section>
    </>
    }
  </>)
}

export default Authentication