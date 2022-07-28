// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
const buttons = document.querySelectorAll('.filter-btn');
const storeItems = document.querySelectorAll('.store-item');

function resultOfSum(price, sumTailSpan) {
  sumTailSpan.innerText =
    price > 100 ? `으로 $100를 넘습니다` : `으로 $100를 넘지 못합니다`;
}

function sumOfPricess(sumOfPrice, filter) {
  const sumSpan = document.getElementById('sum');
  const sumTailSpan = document.getElementById('sum-tail');
  sumSpan.innerText = `$${sumOfPrice}`;
  resultOfSum(sumOfPrice, sumTailSpan);
  if (filter === undefined) {
    sumSpan.innerText = `$${140}`;
    resultOfSum(140, sumTailSpan);
  }
}

function showElements(item, filter, menu) {
  if (filter === 'all') {
    item.style.display = 'block';
  } else {
    item.style.display = filter === menu ? 'block' : 'none';
  }
}

function categorizedByMenu(filter) {
  const sumOfPrice = [
    ...document.querySelectorAll(`.store-item-price.${filter}`),
  ]
    .map((el) => +el.innerText)
    .reduce((pre, cur) => pre + cur);
  storeItems.forEach((item) => {
    showElements(item, filter, item.dataset.item);
    sumOfPricess(sumOfPrice, filter);
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter;
    categorizedByMenu(filter);
  });
});

sumOfPricess();

// https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-forked-kb210j?file=/src/index.js:0-1335
