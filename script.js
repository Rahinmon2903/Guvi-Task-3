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
const cards = document.querySelectorAll(".memory-card");
const resetBtn = document.getElementById("btn");
let hasFlipped = false;
let first, second;
let lockboard = false;

function flipcard() {
  if (lockboard) return;
  if (this === first) return;

  this.classList.add("flip"); 

 
  if (!hasFlipped) {
    hasFlipped = true;
    first = this;
    return;
  }

  hasFlipped = false;
    second = this;

 
  if (first.dataset.name === second.dataset.name) {
    match();
  } else {
    notmatch();
  }
}

function match() {
  first.removeEventListener("click", flipcard);
  second.removeEventListener("click", flipcard);
  resetBoard();
}

function notmatch() {
  lockboard = true;
  setTimeout(() => {
    first.classList.remove("flip");
    second.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlipped, lockboard] = [false, false];
  [first, second] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    const rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();


resetBtn.addEventListener("click", () => {
  location.reload();
});


cards.forEach(card => card.addEventListener("click", flipcard));