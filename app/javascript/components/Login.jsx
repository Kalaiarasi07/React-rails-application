import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { validate_email, validate_password } from './shared/form_validations';

// API call to login and renders next page on successful login
export default function Login() {
  const history = useHistory();
  const [invalidCred, setInvalidCred] = useState([]);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const validations_passed = (err) => {
    return (
      typeof err.email === "undefined" &&
      typeof err.password === "undefined"
    )
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    //validations
    let err = {}
    err.email = validate_email(user.email)
    err.password = validate_password(user.password)

    setErrors(err)

    if (validations_passed(err)) {
      Axios.post('/api/login', {
        email: user.email,
        password: user.password
      })
        .then(resp => {
          console.log("response: " + resp)
          window.location.assign('/')
        })
        .catch(error => {
          setInvalidCred(error.response.data.error)
        })
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {invalidCred && <span style={{ color: 'red' }}> {invalidCred}</span>}
      <br />
      <form onSubmit={e => { handleLoginSubmit(e) }}>
        <input
          placeholder="email"
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: 'red' }}> {errors.email}</span>}
        <br /><br />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        {errors.password && <span style={{ color: 'red' }}> {errors.password}</span>}
        <br /><br />
        <button placeholder="submit" type="submit">Log In</button>
      </form>
    </div>
  )
}
