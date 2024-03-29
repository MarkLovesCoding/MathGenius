var success = <HTMLElement>document.getElementById("success");
// Fade out the overlay after 1 second
if (success) {
  setTimeout(function () {
    success.style.opacity = "0";
  }, 1000);

  // Hide the overlay after 2 seconds
  setTimeout(function () {
    success.style.display = "none";
    success.style.zIndex = "0";
  }, 2000);
}
