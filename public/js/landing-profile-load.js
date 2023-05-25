



// Retrieves the user's avatar
async function retrieveAvatar(element) {
  try {
    const response = await fetch('/get-avatar');
    const data = await response.json();
    const avatarSrc = data.avatarSrc;
    const trimmedSrc = avatarSrc.replace(/https?:\/\/[^\/]+/, '../');
    element.src = trimmedSrc;
  } catch (error) {
    console.log(error);
  }
}

// Initialize the avatar retrieval
window.addEventListener('DOMContentLoaded',function(){
const profile = document.getElementById("profile-user-avatar");
  
  retrieveAvatar(profile)
})
