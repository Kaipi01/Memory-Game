const cardsColor = [
  "red",
  "red",
  "blue",
  "blue",
  "green",
  "green",
  "yellow",
  "yellow",
  "pink",
  "pink",
  "grey",
  "grey",
  "black",
  "black",
  "white",
  "white",
  "purple",
  "purple",
  "indigo",
  "indigo",
  "orange",
  "orange",
  "brown",
  "brown",
  "lightskyblue",
  "lightskyblue",
  "mediumseagreen",
  "mediumseagreen",
  "navy",
  "navy",
  "palegoldenrod",
  "palegoldenrod",
  "teal",
  "teal",
  "blueviolet",
  "blueviolet",
  "coral",
  "coral",
  "darkred",
  "darkred",
  "deeppink",
  "deeppink",
  "lime",
  "lime",
  "peru",
  "peru",
  "sienna",
  "sienna",
  "silver",
  "silver",
];

const cards = document.querySelectorAll(".card");
const tipBtns = document.querySelectorAll(".tip");
const time = document.querySelector(".time");
let seconds = 0;
let trials = 0;

setInterval(timer, 1000);

cards.forEach((card, index) => {
  card.addEventListener("click", () => play(card, index));
});

tipBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    showAllCardsColors();
    e.target.classList.add("disable");
  });
});

function play(card, i) {
  if (trials < 2) {
    showCardColor(card, i);
    trials++;
  } else {
    return;
    trials = 0;
  }
  //trials > 2 ? (trials = 0) : trials++;
}

function showAllCardsColors() {
  cards.forEach((card, index) => {
    card.style.backgroundColor = cardsColor[index];
    card.classList.remove("hide");
  });

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("hide");
      card.style.backgroundColor = "";
    });
  }, 2000);
}

function showCardColor(card, index) {
  card.style.backgroundColor = cardsColor[index];
  card.classList.remove("hide");
}

function timer() {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  time.textContent = `Time: ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  seconds === 60 ? (seconds = 0) : seconds++;
}
