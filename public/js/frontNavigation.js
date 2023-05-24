
import { state } from './state.js'
// import {loadSection} from './utils.js'



  

const linkToTests = document.getElementById('new-real')
linkToTests.addEventListener("click",function(){
    // navigate to a different page
    sessionStorage.setItem("type","real")
    // state.type = "real"
    window.location.href = "/tests";
    
//    loadSection('real-menu')
})



const linkToPractice = document.getElementById('new-practice')
linkToPractice.addEventListener("click",function(){
    sessionStorage.setItem("type","practice")

    // state.type = "practice"
    window.location.href = "/practice";
//    loadSection('practice-menu')

})



// const userProfile = document.getAnimations