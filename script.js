// const container = document.getElementById("grid");

// const cards = [
//   { name: "giyu", img: "./assests/Giyu Tomioka - Demon Slayer ✿.jpg" },
//   { name: "zenitsu", img: "./assests/zenitsu-agatsuma-5120x2880-22696 (1).png" },
//   { name: "Obanie", img: "./assests/Obanai.jpeg" },
//   { name: "yourichii", img: "./assests/yoriichi.webp" },
//   { name: "shinobu", img: "./assests/shinobo.jpg" },
//   { name: "muichiro", img: "./assests/muichiro.jpg" },
//   { name: "giyu", img: "./assests/Giyu Tomioka - Demon Slayer ✿.jpg" },
//   { name: "zenitsu", img: "./assests/zenitsu-agatsuma-5120x2880-22696 (1).png" },
//   { name: "Obanie", img: "./assests/Obanai.jpeg" },
//   { name: "yourichii", img: "./assests/yoriichi.webp" },
//   { name: "shinobu", img: "./assests/shinobo.jpg" },
//   { name: "muichiro", img: "./assests/muichiro.jpg" }
// ];

// GenerateBoard();

// function GenerateBoard() {
//   for (let i = 0; i < cards.length; i++) {
//     const image = document.createElement("img");
//     image.setAttribute("src", "./assests/logo.jpg");
//     container.appendChild(image);
//   }
// }
// Select all the memory card elements
const cards = document.querySelectorAll(".memory-card");

// Select the reset button
const resetBtn = document.getElementById("btn");

// Game state variables
let hasFlipped = false;   // Tracks if the first card has been flipped
let first, second;        // References to the first and second flipped cards
let lockboard = false;    // Prevents flipping more than 2 cards at once

// Function to handle card flip
function flipcard() {
  if (lockboard) return;        // Block action if board is locked (waiting for unmatched cards to flip back)
  if (this === first) return;   // Prevent double-clicking the same card

  this.classList.add("flip");   // Add the flip class to show the front of the card

  // First card flipped
  if (!hasFlipped) {
    hasFlipped = true;
    first = this;
    return;
  }

  // Second card flipped
  hasFlipped = false;
  second = this;

  // Check if the two flipped cards match
  if (first.dataset.name === second.dataset.name) {
    match();
  } else {
    notmatch();
  }
}

// Function when cards match
function match() {
  // Remove click event so matched cards stay flipped
  first.removeEventListener("click", flipcard);
  second.removeEventListener("click", flipcard);
  resetBoard(); // Reset state for next turn
}

// Function when cards do not match
function notmatch() {
  lockboard = true; // Lock the board until cards flip back

  setTimeout(() => {
    // Flip both cards back after 1 second
    first.classList.remove("flip");
    second.classList.remove("flip");
    resetBoard(); // Reset state for next turn
  }, 1000);
}

// Reset the board state after each turn
function resetBoard() {
  [hasFlipped, lockboard] = [false, false];
  [first, second] = [null, null];
}

// Immediately Invoked Function Expression (IIFE) to shuffle cards at game start
(function shuffle() {
  cards.forEach(card => {
    const rand = Math.floor(Math.random() * 12); // Random order between 0–11
    card.style.order = rand; // Apply random order for CSS flex/grid
  });
})();

// Reset button reloads the page (restarts the game)
resetBtn.addEventListener("click", () => {
  location.reload();
});

// Add click event listener to each card
cards.forEach(card => card.addEventListener("click", flipcard));