"use strict";
var resetPasswordAlert = document.getElementById("reset-password-flash-message");
// When the user clicks on <span> (x), close the modal
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target !== resetPasswordAlert) {
        resetPasswordAlert.style.display = "none";
    }
};
