// 3.Создать структуру на ваш выбор, как было показано в лекции (имеется ввиду - с машинами/бьюти-продуктами).
//Придумайте свою структуру и реализуйте наследуемость классов

import Form from "./Form.js";
import Modal from "./modal.js";
class Products {
  constructor(name, category, price) {
    this.name = name;
    this.category = category;
    this.price = price;
  }
  showProduct() {
    console.log(
      `Это товар называется ${this.name} он относится к категории ${this.category} его цена ${this.price}`,
    );
  }
}

class ProductsToys extends Products {
  constructor(name, category, price, forAge) {
    super(name, category, price);
    this.forAge = forAge;
  }
  showToy() {
    super.showProduct();
    console.log(`товар пригоден для детей до ${this.forAge} возроста`);
  }
}

const mousse = new Products("Мусс", "косметика", "2750");
mousse.showProduct();
const carToy = new ProductsToys("Модель УАЗ", "игрушка", "250", "5 лет");
carToy.showToy();

const emailForm = new Form("footer__form");
emailForm.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (emailForm.isvalid()) {
    const data = emailForm.getValueForm();
    console.log("Почта пользователя для рассылки рекламных акция", data);
    emailForm.reset();
  } else {
    alert("Ведите корректный почтовый адрес");
  }
});

const modalProducts = new Modal("modal");

if (modalProducts.openRegistration) {
  modalProducts.openRegistration.addEventListener("click", () => {
    if (!modalProducts.isOpen()) {
      modalProducts.open();
    }
  });
}

const modalForm = new Form("modal__form");
modalForm.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (modalForm.isvalid()) {
    const data = modalForm.getValueForm();
    console.log("Данные для регистрации пользователя", data);
    modalForm.reset();
    modalProducts.close();
  } else {
    console.log("ФОРМА НЕВАЛИДНА");
  }
});
