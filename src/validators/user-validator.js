function validateUser(user) {
  let {username, password} = user;
  let errors = [];

  if (!(username && username.length > 3)) {
    errors.push('Invalid username. Use more that 3 characters')
  }

  if (!(password && password.length > 7)) {
    errors.push('Passwords should be more than 7 characters')
  }

  return {
    errors,
    success: (!errors.length > 0)
  }
}


module.exports = validateUser;
