let first = null;
let second = null;
let op = null;

const MAX_NUMBER = 9999999999999999;

const NUMBER_BUTTONS = [];
for (let number = 0; number <= 9; number++) {
  NUMBER_BUTTONS.push({
    value: number,
    class: "",
    clickEvent: () => clickNumber(number),
  });
}

const CLEAR_BUTTON = {
  value: "C",
  class: "clear-button",
  clickEvent: () => clear(),
};

const EQUAL_BUTTON = {
  value: "=",
  class: "equal-button",
  clickEvent: () => executeOperation(),
};

function clickNumber(number) {
  let currentNumber = getScreenValue();
  let newNumber = currentNumber * 10 + number;
  changeScreen(newNumber);
}

const Operator = {
  Add: "Add",
  Substract: "Substract",
  Multiply: "Multiply",
  Divide: "Divide",
};

function add(first, second) {
  return first + second;
}

function substract(first, second) {
  return first - second;
}

function multiply(first, second) {
  return first * second;
}

function divide(first, second) {
  return first / second;
}

function changeScreen(newValue) {
  let screen = document.querySelector(".screen");
  if (newValue > MAX_NUMBER) {
    screen.textContent = "MAX";
  } else if (Number.isNaN(newValue)) {
    screen.textContent = 0;
  } else {
    screen.textContent = newValue;
  }
}

function getScreenValue() {
  let screen = document.querySelector(".screen");
  let content = screen.textContent;
  if (content.length === 0) {
    return 0;
  } else {
    return parseFloat(content);
  }
}

function clear() {
  first = null;
  second = null;
  op = null;
  changeScreen(0);
}

function executeOperation() {
  let result = 0;
  switch (op) {
    case Operator.Add:
      result = add(first, second);
      break;
    case Operator.Substract:
      result = substract(first, second);
      break;
    case Operator.Multiply:
      result = multiply(first, second);
      break;
    case Operator.Divide:
      result = divide(first, second);
      break;
    default:
      result = NaN;
      break;
  }
  if (!Number.isNaN(result)) {
    changeScreen(result);
  }
}

function addButtons() {
  addNumberButtons();
  addOperatorButtons();
}

function createButtonRow(buttonDescriptions) {
  let buttonRow = document.createElement("div");
  buttonRow.className = "button-row";
  buttonDescriptions.forEach((element) => {
    console.log(element);
    buttonRow.appendChild(createButton(element));
  });
  return buttonRow;
}

function createButton(buttonDescription) {
  let button = document.createElement("button");
  button.textContent = buttonDescription.value;
  button.className = buttonDescription.class;
  button.addEventListener("click", buttonDescription.clickEvent);
  return button;
}

function addNumberButtons() {
  let numberButtons = document.querySelector(".number-buttons");
  let buttons = [];
  for (let row = 0; row < 3; row++) {
    buttons.push(
      createButtonRow(NUMBER_BUTTONS.slice(3 * row + 1, 3 * row + 4)),
    );
  }
  buttons.push(
    createButtonRow([CLEAR_BUTTON, NUMBER_BUTTONS[0], EQUAL_BUTTON]),
  );
  console.log(buttons);
  numberButtons.replaceChildren(...buttons);
}

addNumberButtons();
