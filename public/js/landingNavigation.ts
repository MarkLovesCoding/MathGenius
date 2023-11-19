// Get references to the necessary elements
const login = <HTMLElement>document.getElementById('landing-log-in') 
const signup = <HTMLElement>document.getElementById('landing-signup') 
const guest = <HTMLElement>document.getElementById('landing-guest') 

// Add event listener for login
login.addEventListener("click", function () {
  // Redirect to "/login" page
  window.location.href = "/login";
});

// Add event listener for signup
signup.addEventListener("click", function () {
  // Redirect to "/signup" page
  window.location.href = "/signup";
});

// Add event listener for guest
guest.addEventListener("click", function () {
  // Redirect to "/guest" page
  window.location.href = "/guest";
});
