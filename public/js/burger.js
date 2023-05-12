const hamburgerMenu = document.getElementById('burger');
const burgerContainer = document.getElementById('burger-container');
const expandedMenu = document.getElementById('expanded-menu');
const burgerSpans = document.querySelectorAll('.burger span');
const burger = document.getElementById('burger');

function toggleMenu() {
  hamburgerMenu.classList.toggle('active');
  // burgerSpans.classList.toggle('active');
  expandedMenu.classList.toggle('active');

  burgerSpans.forEach(span => {
    span.classList.toggle('active');
  });
}


burgerContainer.addEventListener("click", (e) => {
  burger.classList.toggle("open"); // Toggle the "open" class on the burger element when the burgerContainer element is clicked
});

hamburgerMenu.addEventListener('click', toggleMenu);
expandedMenu.addEventListener('click', toggleMenu);





const testNav = document.getElementById('test-nav')
const practiceNav = document.getElementById('practice-nav')
import { state } from './state.js'


testNav.addEventListener("click", function () {
  state.type = "real"
  window.location.href = "/tests";

  utilMethods.loadSection('real-menu')



})
practiceNav.addEventListener("click", function () {
  state.type = "practice"
  window.location.href = "/practice";
  utilMethods.loadSection('practice-menu')

})

