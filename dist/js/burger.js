"use strict";const burgerContainer=document.getElementById("burger-container"),expandedMenu=document.getElementById("expanded-menu"),burgerSpans=document.querySelectorAll(".burger span"),burger=document.getElementById("burger"),testNav=document.getElementById("test-nav")?.parentElement,practiceNav=document.getElementById("practice-nav")?.parentElement,learningNav=document.getElementById("learning-nav")?.parentElement,profileNav=document.getElementById("profile-nav")?.parentElement,homeNav=document.getElementById("home-nav")?.parentElement,logoutNav=document.getElementById("logout-nav")?.parentElement;function toggleMenu(){burger.classList.toggle("active"),expandedMenu.classList.toggle("active"),burgerSpans.forEach(e=>{e.classList.toggle("active")})}document.addEventListener("click",function(e){burgerContainer.contains(e.target)||expandedMenu.contains(e.target)||(burger.classList.remove("active"),expandedMenu.classList.remove("active"),burgerSpans.forEach(e=>{e.classList.remove("active")}))}),burgerContainer.addEventListener("click",toggleMenu),burger.addEventListener("click",function(e){e.stopPropagation(),toggleMenu()}),burgerSpans.forEach(e=>{e.addEventListener("click",function(e){e.stopPropagation(),toggleMenu()})}),testNav&&testNav.addEventListener("click",function(){window.location.href="/challenges"}),practiceNav&&practiceNav.addEventListener("click",function(){window.location.href="/practice"}),learningNav&&learningNav.addEventListener("click",function(){window.location.href="/learning"}),profileNav&&profileNav.addEventListener("click",function(){window.location.href="/profile"}),homeNav&&homeNav.addEventListener("click",function(){window.location.href="/"}),logoutNav&&logoutNav.addEventListener("click",function(){window.location.href="/logout"});