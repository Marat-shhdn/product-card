class Drink {
  #temperature = 0;

  constructor(name, size, price) {
    this.name = name;
    this.size = size;
    this.price = price;
    this.#temperature;
  }

  showDrinkInfo() {
    return `${this.name},${this.size},${this.price}`;
  }

  getTempDrink() {
    return this.#temperature;
  }

  setTempDrink(value) {
    this.#temperature = value;
  }

  #makeDrink() {
    return this.#temperature > 50
      ? `${this.name} приготовлен`
      : `напиток не готов`;
  }

  giveDrink(temperature) {
    console.log(`Температура до начала приготовления ${this.getTempDrink()}`);
    this.setTempDrink(temperature);
    console.log(`Для приготовления напиток нагрели до ${this.getTempDrink()}`);
    const state = this.#makeDrink();
    if (state === `напиток не готов`) return `Извините ${state}`;
    else
      return `Вот ваш ${this.name} с вас ${this.price} рублей(да! расчет в рублях ведется)`;
  }
}

class Coffe extends Drink {
  constructor(name, size, price, milk, syrup) {
    super(name, size, price);
    this.milk = milk;
    this.syrup = syrup;
  }
  showDrinkInfo() {
    super.showDrinkInfo();
    return `${this.milk}, ${this.syrup}`;
  }
}

class Tea extends Drink {
  constructor(name, size, price, tea, milk) {
    super(name, size, price);
    this.tea = tea;
    this.milk = milk;
  }
  showDrinkInfo() {
    super.showDrinkInfo();
    return `${this.tea}, ${this.milk}`;
  }
}

class FruitDrink extends Drink {
  constructor(name, size, price, firstFruit, secondFruit) {
    super(name, size, price);
    this.firstFruit = firstFruit;
    this.secondFruit = secondFruit;
  }
  showDrinkInfo() {
    super.showDrinkInfo();
    return `${this.firstFruit}, ${this.secondFruit}`;
  }
}

class Cafe {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  showCafeInfo() {
    return `Кафе ${this.name} находится по адресу ${this.address}`;
  }
  serveCostomer(drink, temp) {
    return drink.giveDrink(temp);
  }
}

const latte = new Coffe("Latte", "200ml", "100", "50ml", "almond");
const expresso = new Coffe("Expresso", "30ml", "90", "without milk", "almond");
const blacktea = new Tea("Black Tea", "150ml", "120", "Nilgiri", "50ml");
const cafeSea = new Cafe("Sea", "London, Avenu st, 58");
console.log(cafeSea.showCafeInfo());
console.log(cafeSea.serveCostomer(latte, 60));
console.log(cafeSea.serveCostomer(blacktea, 50));
