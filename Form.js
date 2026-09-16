// Создать файл Form.js и реализовать класс для формы под названием Form.js
// Он будет принимать 1 параметр - айди формы. Внутри класса будут методы:
//  I. Для получения всех значений формы.
//  II. Для проверки валидности формы (метод возвращает true/false в зависимости от того, валидна ли форма).
//  III. Для сброса значений формы.
// Используя данный класс - переписать логику задания №11, связанной с формами.
// Как? Используя внутренние методы - мы можем управлять через айди формы получением значений и всем, что должна делать модалка.
export default class Form {
  constructor(formID) {
    this.form = document.getElementById(formID);
  }
  getValueForm() {
    if (!this.form) return;

    const formData = new FormData(this.form);
    return Object.fromEntries(formData.entries());
  }
  isvalid() {
    if (!this.form) return false;

    const passwordInput = this.form.querySelector('[name="password"]');
    const confirmInput = this.form.querySelector('[name="checkPassword"]');

    if (passwordInput && confirmInput) {
      if (passwordInput.value !== confirmInput.value) {
        confirmInput.setCustomValidity("Пароли не совпадают!");
        confirmInput.value = "";
        this.form.reportValidity();
        confirmInput.setCustomValidity("");
        return false;
      }
    }
    return this.form.reportValidity();
  }

  reset() {
    this.form.reset();
  }
}
