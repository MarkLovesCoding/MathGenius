


// // Saving state



import { state } from './state.js'

const modal = document.getElementById("avatar-modal");
const btn = document.getElementById("choose-avatar");
const profile = document.getElementById("profile-user-avatar");
const span = document.getElementById("avatar-modal-close");
const userIcons = document.querySelectorAll(".avatar-user-icons img");



  btn.onclick = function () {
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // add click event listener to user icon options
  userIcons.forEach(function(icon) {
    icon.addEventListener("click", async function () {
      // set selected icon as background image for button
      profile.setAttribute("src", this.src);
      state.user.profileImage = this.src

      updateSessionAndDB(this.src)

      modal.style.display = "none";
    });
  });



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


  
// function getUserId(){
//   return fetch('/user-id')
//     .then(response => response.json())
//     .then(data => {
//       const userId = data.userId;
//       // do something with the user ID
//       return userId;
//     })
//     .catch(error => {
//       console.error(error);
//       throw error;
//     });
// }

async function updateSessionAndDB(newSrc) {
  console.log("newsrc:" , newSrc)
  try {
    const userId = await getUserId();
    if (!userId) {
      console.error('Failed to retrieve user ID');
      return;
    }

    const response = await fetch(`/update-image`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, newSrc })
    });

    if (response.ok) {
      console.log('Image source updated successfully!');
    } else {
      console.error('Error updating image source!');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}






async function retrieveAvatar() {
  try {
    const response = await fetch('/get-avatar');
    const data = await response.json();
    const avatarSrc = data.avatarSrc;
    console.log(data)
    console.log("AVSRC:", avatarSrc);
    const trimmedSrc = avatarSrc.replace(/https?:\/\/[^\/]+/, '../');
    console.log("AVSRC-trim:", trimmedSrc);

    profile.src = trimmedSrc;
    // return avatarSrc;
  } catch (error) {
    console.error(error);
  }
}

retrieveAvatar();
