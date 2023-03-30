
//////////////////////////// MATH Methods
//
//
export function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
  }
export function subtract(num1, num2) {
return parseInt(num1) - parseInt(num2);
}
export function multiply(num1, num2) {
return parseInt(num1) * parseInt(num2);
}
export function divide(num1, num2) {
return parseInt(num1) / parseInt(num2);
}

export function percentage(n1, n2) {
    return Math.round(n1 / n2 * 100)
  }

export function calculation(n1, n2, o1) {
    let ans;
    switch (o1) {
        case "+":
            ans = add(n1, n2);
            break;
        case "-":
            ans = subtract(n1, n2);
            break;
        case "x":
            ans = multiply(n1, n2);
            break;
        case "÷":
            ans = divide(n1, n2);
            break;
        default:
            break;
    }
    return ans;
}

export function randomNumber(min, max) {
    let span = max - min;
    let rand = Math.floor(Math.random() * span) + min;
    return rand;
}

export function randOp(arr = operators) {
    let l = arr.length;
    let r = Math.floor(Math.random() * l);
    return arr[r];
}

export function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }
    return array;
}




////////////////////////////ASYNC Utility
//
//

export function delay(time) {
    return new Promise((res) => {
        setTimeout(res, time);
    });
}





////////////////////////////DOM Manipulation Methods
//
//



export function loadSection(sectionName) {
    // Hide all sections
    var sections = document.querySelectorAll('#main-container > div');
    for (var i = 0; i < sections.length; i++) {
      sections[i].style.display = 'none';
    }
    // Show the selected section
    var section = document.getElementById(sectionName + '-container');
    section.style.display = 'flex';
    if (sectionName == "menu"){
      section.style.display = 'grid';
      
    }
  }

export function disableInput(element) {
    element.setAttribute("disabled", "true");
}
export function enableInput(element) {
    element.removeAttribute("disabled");
    element.focus();
}

export function resetNumberToZero(element) {
    element.textContent = 0;
  }
export function resetWidth(elementsArr) {
    for (let el of elementsArr){
        el.style.width = "0px";

    }
}
export function resetAnswerInput(elementsArray) {
    for (let el of elementsArray) {
        el.value = "";
    }
}

export function visibilityTimedToggle(bool, element) {
    if (bool) {
        element.style.visibility = "visible";
        setTimeout(() => {
            element.style.visibility = "hidden";
        }, 2000);
    }
    if (!bool) {
        element.style.visibility = "hidden";
    }
}

export function visibilityToggle(bool, element) {
    if (bool) {
        element.style.visibility = "visible";
    }
    if (!bool) {
        element.style.visibility = "hidden";
    }
}

export function showHide(elementsShow = [], elementsHide = []) {
    if (elementsShow.length > 0) {
        elementsShow.forEach((el) => {
            el.style.display = "flex";
        });
    }
    if (elementsHide.length > 0) {
        elementsHide.forEach((el) => {
            el.style.display = "none";
        });
    }
}

export function toggleActivate(e) {
    e.target.classList.toggle("active-subject");
}



////////////////////////////ANIMATION/STYLING Methods
//
//

export function emphasize(
    element,
    transitionTime = 100,
    scale = 1.3,
    scaleTime = 250
) {
    scaleTime = parseInt(scaleTime);
    scale = parseFloat(scale);
    transitionTime = parseInt(transitionTime);
    let existingTransform = getStyle(element, "transform") || "";
    element.style.transition = `transform ${transitionTime}ms ease-in`;
    element.style.transform = existingTransform + " scale(1.1)";
    setTimeout(
        () => (element.style.transform = existingTransform + ` scale(${scale})`),
        50
    );
    setTimeout(
        () => (element.style.transform = existingTransform + " scale(1)"),
        scaleTime
    );
}

export function animateCorrect(element) {
    element.style.background = "green";
    element.style.borderColor = "white";
    setTimeout(() => {
        element.style.background = "rgb(200 200 200 / 95%)";
        element.style.borderColor = "rgba(100,100,100,1)";
    }, 700);
}
export function animateIncorrect(element) {
    element.style.background = "darkred";
    element.style.borderColor = "white";
    setTimeout(() => {
        element.style.background = "rgb(200 200 200 / 95%)";
        element.style.borderColor = "rgba(100,100,100,1)";
    }, 700);
}

export function incorrectMotion(element) {
    element.classList.add("incorrect");
    setTimeout(() => {
        element.classList.remove("incorrect");
    }, 500);
}


export function getStyle(el, styleProp) {
    var value,
        defaultView = (el.ownerDocument || document).defaultView;
    if (defaultView && defaultView.getComputedStyle) {
        styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) {
        styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
            return letter.toUpperCase();
        });
        value = el.currentStyle[styleProp];
        if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return (function (value) {
                var oldLeft = el.style.left,
                    oldRsLeft = el.runtimeStyle.left;
                el.runtimeStyle.left = el.currentStyle.left;
                el.style.left = value || 0;
                value = el.style.pixelLeft + "px";
                el.style.left = oldLeft;
                el.runtimeStyle.left = oldRsLeft;
                return value;
            })(value);
        }
        return value;
    }
}


