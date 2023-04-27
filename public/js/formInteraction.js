// const form = document.getElementById('login-form');

// form.addEventListener('submit', (event) => {

//   event.preventDefault();

//   const formData = new FormData(form);

//   fetch('/login', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => {
//     if (response.status === 200) {
//       // Successful authentication, redirect to home page
//       window.location.href = '/play';
//     } else {
//       window.location.href = '/login';
//       // Authentication error, parse error message from response and display it to user
//       response.text().then(errorMessage => {
//         const errorElement = document.getElementById("login-error-message");
//         errorElement.textContent = errorMessage;
//       });

//     }
//   })
//   .catch(error => {
//     console.error('Error during login', error);
//     window.location.href = '/login';

//   });

// });







// const form = document.getElementById('login-form');

// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const formData = new FormData(form);

//   fetch('/login', {
//     method: 'POST',
//     body: formData
//   })
//     .then(response => {
//       if (response.status === 200) {
//         // Successful authentication, redirect to home page
//         window.location.href = '/play';
//       } else {
//         // Authentication error, parse error message from response and display it to user
//         response.text().then(errorMessage => {
//           const errorElement = document.getElementById("login-error-message");
//           errorElement.textContent = errorMessage;
//         });
//       }
//     })
//     .catch(error => {
//       console.error('Error during login', error);
//       const errorElement = document.getElementById("login-error-message");
//       errorElement.textContent = "There was a problem with the login. Please try again.";
//     });
// });






const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('/login', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.status === 200) {
        // Successful authentication, redirect to home page
        window.location.href = '/play';
      } else {
        // Authentication error, parse error message from response and display it to user
        response.text().then(errorMessage => {
          const errorElement = document.getElementById("login-error-message");
          errorElement.textContent = errorMessage;
        });
      }
    })
    .catch(error => {
      console.error('Error during login', error);
      const errorElement = document.getElementById("login-error-message");
      errorElement.textContent = "There was a problem with the login. Please try again.";
    });
});










