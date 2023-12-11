// Get references to the necessary elements
const linkToTT = <HTMLElement>document.getElementById("new-times-tables");
const linkToFractions = <HTMLElement>document.getElementById("new-fractions");

// Add event listener for linkToTT
if (linkToTT)
  linkToTT.addEventListener("click", function () {
    // Redirect to "/learning/times-table" page
    window.location.href = "/learning/times-table";
  });

// Add event listener for linkToFractions
if (linkToFractions)
  linkToFractions.addEventListener("click", function () {
    // Redirect to "/learning/fractions" page
    window.location.href = "/learning/fractions";
  });
