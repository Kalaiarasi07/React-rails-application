import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { logout } from './shared/functions';

// API call to show current user info only if logged in
export default function UsersInfo() {
  const [user, setUser] = useState([]);
  const history = useHistory();

  useEffect(() => {
    Axios.post("/api/user-info")
      .then(resp => {
        setUser(resp.data.user)
      })
      .catch(error => {
        console.log(error)
        history.push('/login')
      })
  }, [])

  return (
    <div>
      <h1>User Info page</h1>
      <h3>Name: {user.name} </h3>
      <h3>Email: {user.email} </h3>
      <h3>Phone: {user.phone} </h3>
      <h3>Joined at: {new Date(user.joined_at * 1000).toLocaleDateString()} </h3>
      <br /><br />

      <div onClick={logout} >Log out</div>

    </div>
  )
}
