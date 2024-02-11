const password = <HTMLInputElement>document.querySelector("#password");
const confirmPassword = <HTMLInputElement>(
  document.querySelector("#confirm-password")
);
const submitBtn = <HTMLButtonElement>(
  document.querySelector("#reset-password-button")
);

if (!password || !confirmPassword || !submitBtn) {
  throw new Error("Elements not found");
}

// Function to validate if the passwords match
function validatePassword(): void {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match");
  } else {
    confirmPassword.setCustomValidity("");
  }
}

// Validate passwords on change event for the password input
password.addEventListener("change", validatePassword);

// Validate passwords on keyup event for the confirm password input
confirmPassword.addEventListener("keyup", validatePassword);

// Handle form submission
submitBtn.addEventListener("click", (event: MouseEvent): void => {
  if (password.value !== confirmPassword.value) {
    event.preventDefault();
    confirmPassword.setCustomValidity("Passwords do not match");
  } else {
    confirmPassword.setCustomValidity("");
  }
});
