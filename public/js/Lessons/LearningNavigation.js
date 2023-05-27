
// import { state } from '../state.js'
// import {loadSection} from '../ulils.js'
// import {changeViewRight} from '../utils.js'

// /

// const linkToFlash = document.getElementById('new-flash')
// linkToFlash.addEventListener("click",function(){
//     // navigate to a different page
//     sessionStorage.setItem("activity","flash")
    
//     state.activity = "flash"
//     // window.location.href = "/tests";
// //    changeViewRight(activityContainer,operatorContainer)
//     // utilMethods.loadSection('operator-menu')
// })



const linkToTT = document.getElementById('new-times-tables')
linkToTT.addEventListener("click",function(){
    // sessionStorage.setItem("activity","multiple-choice")
    // state.activity = "multiple-choice"
    // changeViewRight(activityContainer,operatorContainer)
    window.location.href = "/times-tables";
    // utilMethods.loadSection('practice-menu')
    // utilMethods.loadSection('operator-menu')


})
