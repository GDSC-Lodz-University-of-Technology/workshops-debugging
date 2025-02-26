const input1 = document.querySelector('.input-1');
const input2 = document.querySelector('.input-2');
const label = document.querySelector('p');
const button = document.querySelector('button');

function getNumber1() {
    return input1.value;
}

function getNumber2() {
    return input2.value;
}

function sum2Values(value1, value2) {
    return value1 + value2;
}

function inputsAreEmpty() {
    if (getNumber1() === '' || getNumber2() === '') {
        return true;
    } else {
        return false;
    }
}

function onClick() {
    if (inputsAreEmpty()) {
        label.textContent = 'Error: one or both inputs are empty.';
        return;
    }
    updateLabel();
}

function updateLabel() {
    const number1 = getNumber1();
    const number2 = getNumber2();
    const sum = sum2Values(number1, number2);
    label.innerHTML = `${number1} + ${number2} = ${sum}`;
}

button.addEventListener('click', onClick);
