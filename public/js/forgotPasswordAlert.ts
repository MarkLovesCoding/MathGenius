var forgotPasswordAlert = document.getElementById("forgot-password-flash-message") as HTMLElement

// When the user clicks on <span> (x), close the modal
function closeAlert():void {

  forgotPasswordAlert.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target !== forgotPasswordAlert) {
    forgotPasswordAlert.style.display = "none";
  }
}



