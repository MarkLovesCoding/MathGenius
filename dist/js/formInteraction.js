const form = document.querySelector('#login-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(form);
  fetch('/login', {
    method: 'POST',
    body: formData
  }).then(response => {
    console.log("response", response);
    if (response.ok) {
      console.log("OK");
      // Successful authentication, redirect to home page
      //   window.location.href = '/play';
    } else {
      console.log(response.status);
      // Authentication error, parse error message from response and display it to user
      response.text().then(errorMessage => {
        // const errorElement = document.createElement('div');
        // errorElement.className = 'error';
        // errorElement.textContent = errorMessage;
        // form.insertBefore(errorElement, form.firstChild);
        const errorElement = document.getElementById("login-error-message");
        errorElement.textContent = errorMessage;
      });
    }
  }).catch(error => {
    console.error('Error during login', error);
  });
});