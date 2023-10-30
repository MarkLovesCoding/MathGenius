// Get references to the necessary elements
const modalImage = document.querySelector('.badge-modal-image');
const modalContainer = document.querySelector('.badge-modal-container');

// Function to play the pulse animation
function playPulseAnimation() {
  modalContainer.style.display = "flex";
  modalContainer.style.zIndex = "1000";
  modalImage.classList.add('pulse');
}

// Function to stop the pulse animation
function stopPulseAnimation() {
  modalImage.classList.remove('pulse');
  modalContainer.style.display = "none";
  modalContainer.style.zIndex = "0";
}

// Example usage: animateBadge function
export async function animateBadge() {
  playPulseAnimation();

  // Wait for animation to finish and fade out the image
  setTimeout(() => {
    stopPulseAnimation();
    modalImage.style.opacity = 0;
  }, 2000);
}