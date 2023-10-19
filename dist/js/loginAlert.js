var loginAlert = document.getElementById("login-flash-message");

// When the user clicks on <span> (x), close the modal
function closeAlert() {
  loginAlert.style.display = 'none';
}
var closeButton = document.getElementById('close-login-alert');
if (closeButton) {
  closeButton.addEventListener('click', closeAlert);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target !== loginAlert) {
    loginAlert.style.display = "none";
  }
};