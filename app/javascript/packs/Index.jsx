import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import UsersList from '../components/UsersList'
import UserInfo from '../components/UserInfo'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
       <Route exact path ="/login" component={ Login }/>
       <Route exact path ="/signup" component={ Signup }/>
       <Route exact path ="/users" component={ UsersList }/>
       <Route exact path ="/user-info" component={ UserInfo }/>
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
    // document.body.appendChild(document.createElement('div')),
  )
})
