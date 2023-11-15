
const password = document.querySelector('#password') as HTMLInputElement;
const confirmPassword = document.querySelector('#confirm-password') as HTMLInputElement;
const submitBtn = document.querySelector('#reset-password-button') as HTMLButtonElement;

if (!password || !confirmPassword || !submitBtn) {
  throw new Error('Elements not found');
}

// Function to validate if the passwords match
function validatePassword():void {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Passwords do not match');
  } else {
    confirmPassword.setCustomValidity('');
  }
}

// Validate passwords on change event for the password input
password.addEventListener('change', validatePassword);

// Validate passwords on keyup event for the confirm password input
confirmPassword.addEventListener('keyup', validatePassword);

// Handle form submission
submitBtn.addEventListener('click', (event:MouseEvent):void => {
  if (password.value !== confirmPassword.value) {
    event.preventDefault();
    confirmPassword.setCustomValidity('Passwords do not match');
  } else {
    confirmPassword.setCustomValidity('');
  }
});
