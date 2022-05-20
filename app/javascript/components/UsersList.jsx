import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { get_date_string, logout } from './shared/functions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// API call to list all users only if logged in
export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const history = useHistory();
  useEffect(() => {
    showAllUsers()
  }, [])

  const showAllUsers = () => {

    Axios.post('/api/users')
      .then(resp => {
        setUsers(resp.data.users)
        console.log(resp)
      })
      .catch(error => {
        alert(error.response.data.error)
        history.push('/login')
      })
  }

  const setDateRange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  }

  const sortByDate = () => {
    console.log(startDate)
    console.log(endDate)

    let startDateString = get_date_string(startDate)
    let endDateString = get_date_string(endDate)

    console.log(startDateString + " " + endDateString)

    Axios.post('/api/users/sort', { start: startDateString, end: endDateString })
      .then(function (resp) {
        setUsers(resp.data.users)
        console.log(resp)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const users_list = users.map(item => {
    return (
      <tr>
        <td key={item.name}>|{item.name}</td>
        <td key={item.email}>|{item.email}</td>
        <td key={item.phone}>|{item.phone}</td>
        <td key={item.user_type}>|{item.user_type}</td>
        <td key={item.joined_at}>|{new Date(item.joined_at * 1000).toLocaleDateString()}</td>
      </tr>
    )
  })

  return (
    <>
      <h1>Users list page</h1>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={setDateRange}
      />
      <br /><br />
      <button name="sort" onClick={sortByDate} >Sort</button>
      <button name="showall" onClick={showAllUsers}>Show All</button>
      <br /><br />
      <table>
        <tbody>{users_list}</tbody>
      </table>
      <br /><br />
      <div onClick={logout} >Log out</div>
    </>
  )
}
