
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

document.addEventListener('click', function(e) {
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
burger.addEventListener('click', function(e) {
  e.stopPropagation();
  toggleMenu();
});

burgerSpans.forEach(span => {
  span.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });
});

document.querySelectorAll('#expanded-menu li a, #close-menu').forEach(el => {
  el.addEventListener('click', toggleMenu);
});









// Internal navigation from burger menu








const testNav = document.getElementById('test-nav').parentElement
const practiceNav = document.getElementById('practice-nav').parentElement
const learningNav = document.getElementById('learning-nav').parentElement
const profileNav = document.getElementById('profile-nav').parentElement
const homeNav = document.getElementById('home-nav').parentElement
const logoutNav = document.getElementById('logout-nav').parentElement


testNav.addEventListener("click", function () {
  window.location.href = "/tests";
})

practiceNav.addEventListener("click", function () {
  window.location.href = "/practice";
})

learningNav.addEventListener("click", function () {
  window.location.href = "/learning";
})

profileNav.addEventListener("click", function () {
  window.location.href = "/profile";
})

homeNav.addEventListener("click", function () {
  window.location.href = "/";
})

logoutNav.addEventListener("click", function () {
  window.location.href = "/logout";

})
