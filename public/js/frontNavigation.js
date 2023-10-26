// Get references to the necessary elements
const linkToTests = document.getElementById('new-real');
const linkToPractice = document.getElementById('new-practice');
const linkToLearning = document.getElementById('new-learning');

// Add event listener for linkToTests
linkToTests.addEventListener("click", function () {
  sessionStorage.setItem("type", "real");
  
  // Redirect to "/tests" page
  window.location.href = "/challenges";
});

// Add event listener for linkToPractice
linkToPractice.addEventListener("click", function () {
  sessionStorage.setItem("type", "practice");
  
  // Redirect to "/practice" page
  window.location.href = "/practice";
});

// Add event listener for linkToLearning
linkToLearning.addEventListener("click", function () {
  sessionStorage.setItem("type", "learning");
  
  // Redirect to "/learning" page
  window.location.href = "/learning";
});
