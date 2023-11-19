
// Get references to the necessary elements
const modal = <HTMLElement>document.getElementById("avatar-modal")
const profile = <HTMLImageElement>document.getElementById("profile-user-avatar")
const span = <HTMLElement>document.getElementById("avatar-modal-close") 
const userIconsContainer = <HTMLElement>document.getElementById("avatar-user-icons") 

// Open the modal when the profile avatar is clicked
profile.onclick = function () {
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
};

// Close the modal when the close button is clicked
span.onclick = function () {
  modal.style.display = "none";
};

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Function to retrieve the user's avatar from the server
// async function retrieveAvatar(element:HTMLImageElement):Promise<void> {
//   try {
//     const response = await fetch('/get-avatar');
//     const data = await response.json();
//     const avatarSrc:String = data.avatarSrc;
//     const trimmedSrc:string = avatarSrc.replace(/https?:\/\/[^\/]+/, '../');
//     element.src = trimmedSrc;
//   } catch (error) {
//     console.error(error);
//   }
// }

// Retrieve the user's avatar when the DOM content is loaded
window.addEventListener('DOMContentLoaded', function () {
  retrieveProfileAvatar(profile);
});

// Handle user icon clicks using event delegation
userIconsContainer.addEventListener("click", handleUserIconClick);

// Function to handle user icon clicks
async function handleUserIconClick(event:MouseEvent):Promise<void> {
  const selectedIcon = (event.target as HTMLElement).closest("img") as HTMLImageElement | null;
  if (selectedIcon) {
    // Update the profile avatar with the selected icon
    profile.setAttribute("src", selectedIcon.src);

    // Update the session and database with the new image source
    await updateSessionAndDB(selectedIcon.src);

    // Close the modal after selecting an icon
    modal.style.display = "none";
  }
  else{ throw new Error('Icons not found');}
}

// Retrieve the user ID from the server
async function getUserId():Promise<number>{
  try {
    const response = await fetch('/user-id');
    const data = await response.json();
    const userId = data.userId;
    // Do something with the user ID if needed
    return userId;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
 async function retrieveProfileAvatar(element:HTMLImageElement):Promise<void> {
  try {
    const response = await fetch('/get-avatar');
    const data = await response.json();
    const avatarSrc:String = data.avatarSrc;
    const trimmedSrc:string = avatarSrc.replace(/https?:\/\/[^\/]+/, '../');
    element.src = trimmedSrc;
  } catch (error) {
    console.error(error);
  }
}
// Update the session and database with the new image source
async function updateSessionAndDB(newSrc:string):Promise<void> {
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
