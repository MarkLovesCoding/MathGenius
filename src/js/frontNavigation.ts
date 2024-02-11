// Get references to the necessary elements
const linkToTests = <HTMLElement>document.getElementById("new-real");
const linkToPractice = <HTMLElement>document.getElementById("new-practice");
const linkToLearning = <HTMLElement>document.getElementById("new-learning");

// Add event listener for linkToTests
if (linkToTests)
  linkToTests.addEventListener("click", function () {
    sessionStorage.setItem("type", "real");

    // Redirect to "/tests" page
    window.location.href = "/challenges";
  });

// Add event listener for linkToPractice
if (linkToPractice)
  linkToPractice.addEventListener("click", function () {
    sessionStorage.setItem("type", "practice");

    // Redirect to "/practice" page
    window.location.href = "/practice";
  });

// Add event listener for linkToLearning
if (linkToLearning)
  linkToLearning.addEventListener("click", function () {
    sessionStorage.setItem("type", "learning");

    // Redirect to "/learning" page
    window.location.href = "/learning";
  });
