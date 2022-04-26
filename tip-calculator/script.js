const bills = document.getElementById("bill");
const tipValue = document.querySelectorAll(".tip-value");
const customTip = document.querySelector("#custom-tip");
const people = document.getElementById("people");
const error = document.querySelector(".error");
const tipAmount = document.querySelector(".tip-amount");
const totalValue = document.querySelector(".total");
const reset = document.getElementById("reset");

let billVal = 0;
let peopleVal = 1;
let tipVal = 0.15;

bills.addEventListener("input", validateBill);

function validateBill() {
  if (bills.value.includes(",")) {
    bills.value.replace(".", ".");
  }
  billVal = parseFloat(bills.value);
  calculate();
}

customTip.addEventListener("input", tipCustomVal);
people.addEventListener("input", setPeopleVal);
reset.addEventListener("click", handleReset);

tipValue.forEach((value) => {
  value.addEventListener("click", handleClick);
});

function handleClick(event) {
  tipValue.forEach((value) => {
    value.classList.remove("active");
    if (event.target.innerHTML === value.innerHTML) {
      value.classList.add("active");
      tipVal = parseFloat(value.innerHTML) / 100;
    }
  });
  customTip.value = "";
  calculate();
}

function tipCustomVal() {
  tipVal = parseFloat(customTip.value / 100);
  tipValue.forEach((value) => {
    value.classList.remove("active");
  });
  if (customTip.value !== 0) {
    calculate();
  }
}

function setPeopleVal() {
  peopleVal = parseFloat(people.value);
  if (peopleVal <= 0) {
    error.innerHTML = "number must be greater than zero";
    people.style.outline = "3px solid red";
  } else {
    error.innerHTML = "";
    people.style.outline = "";
  }

  calculate();
}

function calculate() {
  if (peopleVal >= 1) {
    let tip = (billVal * tipVal) / peopleVal;
    let totalAmount = (billVal * (tipVal + 1)) / peopleVal;

    tipAmount.innerHTML = "$" + tip.toFixed(2);
    totalValue.innerHTML = "$" + totalAmount.toFixed(2);
  }
}

function handleReset() {
  bills.value = 0.0;
  validateBill();

  tipValue[2].click();
  people.value = 1;
  setPeopleVal();
}
