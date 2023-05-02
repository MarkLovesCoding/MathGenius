    console.log("success")
    
    var success = document.getElementById('success')
    console.log("successsss")
    // Fade out the overlay after 1 second
    setTimeout(function() {
        success.style.opacity = "0";
      }, 1000);
      
      // Hide the overlay after 2 seconds
      setTimeout(function() {
        success.style.display = "none";
        success.style.zIndex = "0";
      }, 2000);
