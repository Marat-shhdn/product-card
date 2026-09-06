const emailFormFooter = document.querySelector(".footer__form");
const openRegistration = document.getElementById("registration-btn");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-btn");
const password = document.getElementById("password");
const checkPassword = document.getElementById("checkPassword");
const modalForm = document.querySelector(".modal__form");

// форма отправки почты для рассылки рекламных акций
emailFormFooter.addEventListener("submit", (event) => {
  const form = event.target;
  const formData = new FormData(form);
  event.preventDefault();
  const data = Object.fromEntries(formData.entries());
  console.log(data);
});

// вызов модального окна принажатие кнопки Регистрация
openRegistration.addEventListener("click", () => {
  modal.classList.add("showed");
});

// Закрытие модального окна при нажатие нна крестик
closeModal.addEventListener("click", () => {
  modal.classList.remove("showed");
});

// Получение объекта со значениями полей формы для регистрации, с проверкой совпадения паролей
modalForm.addEventListener("submit", (event) => {
  // Проверяем совпадение паролей
  if (password.value !== checkPassword.value) {
    event.preventDefault(); // Блокируем отправку формы
    alert("Пароли не совпадают! Пожалуйста, проверьте ввод.");
    // Подсвечиваем поле повтора пароля красным цветом
    checkPassword.style.borderColor = "red";
    return;
  } else {
    checkPassword.addEventListener("input", () => {
      checkPassword.style.borderColor = "";
    });
    //без строки ниже браузер перезагружает страницу и объект исчезает из памяти,
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    modal.classList.remove("showed");
    console.log(data);
  }
});
