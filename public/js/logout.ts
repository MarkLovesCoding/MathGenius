// Add an event listener for when the logout button is clicked
const logoutBtn = <HTMLElement>document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  // Redirect to the logout page
  window.location.href = "/logout";
});
