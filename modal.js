// 4. Создать файл Modal.js и в нем создать класс для модального окна под названием Modal.
// Он будет принимать 1 параметр через конструктор - айди модального окна. Внутри класса будут методы:
//  I. Для открытия модального окна.
//  II. Для закрытия модального окна.
//  III. Для проверки, открыто ли сейчас модальное окно.
//  IV. Метод, который слушает кнопку (крестик) для закрытия модалки и закрывает модалку
// (реализовать через eventListener) и вызывать в конструкторе
// Используя данный класс - переписать логику задания №11, связанной с модальными окнами.
// Как? Используя внутренние методы - мы можем управлять через айди модалки ее закрытием, открытием.
export default class Modal {
  constructor(modalID) {
    this.modal = document.getElementById(modalID);
    this.openRegistration = document.getElementById("registration-btn");
    this.closeModalBtn = document.querySelector(".close-btn");
    this.overlay = this.modal.querySelector(".modal__overlay");
    this.isClose();
  }

  open() {
    this.modal.classList.add("showed");
  }

  isOpen() {
    return this.modal.classList.contains("showed");
  }

  close() {
    this.modal.classList.remove("showed");
  }
  isClose() {
    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener("click", () => this.close());
    }
    this.overlay.addEventListener("click", () => this.close());
  }
}
