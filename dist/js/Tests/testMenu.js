import*as utilMethods from"../utils.js";window.onload=function(){sessionStorage.setItem("activeDifficulty","1");var e=document.getElementById("operator-test-menu-backward-lower"),t=document.getElementById("difficulty-menu-forward"),o=document.getElementById("difficulty-menu-backward-lower"),i=document.querySelectorAll(".activity-choice"),a=document.querySelectorAll(".real-choice");const n=document.getElementById("operator-menu-container"),r=document.getElementById("real-menu-container"),c=document.getElementById("difficulty-menu-container"),s=document.querySelectorAll(".operator-choice"),l=document.getElementById("range-input"),d=document.getElementById("range-value"),u=document.getElementById("level-text");function m(t){for(let e of t)e.addEventListener("click",()=>{t.forEach(e=>e.classList.remove("activity-selected")),e.classList.add("activity-selected")})}e.addEventListener("click",()=>{utilMethods.changeViewLeft(r,n)}),o.addEventListener("click",()=>{utilMethods.changeViewLeft(n,c)}),t.addEventListener("click",()=>{utilMethods.updateDifficultyRange(),"multiple-choice-quiz"===sessionStorage.getItem("activity")?window.location.href="/multiple-choice-quiz":"game"===sessionStorage.getItem("activity")?window.location.href="/high-score-challenge":"quiz"===sessionStorage.getItem("activity")&&(window.location.href="pop-quiz")}),m(i),m(a);var g=s;for(let o of g)o.addEventListener("click",()=>{g.forEach(e=>e.classList.remove("active-operator")),o.classList.add("active-operator");var e=function(t){let o="+";for(let e=0;e<4;e++)if(t[e].classList.contains("active-operator")){switch(t[e].getAttribute("id")){case"add":o="+";break;case"sub":o="-";break;case"mul":o="x";break;case"div":o="÷";break;default:o="+"}sessionStorage.setItem("activeOperators",o)}return o}(s);if(!e)throw new Error("Session Storage for Operator not Set");sessionStorage.setItem("activeOperators",e);var t=sessionStorage.getItem("activity");utilMethods.updateOperatorSelected(e),"game"==t?(sessionStorage.setItem("activeDifficulty","1"),window.location.href="/high-score-challenge"):utilMethods.changeViewRight(n,c)});const f={1:{name:"Easy",color:"green"},2:{name:"Novice",color:"yellow"},3:{name:"Intermediate",color:"orange"},4:{name:"Advanced",color:"red"},5:{name:"Genius!",color:"purple"}};l.addEventListener("input",()=>{var e=parseInt(l.value,10),t=(sessionStorage.setItem("activeDifficulty",e.toString()),d.textContent=e.toString(),f[e].color);l.style.setProperty("--thumb-color",t),u.textContent=f[e].name})};