// Get references to the necessary elements
const burgerContainer = document.getElementById('burger-container') as HTMLElement
const expandedMenu = document.getElementById('expanded-menu') as HTMLElement
const burgerSpans = document.querySelectorAll('.burger span') as NodeListOf<Element>
const burger = document.getElementById('burger') as HTMLElement
const testNav = (document.getElementById('test-nav') as HTMLElement)?.parentElement;
const practiceNav = (document.getElementById('practice-nav') as HTMLElement)?.parentElement;
const learningNav = (document.getElementById('learning-nav') as HTMLElement)?.parentElement;
const profileNav = (document.getElementById('profile-nav') as HTMLElement)?.parentElement;
const homeNav = (document.getElementById('home-nav') as HTMLElement)?.parentElement;
const logoutNav = (document.getElementById('logout-nav') as HTMLElement)?.parentElement;



// Function to toggle the menu
function toggleMenu():void {
  burger.classList.toggle('active');
  expandedMenu.classList.toggle('active');
  burgerSpans.forEach(span => {
    span.classList.toggle('active');
  });
}

// Event listener to close the menu when clicking outside
document.addEventListener('click', function (e) {

  if (!burgerContainer.contains(e.target as HTMLElement) && !expandedMenu.contains(e.target as HTMLElement)) {
    burger.classList.remove('active');
    expandedMenu.classList.remove('active');
    burgerSpans.forEach(span => {
      span.classList.remove('active');
    });
  }
});

// Event listener to toggle the menu when clicking on the burger
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

// Event listeners for internal navigation from the burger menu


if(testNav) testNav.addEventListener("click", function () {
  window.location.href = "/challenges";
});

if(practiceNav) practiceNav.addEventListener("click", function () {
  window.location.href = "/practice";
});

if(learningNav) learningNav.addEventListener("click", function () {
  window.location.href = "/learning";
});

if(profileNav) profileNav.addEventListener("click", function () {
  window.location.href = "/profile";
});

if(homeNav) homeNav.addEventListener("click", function () {
  window.location.href = "/";
});

if(logoutNav) logoutNav.addEventListener("click", function () {
  window.location.href = "/logout";
});
