
// // Retrieves the user's avatar

 async function retrieveLandingAvatar(element:HTMLImageElement):Promise<void> {
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

// Initialize the avatar retrieval
window.addEventListener('DOMContentLoaded', function () {
  const profile = document.getElementById("profile-user-avatar") as HTMLImageElement

  retrieveLandingAvatar(profile)
})
