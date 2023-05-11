const testNav = document.getElementById('test-nav')
const practiceNav = document.getElementById('practice-nav')
import { state } from './state.js'


testNav.addEventListener("click",function(){
    state.type = "real"
    
    utilMethods.loadSection('real-menu')

    

})
practiceNav.addEventListener("click",function(){
    utilMethods.loadSection('practice-menu')
    state.type = "practice"
})


  
  