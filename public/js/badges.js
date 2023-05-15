


// // Saving state


import { state } from './state.js'




  async function getUserId() {
    try {
      const response = await fetch('/user-id');
      const data = await response.json();
      const userId = data.userId;
      // do something with the user ID
      return userId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }




async function retrieveBadges() {
  try {
    const response = await fetch('/get-badges');
    const data = await response.json();
    const badges = data.badges;
    console.log(data)
    console.log("badgesget:", badges);



    // return avatarSrc;
  } catch (error) {
    console.error(error);
  }
}


const testProfile =  {badges: {
  "game":{
    1:true,
    2:false,
    3:false,
    4:false,
    5:false,
  },
  "quiz":{
    1:false,
    2:false,
    3:false,
    4:true,
    5:false,
  },
  "mcquiz":{
    1:false,
    2:false,
    3:false,
    4:false,
    5:false,
  }
}}


const badgeImgs = document.getElementsByClassName("badge-img")
function updateBadges(element,profile){

    for( let el of element) {


      let type = el.getAttribute("data-badge-type")
      let diff = el.getAttribute("data-badge-number")

      if(profile['badges'][type][diff]){
        el.classList.add("active")
      }
      if(!profile['badges'][type][diff]){
        if(el.classList.contains("active")){
        el.classList.remove("active")}
      }
    }
  



}
updateBadges(badgeImgs,testProfile)
retrieveBadges();
