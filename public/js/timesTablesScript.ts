var isLandscape: boolean | null;

// Event listener for window resize to check if the orientation is landscape
window.addEventListener("resize", function () {
  isLandscape = window.matchMedia("(orientation: landscape)").matches;
});

// Event listener for DOMContentLoaded to set up the initial state
window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const numbers = document.querySelectorAll(".number") as NodeListOf<HTMLDivElement>;
    const timesTable = document.querySelector(".times-table") as HTMLDivElement;
    let activeNumber = document.querySelector('.number[data-number="1"]') as HTMLDivElement | null;

    // Load times table for number 1 on page load
    const initialNumber = document.querySelector('.number[data-number="1"]') as HTMLDivElement;
    if (initialNumber) {
      initialNumber.classList.add("active");
      timesTable.innerHTML = generateTimesTable(1);
      timesTable.style.height = timesTable.scrollHeight + "px";
    }
    // Event listener for mouseenter on number elements
    numbers.forEach(function (number:HTMLDivElement) {
      number.addEventListener("mouseenter", function () {

        // Check if the device is in landscape orientation
        if (isLandscape) {
          var numberValue = parseInt(number.getAttribute("data-number") as string);

          if (activeNumber !== null) {
            activeNumber.classList.remove("active");
            timesTable.innerHTML = generateTimesTable(numberValue);
          } else {
            timesTable.innerHTML = generateTimesTable(numberValue);
          }

          number.classList.add("active");
          activeNumber = number;
        }
        else {
          var numberValue = parseInt(number.getAttribute("data-number") as string);

          if (activeNumber !== null) {
            activeNumber.classList.remove("active");
            timesTable.innerHTML = generateTimesTable(numberValue);
          } else {
            timesTable.innerHTML = generateTimesTable(numberValue);
          }

          number.classList.add("active");
          activeNumber = number;
        }

      });
    });
  }, 200);
});

// Function to generate a times table for a given number
function generateTimesTable(number:number):string {
  var table = "<table>";

  for (var i = 1; i <= 12; i++) {
    table += "<tr>";
    table += "<th>" + number + " × " + i + " = " + "</th>";
    table += "<td>" + number * i + "</td>";
    table += "</tr>";
  }

  table += "</table>";

  return table;
}
