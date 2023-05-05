const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const submitBtn = document.querySelector('#reset-password-button');

function validatePassword() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Passwords do not match');
  } else {
    confirmPassword.setCustomValidity('');
  }
}

password.addEventListener('change', validatePassword);
confirmPassword.addEventListener('keyup', validatePassword);

submitBtn.addEventListener('click', (event) => {
  if (password.value !== confirmPassword.value) {
    event.preventDefault();
    confirmPassword.setCustomValidity('Passwords do not match');
  } else {
    confirmPassword.setCustomValidity('');
  }
});