// login.js
import axios from './axios'
const form = document.getElementById('login-form');
const errorElement = document.getElementById("login-error-message");

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  axios.post('/login', formData)
    .then(response => {
      if (response.status === 200) {
        // Successful authentication, redirect to home page
        window.location.href = '/play';
      } else {
        // Authentication error, parse error message from response and display it to user
        errorElement.textContent = response.data.message;
      }
    })
    .catch(error => {
      console.error('Error during login', error);
      errorElement.textContent = "There was a problem with the login. Please try again.";
    });
});
