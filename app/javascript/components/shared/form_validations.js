//validate username
export const validate_name = (name) => {
  let error;
  // alphanumeric with both cases
  const name_regex = /^[a-z0-9\s]+$/i;
  if (!name) {
    error = "Name required!";
  } else if (!name_regex.test(name)) {
    error = "Name must be alphanumeric!";
  }
  return error;
}
//validate email
export const validate_email = (email) => {
  let error;
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) {
    error = "Email required!";
  } else if (!email_regex.test(email)) {
    error = "Provide valid email!";
  }
  return error;
}
//validate password
export const validate_password = (password) => {
  let error;
  // Minimum four characters, at least one letter and one number
  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if (!password) {
    error = "Password required!";
  } else if (!password_regex.test(password)) {
    error = "Invalid password. Provide a minimum four characters with at least one letter and one number!";
  }
  return error;
}
// validate confirm_password
export const validate_confirm_password = (password, confirm_password) => {
  let error;
  if (password !== confirm_password) {
    error = "Passwords do not match!";
    return error;
  }
}

//validate phone
export const validate_phone = (phone) => {
  let error;
  // Indian number starting from 6-9
  const phone_regex = /^[6-9]\d{9}$/;
  if (!phone) {
    error = "Phone required!";
  } else if (!phone_regex.test(phone)) {
    error = "Provide a valid mobile number!";
  }

  return error;
}
//validate usertype
export const validate_user_type = (user_type) => {
  let error;
  if (!user_type) {
    error = "User type required!";
  }
  return error;
}