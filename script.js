const imageContainer = document.querySelector('#image-container');
const resetButton = document.querySelector('#reset');
const verifyButton = document.querySelector('#verify');
const message = document.querySelector('#para');
const heading = document.querySelector('#h');

let images = [];
let selectedImages = [];
let correctPair = null;

// Function to shuffle images and randomly duplicate one
function generateImages() {
  const uniqueImages = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg'
  ];
  const duplicateImage = uniqueImages[Math.floor(Math.random() * uniqueImages.length)];
  
  images = [...uniqueImages, duplicateImage];
  images.sort(() => Math.random() - 0.5);
}

// Function to render images
function renderImages() {
  imageContainer.innerHTML = '';
  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Tile ${index + 1}`;
    img.dataset.index = index;
    imageContainer.appendChild(img);
  });
}

// Handle image click
imageContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const clickedImage = e.target;

    if (selectedImages.length < 2 && !clickedImage.classList.contains('selected')) {
      clickedImage.classList.add('selected');
      selectedImages.push(clickedImage);

      if (selectedImages.length === 1) {
        resetButton.style.display = 'block'; // Show Reset button after the first click
      } else if (selectedImages.length === 2) {
        verifyButton.style.display = 'block'; // Show Verify button after two clicks
      }
    }
  }
});

// Handle Reset button click
resetButton.addEventListener('click', () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  message.textContent = '';
});

// Handle Verify button click
verifyButton.addEventListener('click', () => {
  if (selectedImages[0].src === selectedImages[1].src) {
    message.textContent = 'You are a human. Congratulations!';
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyButton.style.display = 'none'; // Hide Verify button after verifying
});

// Initialize the application
function init() {
  generateImages();
  renderImages();
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  message.textContent = '';
}

init();
