const burgerContainer = document.getElementById('burger-container');
const expandedMenu = document.getElementById('expanded-menu');
const burgerSpans = document.querySelectorAll('.burger span');
const burger = document.getElementById('burger');
function toggleMenu() {
  burger.classList.toggle('active');
  expandedMenu.classList.toggle('active');
  burgerSpans.forEach(span => {
    span.classList.toggle('active');
  });
}
document.addEventListener('click', function (e) {
  if (!burgerContainer.contains(e.target) && !expandedMenu.contains(e.target)) {
    burger.classList.remove('active');
    expandedMenu.classList.remove('active');
    burgerSpans.forEach(span => {
      span.classList.remove('active');
    });
  }
});
burgerContainer.addEventListener('click', toggleMenu);

// Stop the propagation of the click event on the burger and its child elements
burger.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu();
});
burgerSpans.forEach(span => {
  span.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });
});
document.querySelectorAll('#expanded-menu li a, #close-menu').forEach(el => {
  el.addEventListener('click', toggleMenu);
});

// Internal navigation from burger menu

const testNav = document.getElementById('test-nav');
const practiceNav = document.getElementById('practice-nav');
const learningNav = document.getElementById('learning-nav');
// import { state } from './state.js'

testNav.addEventListener("click", function () {
  // state.type = "real"
  window.location.href = "/tests";

  // utilMethods.loadSection('real-menu')
});

practiceNav.addEventListener("click", function () {
  // state.type = "practice"
  window.location.href = "/practice";
  // utilMethods.loadSection('practice-menu')
});

learningNav.addEventListener("click", function () {
  // state.type = "learning"
  window.location.href = "/learning";
  // utilMethods.loadSection('learning-menu')
});