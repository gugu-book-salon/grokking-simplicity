// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-forked-kb210j?file=/src/index.js:0-1848

main();

function isEqual(a, b) {
  return a === b;
}

function totalGreaterThanValue(total, value) {
  if (total > value) {
    return `으로 $${value}를 넘습니다`;
  } else {
    return `으로 $${value}를 넘지 못합니다`;
  }
}

function itemListPriceTotal(filter) {
  const sumOfPrice = [
    ...document.querySelectorAll(`.store-item-price.${filter}`),
  ]
    .map((el) => +el.innerText)
    .reduce((pre, cur) => pre + cur, 0);
  return sumOfPrice;
}

function updateInnerText(element, content) {
  element.innerText = content;
}

function sumPrices(filter) {
  const sumSpan = document.getElementById('sum');
  const sumTailSpan = document.getElementById('sum-tail');
  const totalPrice = itemListPriceTotal('all');
  const totalPriceByMenu = itemListPriceTotal(filter);
  if (isEqual(filter, undefined)) {
    updateInnerText(sumSpan, `$${totalPrice}`);
    updateInnerText(sumTailSpan, totalGreaterThanValue(totalPrice, 100));
  } else {
    updateInnerText(sumSpan, `$${totalPriceByMenu}`);
    updateInnerText(sumTailSpan, totalGreaterThanValue(totalPriceByMenu, 100));
  }
}

function showElements(item, filter, menu) {
  if (isEqual(filter, 'all') || isEqual(filter, menu)) {
    item.style.display = 'block';
  } else {
    item.style.display = 'none';
  }
}

function renderByMenu(filter) {
  const storeItems = document.querySelectorAll('.store-item');
  storeItems.forEach((item) => {
    showElements(item, filter, item.dataset.item);
    sumPrices(filter);
  });
}

function addClickEventButton() {
  const btnGroup = document.querySelector('.btn-group');
  btnGroup.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter;
    renderByMenu(filter);
  });
}

function main() {
  window.addEventListener('DOMContentLoaded', sumPrices());
  addClickEventButton();
}
