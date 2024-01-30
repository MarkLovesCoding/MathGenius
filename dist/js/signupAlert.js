import { closeAlert } from "./utils";
var signupAlert = document.getElementById("signup-flash-message");
// When the user clicks on <span> (x), close the modal
// function closeAlertSignUp():void {
//   signupAlert.style.display = 'none';
// }
var closeButton = document.getElementById("close-signup-alert");
closeButton.addEventListener("click", () => closeAlert(signupAlert));
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target !== signupAlert) {
        signupAlert.style.display = "none";
    }
};
