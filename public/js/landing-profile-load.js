

const profile = document.getElementById("profile-user-avatar");


// Retrieves the user's avatar
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

// Initialize the avatar retrieval
retrieveAvatar();
