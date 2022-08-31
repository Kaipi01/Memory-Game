if (window.location.pathname === "/src/index.html") {
  const startBtn = document.querySelector(".start");
  const userNameInput = document.querySelector("#userName");
  userNameInput.addEventListener("input", () => {
    userName = userNameInput.value;
    localStorage.setItem("userName", userName);
  });
  startBtn.addEventListener("click", () => {
    window.location.replace("/src/pages/game.html");
  });
} else if (window.location.pathname === "/src/pages/game.html") {
  startGame();
} else {
  showResults();
}

function startGame() {
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

  const tipSound = new Audio("/src/sounds/freetip.wav");
  const badSound = new Audio("/src/sounds/bad.wav");
  const goodSound = new Audio("/src/sounds/good.wav");
  const winSound = new Audio("/src/sounds/win.wav");
  const cards = document.querySelectorAll(".card");
  const trialsSelector = document.querySelector(".trials");
  const tipBtns = document.querySelectorAll(".tip");
  const timeSelector = document.querySelector(".time");
  const soundBtn = document.querySelector(".soundBtn");
  const randomArray = getRandom50NumbersArray();

  let previousCard;
  let previousCardColor;
  let nextCard;
  let nextCardColor;
  let soundPermission = true;
  let secondsDisplay = 0;
  let minutes = 0;
  let hours = 0;
  let time;
  let trialsNumber = 0;
  let seconds = 0;
  let trials = 0;
  let cardsInGame = 25;

  const interval = setInterval(timer, 1000);
  showAllCardsColors(5000);

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      play(card, index);
    });
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
      if (btn.classList.contains("disable")) return;
      if (soundPermission) tipSound.cloneNode().play();
      showAllCardsColors(3000);
      //e.target.classList.add("disable");
      e.target.setAttribute("tabindex", "-1");
    });
  });

  function play(card, i) {
    if (card.hasAttribute("block")) return;
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
        if (previousCardColor === nextCardColor) {
          hideOrDeleteCard("delete");
          if (soundPermission) goodSound.cloneNode().play();
          cardsInGame--;
        } else {
          hideOrDeleteCard("hide");
          if (soundPermission) badSound.cloneNode().play();
        }
        trials = 0;
        trialsNumber++;
        trialsSelector.textContent = trialsNumber;
        break;
    }

    if (cardsInGame === 0) {
      winSound.play();
      clearInterval(interval);
      localStorage.setItem("time", time);
      localStorage.setItem("seconds", seconds);
      localStorage.setItem("trialsNumber", trialsNumber);
      document.querySelector(".main").innerHTML += `
          <h2 class="winTitle">You Win!</h2>
        `;
      setTimeout(() => {
        window.location.replace("/src/pages/endgame.html");
      }, 3000);
    }

    function hideOrDeleteCard(operation) {
      cards.forEach((card) => {
        card.setAttribute("block", "block");
      });
      setTimeout(() => {
        previousCard.style.backgroundColor = "";
        nextCard.style.backgroundColor = "";
        previousCard.classList.add(operation);
        nextCard.classList.add(operation);
        if (operation === "delete") {
          previousCard.setAttribute("tabindex", "-1");
          nextCard.setAttribute("tabindex", "-1");
        }
        cards.forEach((card) => {
          card.removeAttribute("block", "block");
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
        card.setAttribute("block", "block");
        card.style.backgroundColor = cardsColor[randomArray[index]];
        card.classList.remove("hide");
      }
    });

    setTimeout(() => {
      cards.forEach((card) => {
        if (!card.classList.contains("delete")) {
          card.classList.add("hide");
          card.style.backgroundColor = "";
          card.removeAttribute("block", "block");
        }
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
    timeSelector.textContent = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${secondsDisplay < 10 ? "0" + secondsDisplay : secondsDisplay}`;
    time = timeSelector.textContent;

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
}

function showResults() {
  let userName = localStorage.getItem("userName");
  let time = localStorage.getItem("time");
  let seconds = localStorage.getItem("seconds");
  let trialsNumber = localStorage.getItem("trialsNumber");
  const score = 999 - trialsNumber * 10 - Math.floor(seconds / 10);
  let userNameRecord = localStorage.getItem("userNameRecord");
  let timeRecord = localStorage.getItem("timeRecord");
  let secondsRecord = localStorage.getItem("secondsRecord");
  let trialsNumberRecord = localStorage.getItem("trialsNumberRecord");
  let scoreRecord = localStorage.getItem("scoreRecord");

  if (
    (!userNameRecord &&
      !timeRecord &&
      !secondsRecord &&
      !trialsNumberRecord &&
      !scoreRecord) ||
    score > scoreRecord
  ) {
    userNameRecord = userName;
    timeRecord = time;
    secondsRecord = seconds;
    trialsNumberRecord = trialsNumber;
    scoreRecord = score;
    localStorage.setItem("userNameRecord", userName);
    localStorage.setItem("timeRecord", time);
    localStorage.setItem("secondsRecord", seconds);
    localStorage.setItem("trialsNumberRecord", trialsNumber);
    localStorage.setItem("scoreRecord", score);
  }

  document.querySelector(".userNameResults").textContent = userName || "User";
  document.querySelector(".timeResults").textContent = time;
  document.querySelector(".trialsResults").textContent = trialsNumber;
  document.querySelector(".scoreResults").textContent = score;

  document.querySelector(".userNameRecord").textContent = userName || "User";
  document.querySelector(".timeRecord").textContent = time;
  document.querySelector(".trialsRecord").textContent = trialsNumber;
  document.querySelector(".scoreRecord").textContent = score;
}
