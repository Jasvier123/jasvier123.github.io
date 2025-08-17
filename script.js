document.addEventListener('DOMContentLoaded', () => {
    // Get references to all necessary DOM elements
    const loadingScreen = document.getElementById('loading-screen');
    const introScreen = document.getElementById('intro-screen');
    const mainMenu = document.getElementById('main-menu');
    const mainHeart = document.getElementById('main-heart');

    const readLetterButton = document.getElementById('read-letter-button');
    const letterModalOverlay = document.getElementById('letter-modal-overlay');
    const closeLetterButton = document.getElementById('close-letter-button');

    const showDrawingsButton = document.getElementById('show-drawings-button');
    const drawingsModalOverlay = document.getElementById('drawings-modal-overlay');
    const closeDrawingsButton = document.getElementById('close-drawings-button');

    // New elements for magnified view
    const magnifiedModalOverlay = document.getElementById('magnified-modal-overlay');
    const closeMagnifiedButton = document.getElementById('close-magnified-button');
    const magnifiedImage = document.getElementById('magnified-image');
    const magnifiedVideo = document.getElementById('magnified-video');
    const magnifiedVideoSource = magnifiedVideo.querySelector('source');

    /**
     * Handles the loading screen logic.
     * Fades out the loading screen after a delay and then displays the intro screen.
     */
    setTimeout(() => {
        loadingScreen.classList.add('hidden'); // Start fading out the loading screen
        setTimeout(() => {
            loadingScreen.remove(); // Remove loading screen from DOM after transition
            introScreen.classList.add('visible'); // Make the intro screen visible
        }, 1000); // Duration of the fade-out transition for loading screen
    }, 3000); // Display loading screen for 3 seconds

    /**
     * Handles the click event on the main heart.
     * Triggers small heart animations and transitions to the main menu.
     */
    mainHeart.addEventListener('click', () => {
        // Stop the pulse animation and apply a temporary scale transformation to the main heart
        mainHeart.style.animation = 'none';
        mainHeart.style.transform = 'scale(0.8)';
        setTimeout(() => {
            mainHeart.style.transform = 'scale(1)'; // Return to normal size
        }, 200);

        // Create and animate small hearts
        const numHearts = 20; // Number of small hearts to generate
        for (let i = 0; i < numHearts; i++) {
            const smallHeart = document.createElement('div');
            smallHeart.classList.add('small-heart');
            smallHeart.innerHTML = '❤️';
            document.body.appendChild(smallHeart);

            // Position small hearts randomly around the main heart's position
            const rect = mainHeart.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            smallHeart.style.left = `${startX + (Math.random() - 0.5) * 100}px`; // Random horizontal offset
            smallHeart.style.top = `${startY + (Math.random() - 0.5) * 100}px`;   // Random vertical offset

            // Remove the small heart from the DOM after its animation completes
            smallHeart.addEventListener('animationend', () => {
                smallHeart.remove();
            });
        }

        // Transition to the main menu after a short delay
        setTimeout(() => {
            introScreen.classList.remove('visible'); // Start fading out the intro screen
            introScreen.classList.add('hidden');
            setTimeout(() => {
                introScreen.remove(); // Remove intro screen from DOM after transition
                mainMenu.classList.add('visible'); // Make the main menu visible
            }, 1000); // Duration of the fade-out transition for intro screen
        }, 500); // Delay before starting the transition to allow hearts to animate
    });

    /**
     * Handles opening the letter modal.
     */
    readLetterButton.addEventListener('click', () => {
        letterModalOverlay.classList.add('show');
    });

    /**
     * Handles closing the letter modal.
     */
    closeLetterButton.addEventListener('click', () => {
        letterModalOverlay.classList.remove('show');
    });

    /**
     * Closes the letter modal if the click occurs on the overlay (outside the modal content).
     */
    letterModalOverlay.addEventListener('click', (e) => {
        if (e.target === letterModalOverlay) {
            letterModalOverlay.classList.remove('show');
        }
    });

    /**
     * Handles opening the drawings modal.
     */
    showDrawingsButton.addEventListener('click', () => {
        drawingsModalOverlay.classList.add('show');
    });

    /**
     * Handles closing the drawings modal.
     */
    closeDrawingsButton.addEventListener('click', () => {
        drawingsModalOverlay.classList.remove('show');
    });

    /**
     * Closes the drawings modal if the click occurs on the overlay (outside the modal content).
     */
    drawingsModalOverlay.addEventListener('click', (e) => {
        if (e.target === drawingsModalOverlay) {
            drawingsModalOverlay.classList.remove('show');
        }
    });

    // Handle clicks on drawing items to show magnified view
    document.querySelectorAll('.drawing-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent the click from propagating to the parent overlay
            e.stopPropagation();

            const dataType = item.dataset.type;
            const dataSrc = item.dataset.src;

            // Hide all content in the magnified modal first
            magnifiedImage.classList.add('hidden');
            magnifiedVideo.classList.add('hidden');
            magnifiedVideo.pause(); // Pause any currently playing video

            if (dataType === 'image') {
                magnifiedImage.src = dataSrc;
                magnifiedImage.classList.remove('hidden');
            } else if (dataType === 'video') {
                magnifiedVideoSource.src = dataSrc;
                magnifiedVideo.load(); // Reload the video with the new source
                magnifiedVideo.classList.remove('hidden');
                magnifiedVideo.play();
            }

            magnifiedModalOverlay.classList.add('show');
        });
    });

    /**
     * Handles closing the magnified modal.
     */
    closeMagnifiedButton.addEventListener('click', () => {
        magnifiedModalOverlay.classList.remove('show');
        magnifiedVideo.pause(); // Pause video when closing the modal
        magnifiedVideo.currentTime = 0; // Reset video to the beginning
    });

    /**
     * Closes the magnified modal if the click occurs on the overlay.
     */
    magnifiedModalOverlay.addEventListener('click', (e) => {
        if (e.target === magnifiedModalOverlay) {
            magnifiedModalOverlay.classList.remove('show');
            magnifiedVideo.pause(); // Pause video when closing the modal
            magnifiedVideo.currentTime = 0;
        }
    });
});
