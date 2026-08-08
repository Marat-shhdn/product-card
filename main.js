// 1. Покраска первой карточки в один цвет
const productFirstCard = document.querySelector(".products__item.card");
const changeColorFirstCardBtn = document.querySelector(
  "#change-color-first-card-btn",
);
const myColor = "#acbd4f";

changeColorFirstCardBtn.addEventListener("click", () => {
  console.log("Кнопка смены цвета первой карточки была нажата");
  productFirstCard.style.backgroundColor = myColor;
});

// 2. Покраска всех карточек в один цвет
const productALLCards = document.querySelectorAll(".products__item.card");
const changeColorAllCardsBtn = document.querySelector(
  "#change-color-all-cards-btn",
);
const myAllColor = "#bd724f";
changeColorAllCardsBtn.addEventListener("click", () => {
  console.log("Кнопка смены цвета всех карточек была нажата");
  productALLCards.forEach((card) => {
    card.style.backgroundColor = myAllColor;
  });
});

// 3. Перейти на Google
const goGoogleBtn = document.querySelector("#go-google-btn");

goGoogleBtn.addEventListener("click", goToGoogle);
function goToGoogle() {
  const question = confirm("Вы уверены, что хотите перейти на сайт Google?");
  if (question === true) {
    window.open("https://www.google.com");
  }
}

// 4. Вывод в консоль информации о карточках
const outputConsoleLogBtn = document.querySelector("#msg-console-Log-btn");
outputConsoleLogBtn.addEventListener("click", () => {
  outputConsoleLog("Информация о карточках");
});
function outputConsoleLog(message) {
  console.log(message);
  alert(message);
}

// 5. Вывод текста заголовка "Выбери свой продукт" в консоль при наведении на него курсора мыши
const catalogTitle = document.querySelector(".catalog__title.title");
catalogTitle.addEventListener("mouseenter", () => {
  console.log(catalogTitle.textContent);
});

// 6. Кнопка, при нажатии на которую поменятся её цвет.
const changeColor = document.querySelector("#change-color-btn");
const changeClass = document.querySelector("#change-color-btn.first-color");
changeColor.addEventListener("click", () => {
  changeClass.classList.toggle("first-color");
});
