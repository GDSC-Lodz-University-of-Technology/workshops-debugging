const input1 = document.querySelector('.input-1');
const input2 = document.querySelector('.input-2');
const label = document.querySelector('p');
const button = document.querySelector('button');

function getNumber1() {
    // return Number(input1.value);
    return input1.value;
}

function getNumber2() {
    // return Number(input2.value);
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
        throw new Error('Error: one or both inputs are empty.');
    }
    updateLabel();
}

function updateLabel() {
    const number1 = getNumber1();
    const number2 = getNumber2();
    let sum = sum2Values(number1, number2);
    if (number1 === 12) {
        sum = 1000000000;
    }
    label.innerHTML = `${number1} + ${number2} = ${sum}`;
}

button.addEventListener('click', onClick);
