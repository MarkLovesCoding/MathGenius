
var isLandscape;

window.addEventListener("resize", function () {
  isLandscape = window.matchMedia("(orientation: landscape)").matches;
  // console.log(isLandscape);
});

window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function(){
    var numbers = document.querySelectorAll(".number");
    var timesTable = document.querySelector(".times-table");
    var activeNumber =  document.querySelector('.number[data-number="1"]');
    
      // Load times table for number 1 on page load
      var initialNumber = document.querySelector('.number[data-number="1"]');
      initialNumber.classList.add("active");
      timesTable.innerHTML = generateTimesTable(1);
      timesTable.style.height = timesTable.scrollHeight + "px";
        numbers.forEach(function (number) {
      number.addEventListener("mouseenter", function () {
        
    if(isLandscape){
        
        var numberValue = parseInt(number.getAttribute("data-number"));
  
        if (activeNumber !== null) {
          activeNumber.classList.remove("active");
          // timesTable.style.width = "0";
    
            timesTable.innerHTML = generateTimesTable(numberValue);
            // timesTable.style.width = "300px"
      
        } else {
          timesTable.innerHTML = generateTimesTable(numberValue);
          // timesTable.style.width = "300px";
        }
  
        number.classList.add("active");
        activeNumber = number;
        
        
    }
    else{
            var numberValue = parseInt(number.getAttribute("data-number"));
  
        if (activeNumber !== null) {
          activeNumber.classList.remove("active");
          // timesTable.style.height = "0";
          // setTimeout(function () {
            timesTable.innerHTML = generateTimesTable(numberValue);
            // timesTable.style.height = timesTable.scrollHeight + "px";
          // }, 300);
        } else {
          timesTable.innerHTML = generateTimesTable(numberValue);
          // timesTable.style.height = timesTable.scrollHeight + "px";
        }
  
        number.classList.add("active");
        activeNumber = number;
    }    
        
      });
        })
    


  },200)
 
});

function generateTimesTable(number) {
  var table = "<table>";

  for (var i = 1; i <= 12; i++) {
    table += "<tr>";
    table += "<th>" + number + " × " + i + " = "+ "</th>" ;
    table += "<td>" + number * i + "</td>";
    table += "</tr>";
  }

  table += "</table>";

  return table;
}
