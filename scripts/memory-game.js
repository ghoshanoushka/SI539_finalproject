document.addEventListener('DOMContentLoaded', () => {

    // Card array: Define cards with their names and image paths
    const cardArray = [
        { name: "bellatrix", img: "assets/memory_game/bellatrix.png" },
        { name: "bellatrix", img: "assets/memory_game/bellatrix.png" },
        { name: "dobby", img: "assets/memory_game/dobby.png" },
        { name: "dobby", img: "assets/memory_game/dobby.png" },
        { name: "snape", img: "assets/memory_game/snape.png" },
        { name: "snape", img: "assets/memory_game/snape.png" },
        { name: "voldemort", img: "assets/memory_game/voldemort.png" },
        { name: "voldemort", img: "assets/memory_game/voldemort.png" },
        { name: "harry", img: "assets/memory_game/harry.png" },
        { name: "harry", img: "assets/memory_game/harry.png" },
        { name: "hermione", img: "assets/memory_game/hermione.png" },
        { name: "hermione", img: "assets/memory_game/hermione.png" },
        { name: "ron", img: "assets/memory_game/ron.png" },
        { name: "ron", img: "assets/memory_game/ron.png" },
        { name: "dumbledore", img: "assets/memory_game/dumbledore.png" },
        { name: "dumbledore", img: "assets/memory_game/dumbledore.png" },
        { name: "mcgonagall", img: "assets/memory_game/mcgonagall.png" },
        { name: "mcgonagall", img: "assets/memory_game/mcgonagall.png" },
        { name: "sorting hat", img: "assets/memory_game/sorting_hat.png" },
        { name: "sorting hat", img: "assets/memory_game/sorting_hat.png" },
        { name: "malfoy", img: "assets/memory_game/malfoy.png" },
        { name: "malfoy", img: "assets/memory_game/malfoy.png" },
        { name: "hagrid", img: "assets/memory_game/hagrid.png" },
        { name: "hagrid", img: "assets/memory_game/hagrid.png" },
        { name: "umbridge", img: "assets/memory_game/umbridge.jpg" },
        { name: "umbridge", img: "assets/memory_game/umbridge.jpg" },
        { name: "sirius", img: "assets/memory_game/sirius.jpg" },
        { name: "sirius", img: "assets/memory_game/sirius.jpg" }

    ];

    // Shuffle the cards randomly
    cardArray.sort(() => 0.5 - Math.random());

    // DOM elements
    const grid = document.querySelector('.memory-board');
    const resultDisplay = document.querySelector('#result');

    const gridComputedStyle = window.getComputedStyle(grid);
    const columns = gridComputedStyle.getPropertyValue('grid-template-columns').split(" ").length //? parseInt(grid.getAttribute('data-columns')) : 4; // Get number of columns from memory-board

    // Game state variables
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];
    let disableClick = false; // To prevent further clicks during match check

    // Create the game board
    function createBoard() {
        cardArray.forEach((card, index) => {
            const cardElement = document.createElement('img');
            cardElement.setAttribute('src', 'assets/memory_game/blank.jpg'); // Back of the card
            cardElement.setAttribute('data-id', index); // Unique card ID
            cardElement.setAttribute('alt', `Card ${index + 1}`); // Accessible alt text
            cardElement.setAttribute('tabindex', '0'); // Make the image focusable by keyboard
            cardElement.addEventListener('click', flipCard); // Add click functionality
            cardElement.addEventListener('keydown', (e) => {
                if (e.key === ' ') {
                    flipCard.call(cardElement); // Call flipCard function on Space key press
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    const currentIndex = Array.prototype.indexOf.call(grid.children, cardElement);
                    let newIndex = currentIndex;
                    
                    if (e.key === 'ArrowUp') {
                        newIndex -= columns;
                    } else if (e.key === 'ArrowDown') {
                        newIndex += columns;
                    } else if (e.key === 'ArrowLeft') {
                        newIndex -= 1;
                    } else if (e.key === 'ArrowRight') {
                        newIndex += 1;
                    }
                    if (newIndex >= 0 && newIndex < cardArray.length) {
                        grid.children[newIndex].focus();
                    }
                }
            });
            grid.appendChild(cardElement);
        });
    }

    // Flip a card
    function flipCard() {
        if (disableClick) return; // Ignore clicks during match check

        const cardId = this.getAttribute('data-id'); // Get clicked card ID
        if (cardsChosenIds.includes(cardId) || cardsChosen.length === 2) return; // Prevent clicking the same card twice or flipping more than 2

        cardsChosen.push(cardArray[cardId].name);
        cardsChosenIds.push(cardId);
        this.setAttribute('src', cardArray[cardId].img); // Flip the card to show the front

        if (cardsChosen.length === 2) {
            disableClick = true; // Temporarily disable clicks while checking
            setTimeout(checkForMatch, 500); // Check for match after 500 milliseconds
        }
    }

    // Check for a match
    function checkForMatch() {
        const cards = document.querySelectorAll('.memory-board img'); // Select all card elements
        const [optionOneId, optionTwoId] = cardsChosenIds;

        if (cardsChosen[0] === cardsChosen[1]) {
            // Cards match
            cards[optionOneId].setAttribute('src', 'assets/memory_game/match.jpg'); // Match placeholder
            cards[optionTwoId].setAttribute('src', 'assets/memory_game/match.jpg');
            cards[optionOneId].removeEventListener('click', flipCard); // Disable further clicks
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen[0]); // Add to matched cards
        } else {
            // Cards do not match
            cards[optionOneId].setAttribute('src', 'assets/memory_game/blank.jpg');
            cards[optionTwoId].setAttribute('src', 'assets/memory_game/blank.jpg');
        }

        // Reset chosen cards
        cardsChosen = [];
        cardsChosenIds = [];
        disableClick = false; // Re-enable clicks

        // Update score
        resultDisplay.textContent = cardsWon.length;

        // Check if all cards are matched
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = "Congratulations! You found them all.";
        }
    }

    // Initialize the game
    createBoard();
});