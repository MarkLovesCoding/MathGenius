
import { state } from '../state.js'
import {loadSection} from '../ulils.js'



  

const linkToFlash = document.getElementById('new-flash')
linkToFlash.addEventListener("click",function(){
    // navigate to a different page
    
    state.activity = "flash"
    // window.location.href = "/tests";
    
    loadSection('operator-menu')
})



const linkToMC = document.getElementById('new-mc')
linkToMC.addEventListener("click",function(){

    state.activity = "multiple-choice"

    // window.location.href = "/practice";
    // utilMethods.loadSection('practice-menu')
    loadSection('operator-menu')


})
