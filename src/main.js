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
const trialsSelector = document.querySelector(".trials");
const soundBtn = document.querySelector(".soundBtn");
const randomArray = getRandom50NumbersArray();
let previousCard;
let previousCardColor;
let nextCard;
let nextCardColor;
let soundPermission = true;
let seconds = 0;
let secondsDisplay = 0;
let minutes = 0;
let hours = 0;
let trials = 0;
let trialsNumber = 0;

setInterval(timer, 1000);
showAllCardsColors(5000);

cards.forEach((card, index) => {
  card.addEventListener("click", () => play(card, index));
});

soundBtn.addEventListener("click", () => {
  const soundBtnIcon = document.querySelector(".soundBtn i");
  if (soundPermission) {
    soundPermission = false;
    soundBtnIcon.classList.remove("icon-volume-up");
    soundBtnIcon.classList.add("icon-volume-off");
  } else {
    soundPermission = true;
    soundBtnIcon.classList.remove("icon-volume-off");
    soundBtnIcon.classList.add("icon-volume-up");
  }
});

tipBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    showAllCardsColors(3000);
    e.target.classList.add("disable");
  });
});

function play(card, i) {
  switch (trials) {
    case 0:
      showCardColor(card, i);
      previousCard = card;
      previousCardColor = card.style.backgroundColor;
      trials++;
      break;
    case 1:
      showCardColor(card, i);
      nextCard = card;
      if (nextCard === previousCard) return;
      nextCardColor = card.style.backgroundColor;
      console.log(`1 color: ${previousCardColor}\n2 color: ${nextCardColor}`);
      console.log(
        `Czy to te same kolory?: ${previousCardColor === nextCardColor}`
      );
      if (previousCardColor === nextCardColor) {
        hideOrDeleteCard("delete");
      } else {
        hideOrDeleteCard("hide");
      }
      trials = 0;
      trialsNumber++;
      trialsSelector.textContent = trialsNumber;
      break;
  }

  function hideOrDeleteCard(operation) {
    cards.forEach((card) => {
      card.style.pointerEvents = "none";
    });
    setTimeout(() => {
      previousCard.style.backgroundColor = "";
      nextCard.style.backgroundColor = "";
      previousCard.classList.add(operation);
      nextCard.classList.add(operation);
      cards.forEach((card) => {
        card.style.pointerEvents = "";
      });
    }, 1000);
  }

  function showCardColor(card, index) {
    card.style.backgroundColor = cardsColor[randomArray[index]];
    card.classList.remove("hide");
  }
}

function showAllCardsColors(time) {
  cards.forEach((card, index) => {
    if (!card.classList.contains("delete")) {
      card.style.backgroundColor = cardsColor[randomArray[index]];
      card.classList.remove("hide");
    }
  });

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("hide");
      card.style.backgroundColor = "";
    });
  }, time);
}

function timer() {
  if (secondsDisplay >= 59) {
    secondsDisplay = 0;
    minutes++;
  } else {
    secondsDisplay++;
  }
  if (minutes >= 59) {
    minutes = 0;
    hours++;
  }
  time.textContent = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${secondsDisplay < 10 ? "0" + secondsDisplay : secondsDisplay}`;

  seconds++;
}

function getRandom50NumbersArray() {
  const array = [];
  while (array.length < 50) {
    const randomNumber = Math.floor(Math.random() * 50);
    let flag = true;
    for (let j = 0; j < 50; j++) {
      if (randomNumber === array[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      array.push(randomNumber);
    }
  }
  return array;
}
