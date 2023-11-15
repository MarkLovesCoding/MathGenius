

var getUsernameAlert = document.getElementById("get-username-flash-message") as HTMLElement

// When the user clicks on <span> (x), close the modal

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target !== getUsernameAlert) {
    getUsernameAlert.style.display = "none";
  }
}



