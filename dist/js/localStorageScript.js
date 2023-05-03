// Retrieve the userData from the data attribute of the script tag
const sessionId = JSON.parse(document.currentScript.getAttribute('data-sessionId'));
const userData = JSON.parse(document.currentScript.getAttribute('data-userData'));

// Store the userData in localStorage
localStorage.setItem('sessionId', JSON.stringify(sessionId
// Add any other properties you want to store
));

localStorage.setItem('userData', JSON.stringify({
  userData: userData
}
// Add any other properties you want to store
));