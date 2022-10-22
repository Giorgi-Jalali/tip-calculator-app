// ---- ////\\\\ ---- \\

const billInput = document.getElementById('bill');
const peopleNum = document.getElementById('people-num');
const customInput = document.getElementById('custom');

const amountNum = document.getElementById('amount-num');
const totalNum = document.getElementById('total-num');

const resetBtn = document.querySelector('.reset');
const errorMsg = document.getElementById('error-msg');

const tips = document.querySelectorAll('.tips');

// Events...

billInput.addEventListener('input', billInputFun);
peopleNum.addEventListener('input', peopleNumFun);
tips.forEach((val) => val.addEventListener('click', handleClick));
customInput.addEventListener('input', customInputFun);
resetBtn.addEventListener('click', reset);

// ...

const currencySymbol = '$';

billInput.value = '';
peopleNum.value = '';
amountNum.innerHTML = currencySymbol + (0.0).toFixed(2);
totalNum.innerHTML = currencySymbol + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 0;
let tipValue = 0.15;

// Functions...

function calculateTip() {
  if (peopleValue > 0) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + tipAmount) / peopleValue;
    amountNum.innerHTML = currencySymbol + tipAmount.toFixed(2);
    totalNum.innerHTML = currencySymbol + total.toFixed(2);
  }
}

function billInputFun() {
  billValue = parseFloat(billInput.value);
  calculateTip();
}

function peopleNumFun() {
  peopleValue = parseFloat(peopleNum.value);
  resetBtn.style.backgroundColor = '#26C2AE';
  calculateTip();

  if (peopleValue < 1) {
    errorMsg.style.display = 'inline-block';
    peopleNum.style.border = '2px solid #E17052';
  } else {
    errorMsg.style.display = 'none';
    peopleNum.style.border = '1px dashed #26c2ae';
    calculateTip();
  }
}

function customInputFun() {
  tipValue = parseFloat(customInput.value / 100);
  tips.forEach((val) => val.classList.remove('active-tip'));
  calculateTip();
}

function handleClick(event) {
  tips.forEach((val) => {
    val.classList.remove('active-tip');
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add('active-tip');
      tipValue = parseFloat(val.innerHTML) / 100;
      customInput.value = '';
    }
  });
  calculateTip();
}

function reset() {
  billInput.value = '';
  billInputFun();
  peopleNum.value = '';
  peopleNumFun();
  customInput.value = '';
  customInputFun();
  resetBtn.style.backgroundColor = '#0d686d';
  amountNum.innerHTML = currencySymbol + (0.0).toFixed(2);
  totalNum.innerHTML = currencySymbol + (0.0).toFixed(2);
}
