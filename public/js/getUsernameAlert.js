

    var getUsernameAlert = document.getElementById("get-username-flash-message");


    // When the user clicks the button, open the modal 
    
    // When the user clicks on <span> (x), close the modal
      function closeAlert() {
        
        getUsernameAlert.style.display = 'none';
      }
    
      // var closeButton = document.getElementById('close-forgot-password-alert');
      // closeButton.addEventListener('click', closeAlert);
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target  !== getUsernameAlert) {
        getUsernameAlert.style.display = "none";
      }
    }
    
    

