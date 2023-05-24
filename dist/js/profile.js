const modal = document.getElementById("avatar-modal");
const profile = document.getElementById("profile-user-avatar");
const span = document.getElementById("avatar-modal-close");
const userIconsContainer = document.getElementById("avatar-user-icons");
profile.onclick = function () {
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
async function retrieveAvatar() {
  try {
    const response = await fetch('/get-avatar');
    const data = await response.json();
    const avatarSrc = data.avatarSrc;
    const trimmedSrc = avatarSrc.replace(/https?:\/\/[^\/]+/, '../');
    profile.src = trimmedSrc;
  } catch (error) {
    console.error(error);
  }
}
retrieveAvatar();

// Handle user icon selection
// userIconsContainer.addEventListener("click", async function (event) {
//   const selectedIcon = event.target.closest("img");
//   if (selectedIcon) {
//     profile.setAttribute("src", selectedIcon.src);
//     state.user.profileImage = selectedIcon.src;
//     await updateSessionAndDB(selectedIcon.src);
//     modal.style.display = "none";
//   }
// });

userIconsContainer.addEventListener("click", handleUserIconClick);
async function handleUserIconClick(event) {
  const selectedIcon = event.target.closest("img");
  if (selectedIcon) {
    profile.setAttribute("src", selectedIcon.src);
    await updateSessionAndDB(selectedIcon.src);
    modal.style.display = "none";
  }
}

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

// Updates session and database with the new image source
async function updateSessionAndDB(newSrc) {
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
      body: JSON.stringify({
        userId,
        newSrc
      })
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

// Retrieves the user's avatar

// async function retrieveAvatar() {
//   try {
//     const response = await fetch('/get-avatar');
//     const data = await response.json();
//     const avatarSrc = data.avatarSrc;
//     const trimmedSrc = new URL(avatarSrc, '../').pathname;
//     profile.src = trimmedSrc;
//   } catch (error) {
//     console.error(error);
//   }
// }

// Initialize the avatar retrieval