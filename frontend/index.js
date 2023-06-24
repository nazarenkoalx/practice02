console.log("hello from webpack");
// import "./css/vitaliy.css";
import "./sass/andriy.scss";

// import alex from "./js/alex";
// import vitaliy from "./js/vitaliy";

// console.log(alex + 100, "alex");
// console.log(vitaliy + 200, "vitaliy");

class User {
  #name;
  constructor(name) {
    this.#name = name;
  }
  getInfo() {
    console.log(this.#name);
  }
}

const alex = new User("Alex");

alex.getInfo();

console.log("hello, webpack success 505059348973434834");
