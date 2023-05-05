var signupAlert = document.getElementById("signup-flash-message");


// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal
  function closeAlert() {
    
    signupAlert.style.display = 'none';
  }

  var closeButton = document.getElementById('close-signup-alert');
  if (closeButton){
    closeButton.addEventListener('click', closeAlert);

  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target  !== signupAlert) {
    signupAlert.style.display = "none";
  }
}