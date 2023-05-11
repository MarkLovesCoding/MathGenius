const hamburgerMenu = document.getElementById('burger');
const circularMenu = document.getElementById('burger-menu-open');

function toggleMenu() {
  hamburgerMenu.classList.toggle('active');
  circularMenu.classList.toggle('active');
}

hamburgerMenu.addEventListener('click', toggleMenu);
circularMenu.addEventListener('click', toggleMenu);
