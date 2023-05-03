// Retrieve the userData from the data attribute of the script tag
const sessionId = JSON.parse(document.currentScript.getAttribute('data-sessionId'));

// Store the userData in localStorage
localStorage.setItem('sessionId', JSON.stringify({
  sessionId: sessionId.toString()
  // Add any other properties you want to store
}));