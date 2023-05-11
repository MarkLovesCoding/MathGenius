const hamburgerMenu = document.getElementById('burger');
const burgerContainer = document.getElementById('burger-container');
const expandedMenu = document.getElementById('expanded-menu');
const burgerSpans = document.querySelectorAll('.burger span');
function toggleMenu() {
  hamburgerMenu.classList.toggle('active');
  // burgerSpans.classList.toggle('active');
  expandedMenu.classList.toggle('active');
  burgerSpans.forEach(span => {
    span.classList.toggle('active');
  });
}
burgerContainer.addEventListener("click", e => {
  burger.classList.toggle("open"); // Toggle the "open" class on the burger element when the burgerContainer element is clicked
});

hamburgerMenu.addEventListener('click', toggleMenu);
expandedMenu.addEventListener('click', toggleMenu);