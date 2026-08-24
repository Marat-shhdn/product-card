import { comments } from "./comments.js";
//Создать массив чисел от 1 до 10. Отфильтровать его таким образом, что бы мы получил массив чисел, начиная с 5.
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr = numbers.slice(4, 10);
console.log(arr);

// Создать массив строк, относящихся к любой сущности (название фильмов/книг, кухонные приборы, мебель и т.д.),
// проверить, есть ли в массиве какая-то определенная сущность/
const furniture = ["Стул", "Стол", "Шкаф", "Диван", "Кресло"];
const arrFurniture = furniture.find((furn) => furn === "Стул");
const isFurniture = furniture.includes("Стул");
console.log(` Есть ли ${arrFurniture} в наличие: ${isFurniture}`);

// Написать функцию, которая аргументом будет принимать массив и изменять его порядок
// на противоположный ("переворачивать") два вышеуказанных массива с помощью этой функции перевернуть.
function getReversArr(newArr) {
  return newArr.reverse();
}
console.log(`Было: ${numbers}. стало: ${getReversArr(numbers)}`);
console.log(`Было: ${furniture}. стало: ${getReversArr(furniture)}`);

//Вывести в консоль массив тех комментариев из файла comments.js, почта пользователей которых содержит ".com"

const dotComEmail = comments.filter((comment) =>
  comment.email.endsWith(".com"),
);
console.log(dotComEmail);

// Перебрать массив таким образом, что бы пользователи с id меньше или равно 5 имели postId: 2,
// а те, у кого id больше 5, имели postId: 1
const getIdFive = comments.filter((comment) =>
  comment.id <= 5 ? { ...comment, postId: 2 } : { ...comment, postId: 1 },
);
console.log(getIdFive);

// Перебрать массив, что бы объекты состояли только из айди и имени
const idAndName = comments.map((comment) => ({
  id: comment.id,
  name: comment.name,
}));
console.log(idAndName);
//Перебираем массив, добавляем объектам свойство isInvalid и проверяем:
// если длина тела сообщения (body) больше 180 символов - устанавливаем true, меньше - false.
const addIsInvalid = comments.map((comment) => {
  return { ...comment, isInvalid: comment.body.length > 180 ? true : false };
});
console.log(addIsInvalid);

// 11. Почитать про метод массива reduce.
// Используя его, вывести массив почт и провернуть тоже самое с помощью метода map
const emailArr = comments.reduce((acc, comment) => {
  return [...acc, comment.email];
}, []);
console.log(emailArr);
const emailArrMap = comments.map((comment) => comment.email);
console.log(emailArrMap);

// 12. Почитать про методы toString(), join() и перебрав массив с задания №11, привести его к строке.
console.log(emailArr.toString());
console.log(emailArrMap.join(`, -> `));
