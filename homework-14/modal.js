// Вариант 1
export class Modal_1 {
  constructor(modalId, buttonId, shouldCloseOnOverlay) {
    this.modal = document.getElementById(modalId);
    this.overlay = document.getElementById("overlay");

    this.#initOpen(buttonId);
    this.#initClose(shouldCloseOnOverlay);
  }

  open() {
    this.modal.classList.add("modal-showed");
    this.overlay.classList.add("overlay-showed");
  }

  close() {
    this.modal.classList.remove("modal-showed");
    this.overlay.classList.remove("overlay-showed");
  }

  isOpen() {
    return this.modal.classList.contains("modal-showed");
  }

  #initOpen(buttonId) {
    const button = document.getElementById(buttonId);

    button.addEventListener("click", () => {
      this.open();
    });
  }

  #initClose(shouldCloseOnOverlay) {
    const closeButton = this.modal.querySelector("#modal-close-button");

    closeButton.addEventListener("click", () => {
      this.close();
    });
    this.overlay.addEventListener("click", () => {
      // модальное окно закроется при нажатие на оверлей,
      // только если модалное окно этого экземпляра класса открыто и
      // стоит разрешение для закрытия по overlay т.е. shouldCloseOnOverlay = true
      if (this.isOpen() && shouldCloseOnOverlay) {
        this.close();
      }
    });
  }
}

// вариант 2
export class Modal_2 {
  constructor(modalId, buttonId, shouldCloseOnOverlay) {
    this.modal = document.getElementById(modalId);
    this.overlay = document.getElementById("overlay");

    // Создаем именованную ссылку на функцию, чтобы её можно было удалить из памяти
    // она сработает, если стоит разрешение для закрытия по overlay т.е. shouldCloseOnOverlay = true
    this.handleOverlayClick = () => {
      if (shouldCloseOnOverlay) this.close();
    };

    this.#initOpen(buttonId);
    this.#initClose(); // Здесь больше не вешаем разрешение на закрытие по оверлей!
  }

  open() {
    this.modal.classList.add("modal-showed");
    this.overlay.classList.add("overlay-showed");
    // теперь только при открытие модалки начинает слушать нажатие на overlay
    this.overlay.addEventListener("click", this.handleOverlayClick);
  }

  close() {
    this.modal.classList.remove("modal-showed");
    this.overlay.classList.remove("overlay-showed");
    // после закрытия модалки перестает слушать нажатие на overlay
    this.overlay.removeEventListener("click", this.handleOverlayClick);
  }

  #initOpen(buttonId) {
    const button = document.getElementById(buttonId);
    button.addEventListener("click", () => this.open());
  }

  #initClose() {
    const closeButton = this.modal.querySelector(".modal-close-button");
    closeButton.addEventListener("click", () => this.close());
  }
}
