const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', event => {
  event.preventDefault(); // prevent default form submission behavior

  const formData = new FormData(loginForm);
  fetch('/login', {
    method: 'POST',
    body: formData
  }).then(response => {
    if (response.ok) {
      console.log("passed!!!!");
      // redirect to play page on successful login
      window.location.href = '/play';
    } else {
      // display error message on failed login
      response.json().then(data => {
        console.log(data.error);
      });
    }
  }).catch(error => {
    console.log(error);
  });
});