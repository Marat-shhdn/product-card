const products = [
  {
    cardImage: {
      imageUrl: "img/mousse.png",
      imageAlt: "Увлажняющий мусс",
      width: "290",
      height: "245",
    },
    category: "для нормальной кожи",
    title: "Увлажняющий мус",
    description: "Глубоко увлажняют кожу лица, оставляя её мягкой и гладкой.",
    itemCompound: [
      "активные натуральные комплексы",
      "витамины С, А, РР, В И Е",
      "солнцезащитные компоненты",
    ],
    price: "2 750 &#8381;",
  },
  {
    cardImage: {
      imageUrl: "img/mask.png",
      imageAlt: "Увлажняющая маска",
      width: "290",
      height: "245",
    },
    category: "для нормальной кожи",
    title: "Увлажняющая маска",
    description: "Способствует удерживанию влаги в верхних слоях кожи.",
    itemCompound: ["воски", "минералы", "масла"],
    price: "3 500 &#8381;",
  },
  {
    cardImage: {
      imageUrl: "img/gel.png",
      imageAlt: "Гель для умывания",
      width: "290",
      height: "245",
    },
    category: "для нормальной кожи",
    title: "Гель для умывания",
    description: "Интенсивно очищает, не повреждает защитный барьер кожи.",
    itemCompound: [
      "активные натуральные комплексы",
      "витамины С, А, РР, В И Е",
      "солнцезащитные компоненты",
    ],
    price: "2 750 &#8381;",
  },
  {
    cardImage: {
      imageUrl: "img/set_1.png",
      imageAlt: "Подарочный набор №1",
      width: "290",
      height: "245",
    },
    category: "для нормальной кожи",
    title: "Подарочный набор №1",
    description: "Набор, состоящий из увлажняющего крема и маски.",
    itemCompound: ["воски", "минералы", "масла"],
    price: "4 750 &#8381;",
  },
  {
    cardImage: {
      imageUrl: "img/set_5.png",
      imageAlt: "Подарочный набор №5",
      width: "290",
      height: "245",
    },
    category: "для нормальной кожи",
    title: "Подарочный набор №5",
    description:
      "Весь набор средств Invisible symphony, крем, маска, мусс и гель для умывания.",
    itemCompound: ["воски", "минералы", "масла"],
    price: "7 520 &#8381;",
  },
];
function getCountCards() {
  let howCardsYourNeed = +prompt(
    "Сколько карточек вывести?",
    "только цифры от 1 до 5",
  );
  while (
    isNaN(howCardsYourNeed) ||
    howCardsYourNeed < 1 ||
    howCardsYourNeed > 5
  ) {
    howCardsYourNeed = +prompt(
      "Сколько карточек вывести?",
      "Некорректный ввод введите ТОЛЬКО ЦИФРЫ от 1 до 5",
    );
  }
  return howCardsYourNeed;
}
let limit = getCountCards();

const productsList = document.querySelector(".products");
const productstemplate = document.getElementById("products-template");
products.slice(0, limit).forEach((product) => {
  const productClone = productstemplate.content.cloneNode(true);
  const imgElement = productClone.querySelector(".card__image");
  console.log("Список продуктов:", productsList);
  console.log("Шаблон из HTML:", productstemplate);
  imgElement.src = product.cardImage.imageUrl;
  imgElement.alt = product.cardImage.imageAlt;
  imgElement.width = product.cardImage.width;
  imgElement.height = product.cardImage.height;
  productClone.querySelector(".card__category").textContent = product.category;
  productClone.querySelector(".card__title").textContent = product.title;
  productClone.querySelector(".card__description").textContent =
    product.description;
  const compoundlist = productClone.querySelector(".compound__item");
  product.itemCompound.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    compoundlist.appendChild(li);
  });
  productClone.querySelector(".price__value").innerHTML = product.price;
  productsList.appendChild(productClone);
});
console.log(productsList);
// Используя метод .reduce(), получить массив объектов,
// где ключем является название продукта, а значением - его описание
const titleDiscriptionArray = products.reduce((acc, product) => {
  acc.push({ [product.title]: product.description });
  return acc;
}, []);
console.log(titleDiscriptionArray);
