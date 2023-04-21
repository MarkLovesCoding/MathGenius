

const Swal = require('sweetalert2')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const errorType = urlParams.get('error');

if (errorType === 'login-error') {
  Swal.fire({
    icon: 'error',
    title: 'Login Error',
    text: 'Incorrect username or password'
  });
} else if (errorType === 'signup-error') {
  const errorMessage = document.querySelector('.error-message').textContent;
  Swal.fire({
    icon: 'error',
    title: 'Signup Error',
    text: errorMessage
  });
}
const errorMessage = document.querySelector('#error-message p').textContent;
if (errorMessage) {
  Swal.fire({
    icon: 'error',
    title: 'Sign up failed',
    text: errorMessage
  });
}