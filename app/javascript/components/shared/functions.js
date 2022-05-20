import Axios from "axios";

// API call to logout current user and go back to home page
export function logout() {
  Axios.post('/api/logout')
    .then(resp => {
      console.log(resp.data.status)
      window.location.assign('/')
    })
    .catch(err => {
      console.log(err)
    })
}

// Convert date object to string in 'Y/M/D' format
export function get_date_string(dateObj) {

  var month = dateObj.getMonth() + 1;
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();

  return [year, month, day].join('/');
}