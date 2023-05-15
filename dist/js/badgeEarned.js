const modalImage = document.querySelector('.badge-modal-image');
const modalContainer = document.querySelector('.badge-modal-container');
function playPulseAnimation() {
  modalContainer.style.display = "flex";
  modalContainer.style.zIndex = "1000";
  modalImage.classList.add('pulse');
}
function stopPulseAnimation() {
  modalImage.classList.remove('pulse');
  modalContainer.style.display = "none";
  modalContainer.style.zIndex = "0";
}

// Example usage:

export async function animateBadge() {
  playPulseAnimation();

  // Wait for animation to finish and fade out the image
  setTimeout(() => {
    stopPulseAnimation();
    modalImage.style.opacity = 0;
  }, 2000);
}