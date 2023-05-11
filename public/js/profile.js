var modal = document.getElementById("avatar-modal");
var btn = document.getElementById("choose-avatar");
var profile = document.getElementById("profile-user-avatar");
var span = document.getElementById("avatar-modal-close");
var userIcons = document.querySelectorAll(".avatar-user-icons img");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// add click event listener to user icon options
userIcons.forEach(function(icon) {
  icon.addEventListener("click", function() {
    // set selected icon as background image for button
    profile.setAttribute("src", this.src );
    // close the modal
    modal.style.display = "none";
  });
});
