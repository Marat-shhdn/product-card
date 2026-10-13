const fetchAllBtn = document.getElementById("fetch-all-btn");
const clearAllBtn = document.getElementById("clear-all-btn");
const cardAddInput = document.getElementById("card-add-input");
const cardAddBtn = document.getElementById("card-add-btn");
const cardDeleteInput = document.getElementById("card-delete-input");
const cardDeleteBtn = document.getElementById("card-delete-btn");
const classCardsContainerMessage = document.querySelector(
  ".cards-container__message",
);
const container = document.getElementById("users-list");

// Задержка для имитации работы с сервером
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Функция для загрузки данных в локольное хранилище
async function loadUsers() {
  await delay(1000);

  try {
    // Получаем строковые данные из localStorage
    const rawData = localStorage.getItem("users");

    // Проверяем, есть ли вообще данные в хранилище
    if (rawData) {
      console.log("rawData", rawData);
      // возвращаем объект пользователей
      return JSON.parse(rawData);
    }

    // Если нет данных в хранилище получаем данные из JSON-файла
    const response = await fetch("./user.json");

    // проверяем JSON объектт на отсутсвие ошибок
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    // Преобразуем JSON в массив объектов JavaScript
    const users = await response.json();

    // если данные корректны, то сохраняем их в хранилище и возращаем
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
      return users;
    }
  } catch (error) {
    console.error("Произошла ошибка при работе с данными:", error);
    return [];
  }
}
// ищем строку активных пользователей на странице

// функция для отрисовки
function renderUsers(users) {
  // ПРОВЕРКА ВНУТРИ ФУНКЦИИ:
  // Если users не передали (undefined) или передали не массив,
  // функция сама берёт актуальные данные из localStorage или глобальный массив
  if (!Array.isArray(users)) {
    const rawActiveData = localStorage.getItem("activUsers");
    users = rawActiveData ? JSON.parse(rawActiveData) : [];
  }

  // обнуляем контейнер перед добавлнеим элементов
  container.innerHTML = "";

  // проверяем не пустой ли массив
  if (users.length === 0) {
    container.textContent =
      "Проблемы с сервером или нет активных пользователей";
    return; // Останавливаем функцию, чтобы код ниже не выполнялся
  }
  users
    .sort((a, b) => a.id - b.id)
    .forEach((user) => {
      const li = document.createElement("li");
      li.className = "card-container__user";

      // 2. Описываем данные карточки (название поля и значение)
      const fields = [
        { label: "Номер", value: user.id },
        { label: "Имя", value: user.name },
        { label: "Фамилия", value: user.surname },
        { label: "Почта", value: user.email },
        { label: "Возраст", value: user.age },
      ];

      // 3. Циклом создаем параграфы <p> для каждого поля
      fields.forEach((field) => {
        const p = document.createElement("p");

        p.textContent = `${field.label}: ${field.value}`;

        // Складываем параграф внутрь <li>
        li.appendChild(p);
      });
      // складываем все li внутрь списка
      container.appendChild(li);
    });

  // сохраняем только тех пользователей, которые сейчас отрисовались
  localStorage.setItem("activUsers", JSON.stringify(users));
}

// функция для добавления карточки на строницу
function addCard(number) {
  // Получаем строковые данные из localStorage
  const rawData = localStorage.getItem("users");
  const users = rawData ? JSON.parse(rawData) : [];
  let rawCurrentCardData = localStorage.getItem("activUsers");
  let activUsers = rawCurrentCardData ? JSON.parse(rawCurrentCardData) : [];

  // Принудительно переводим значение из инпута в число
  const idToAdd = Number(number);

  if (!activUsers.length) {
    alert(`Загрузите данные`);
    return activUsers;
  }

  if (idToAdd < 1 || idToAdd > users.length) {
    cardAddInput.value = "";
    alert(`введите номер от 1 до ${users.length}`);
    return activUsers;
  }

  // Проверяем, нет ли уже этой карточки среди АКТИВНЫХ
  if (activUsers.some((item) => item.id === idToAdd)) {
    alert(`Карточка номер ${idToAdd} уже добавлена`);
    return activUsers;
  }

  // Ищем пользователя в общем списке всех загруженных пользователей (allUsers)
  const foundUser = users.find((item) => item.id === idToAdd);
  activUsers.push(foundUser);

  // Перезаписываем обновленный массив в localStorage, чтобы изменения сохранились
  localStorage.setItem("activUsers", JSON.stringify(activUsers));

  return activUsers;
}

// функция удаления всех карточек
function deleteAllCards() {
  container.innerHTML = "";
  localStorage.clear();
  container.textContent = "Загрузка данных...";
}

function deleteCard(number) {
  const rawData = localStorage.getItem("users");
  const users = rawData ? JSON.parse(rawData) : [];
  let rawCurrentCardData = localStorage.getItem("activUsers");
  let activUsers = rawCurrentCardData ? JSON.parse(rawCurrentCardData) : [];

  // Принудительно переводим значение из инпута в число
  const idToDelete = Number(number);

  cardDeleteInput.value = "";

  if (!activUsers.length) {
    alert(`Загрузите данные`);
    return activUsers;
  }

  if (idToDelete < 1 || idToDelete > users.length) {
    alert(`введите номер от 1 до ${users.length}`);
    return activUsers;
  }

  // проверяем есть ли активна ли карточка в данный момент
  if (!activUsers.some((item) => item.id === idToDelete)) {
    alert(`Карточка номер ${idToDelete} уже отсутствует`);
  } else {
    activUsers = activUsers.filter((item) => item.id !== idToDelete);
  }

  // Перезаписываем обновленный массив в localStorage, чтобы изменения сохранились
  localStorage.setItem("activUsers", JSON.stringify(activUsers));

  return activUsers;
}

// востановление карточек на странице при перезагрузки и выключение
renderUsers();

// получение всех карточек из JSON или из хранилища при нажатие кнопки получить все
fetchAllBtn.addEventListener("click", async () => {
  const loadedUsers = await loadUsers();
  renderUsers(loadedUsers);
});

// добавление одной карточки
cardAddBtn.addEventListener("click", () => {
  let cardAddInputValue = cardAddInput.value;
  const users = addCard(cardAddInputValue);
  renderUsers(users);
});

// удаления всех карточек со страници и из хранилища
clearAllBtn.addEventListener("click", deleteAllCards);

// удаление определенной карточки по номеру карточки со страницы и хранилища
cardDeleteBtn.addEventListener("click", () => {
  let cardDeleteInputValue = cardDeleteInput.value;
  const users = deleteCard(cardDeleteInputValue);

  renderUsers(users);
});
