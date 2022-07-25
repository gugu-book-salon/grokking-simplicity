// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// 문제 링크 : https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-7widdo?file=/src/index.js:0-3354

const buttons = document.querySelectorAll(".filter-btn");
const storeItems = document.querySelectorAll(".store-item");
const sumSpan = document.getElementById("sum");
const sumTailSpan = document.getElementById("sum-tail");
// let sum = 0;
// [...document.querySelectorAll(".store-item-price")].forEach(
//   (item) => (sum += +item.innerText)
// );

const addPrice = (a, b) => {
  a + b;
};

const changeFilter = (items, filter) => {
  //filter 버튼에 따라 다른 아이템 및 가격 보여주기
  items.forEach((item) => {
    const isFilteredStoreItem = item.classList.contains(filter);
    isFilteredStoreItem
      ? (item.style.display = "block")
      : (item.style.display = "none");
  });
};

const getTotalPriceItems = (items) => {
  let sum = 0;
  items.forEach((item) => {
    const totalPrice = Number(item.querySelector(".store-item-price"));
    sum = addPrice(sum, totalPrice);
  });
  return totalPrice;
};

const setTotalPriceItems = (items) => {
  //아이템 개수에 따른 가격 설정하기
  const sumSpan = document.getElementById("sum");
  const sumTailSpan = document.getElementById("sum-tail");

  const sumPrice = getTotalPriceItems(items);
  sumSpan.innerText = `$${sumPrice}`;
  sumPrice > 100
    ? (sumTailSpan.innerText = `으로 $100를 넘습니다`)
    : (sumTailSpan.innerText = `으로 $100를 넘지 못합니다`);
};

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const filter = e.target.dataset.filter;
    changeFilter(storeItems, filter);
    setTotalPriceItems(storeItems);
  });
});
