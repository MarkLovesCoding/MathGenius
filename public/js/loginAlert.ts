import { closeAlert } from "./utils";

var loginAlert = <HTMLElement>document.getElementById("login-flash-message");
var closeButton = <HTMLElement>document.getElementById("close-login-alert");

// When the user clicks on <span> (x), close the modal

if (closeButton) {
  closeButton.addEventListener("click", () => closeAlert(loginAlert));
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target !== loginAlert) {
    loginAlert.style.display = "none";
  }
};
