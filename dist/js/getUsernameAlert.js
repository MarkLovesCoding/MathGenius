var getUsernameAlert = document.getElementById("get-username-flash-message");

// When the user clicks on <span> (x), close the modal
function closeAlert() {
  getUsernameAlert.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target !== getUsernameAlert) {
    getUsernameAlert.style.display = "none";
  }
};