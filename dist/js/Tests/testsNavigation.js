import{changeViewRight}from"../utils.js";const operatorContainer=document.getElementById("operator-menu-container"),activityContainer=document.getElementById("real-menu-container"),linkToGame=document.getElementById("new-game"),linkToQuiz=(linkToGame.addEventListener("click",function(){sessionStorage.setItem("activity","game"),changeViewRight(activityContainer,operatorContainer)}),document.getElementById("new-quiz")),linkToMCQuiz=(linkToQuiz.addEventListener("click",function(){sessionStorage.setItem("activity","quiz"),changeViewRight(activityContainer,operatorContainer)}),document.getElementById("new-mc-quiz"));linkToMCQuiz.addEventListener("click",function(){sessionStorage.setItem("activity","multiple-choice-quiz"),changeViewRight(activityContainer,operatorContainer)});