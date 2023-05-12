


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

retrieveBadges();
