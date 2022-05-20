import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { validate_email, validate_name, validate_password, validate_phone, validate_user_type, validate_confirm_password } from './shared/form_validations';


// API call to signup and renders next page on successful signup
export default function Signup() {
  const history = useHistory();
  const [emailExists, setEmailExists] = useState();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    user_type: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const validations_passed = (err) => {
    return (
      typeof err.name === "undefined" &&
      typeof err.email === "undefined" &&
      typeof err.password === "undefined" &&
      typeof err.confirm_password === "undefined" &&
      typeof err.phone === "undefined" &&
      typeof err.user_type === "undefined"
    )
  }
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    let err = {}

    //validations
    err.name = validate_name(user.name)
    err.email = validate_email(user.email)
    err.password = validate_password(user.password)
    err.confirm_password = validate_confirm_password(user.password, user.confirm_password)
    err.phone = validate_phone(user.phone)
    err.user_type = validate_user_type(user.user_type)
    setErrors(err)

    if (validations_passed(err)) {
      Axios.post('/api/signup', {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        user_type: user.user_type
      })
        .then(resp => {
          window.location.assign('/')
        })
        .catch(error => {
          setEmailExists(error.response.data.error)
        })
    }
  }

  return (
    <div>
      <h1>Signup Page</h1>
      {emailExists && <span style={{ color: 'red' }}> {emailExists}</span>}
      <br />
      <form onSubmit={e => handleSignupSubmit(e)}>
        <input
          placeholder="name"
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        {errors.name && <span style={{ color: 'red' }}> {errors.name}</span>}
        <br /><br />
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
        <input
          placeholder="confirm password"
          type="password"
          name="confirm_password"
          value={user.confirm_password}
          onChange={handleChange}
        />
        {errors.confirm_password && <span style={{ color: 'red' }}> {errors.confirm_password}</span>}
        <br /><br />
        <input
          placeholder="phone"
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
        {errors.phone && <span style={{ color: 'red' }}> {errors.phone}</span>}
        <h5>Select User type:</h5>

        <input type="radio" id="user" value="user" name="user_type" onChange={handleChange} />
        <label htmlFor="user">User</label>
        <input type="radio" id="admin" value="admin" name="user_type" onChange={handleChange} />
        <label htmlFor="admin">Admin</label><br />
        {errors.user_type && <span style={{ color: 'red' }}> {errors.user_type}</span>}
        <br /><br />

        <button placeholder="submit" type="submit">Sign In</button>
      </form>
    </div>
  )
}


