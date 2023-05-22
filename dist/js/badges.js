// // // Saving state

// import { state } from './state.js'

// let badgesFromDb;
// const badgeImgs = document.getElementsByClassName("badge-img")

//   async function getUserId() {
//     try {
//       const response = await fetch('/user-id');
//       const data = await response.json();
//       const userId = data.userId;
//       // do something with the user ID
//       return userId;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

// async function retrieveBadges() {
//   try {
//     const response = await fetch('/get-badges');
//     const data = await response.json();
//     const badges = data.badges
//     console.log(data)
//     console.log("badgesget:", badges);

//     state.user.badges = badges

//     // return avatarSrc;
//   } catch (error) {
//     console.error(error);
//   }
// }

// function updateBadgeAppearance(element,profile){

//     for( let el of element) {

//       let type = el.getAttribute("data-badge-type")
//       console.log(type);
//       let diff = el.getAttribute("data-badge-number")
//       console.log(diff);

//       if(profile[type][diff]){
//         el.classList.add("active")
//       }
//       if(!profile[type][diff]){
//         if(el.classList.contains("active")){
//         el.classList.remove("active")}
//       }
//     }

// }

// // Updates badge status based on type, difficulty, and trueness. Implimented within game client script.
// export async function updateBadgeStatus(type, difficulty, bool){
//   console.log(type);
//   console.log(difficulty);
//   console.log(bool);
//   console.log(badgesFromDb);
//   if(bool){
//     badgesFromDb[type][difficulty] = true
//     updateSessionAndDB(badgesFromDb)
//   }
// }
// async function updateSessionAndDB(updatedBadges) {
//   console.log("newsrc:" , updatedBadges)
//   try {
//     const userId = await getUserId();
//     if (!userId) {
//       console.error('Failed to retrieve user ID');
//       return;
//     }

//     const response = await fetch(`/update-badges`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ userId, updatedBadges })
//     });

//     if (response.ok) {
//       console.log('Image source updated successfully!');
//     } else {
//       console.error('Error updating image source!');
//     }
//   } catch (error) {
//     console.error('There was a problem with the fetch operation:', error);
//   }
// }

// updateBadgeAppearance(badgeImgs,badgesFromDb)

import { state } from './state.js';
const badgeImgs = document.getElementsByClassName("badge-img");

// Retrieves the user ID
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

// Retrieves badges from the server
async function retrieveBadges() {
  try {
    const response = await fetch('/get-badges');
    const data = await response.json();
    const badges = data.badges;
    // console.log("badgesget:", badges);
    state.user.badges = badges;
    return badges;
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
}

// Updates the appearance of badges based on the profile
function updateBadgeAppearance(elements, profile) {
  for (let element of elements) {
    let type = element.getAttribute("data-badge-type");
    let diff = element.getAttribute("data-badge-number");
    if (profile[type][diff]) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  }
}

// Updates badge status based on type, difficulty, and trueness. Implemented within game client script.
export async function updateBadgeStatus(type, difficulty, bool) {
  try {
    const badgesFromDb = await retrieveBadges();
    if (bool) {
      badgesFromDb[type][difficulty] = true;
      await updateSessionAndDB(badgesFromDb);
    }
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
}

// Updates session and database with the updated badges
async function updateSessionAndDB(updatedBadges) {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.error('Failed to retrieve user ID');
      return;
    }
    const response = await fetch(`/update-badges`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        updatedBadges
      })
    });
    if (response.ok) {
      console.log('Badges updated successfully!');
    } else {
      console.error('Error updating badges!');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Initialize the badge appearance
async function initializeBadgeAppearance() {
  const badgesFromDb = await retrieveBadges();
  updateBadgeAppearance(badgeImgs, badgesFromDb);
}

// Call the initialization function
initializeBadgeAppearance();