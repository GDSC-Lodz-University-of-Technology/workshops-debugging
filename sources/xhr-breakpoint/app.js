const normalCallBtn = document.querySelector('#normal-call');
const specialCallBtn = document.querySelector('#special-call');

function makeNormalCall() {
    void fetch('https://api.example.com/data?query=normal');
}

function makeSpecialCall() {
    void fetch('https://api.example.com/data?query=special');
}

normalCallBtn.addEventListener('click', makeNormalCall);
specialCallBtn.addEventListener('click', makeSpecialCall);
