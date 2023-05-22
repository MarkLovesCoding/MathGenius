var forgotPasswordAlert = document.getElementById("forgot-password-flash-message");

// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal
function closeAlert() {
  forgotPasswordAlert.style.display = 'none';
}

// var closeButton = document.getElementById('close-forgot-password-alert');
// closeButton.addEventListener('click', closeAlert);

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target !== forgotPasswordAlert) {
    forgotPasswordAlert.style.display = "none";
  }
};