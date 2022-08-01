//문제 해결에 초점두기
// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요

main();

//계산하는 곳으로 넘어옴
function setSumPrice(filter) {
  const storeItems = document.querySelectorAll(".store-item");
  let sum = 0;

  storeItems.forEach(function (item) {
    if (filter === "all" || item.classList.contains(`${filter}`)) {
      const price = +item.querySelector(".store-item-price").innerText;
      sum += price;
    }
  });

  setInnerText(sum);
}

//display 분리
function showDisplay(filter) {
  const storeItems = document.querySelectorAll(".store-item");

  storeItems.forEach(function (item) {
    if (filter === "all" || item.classList.contains(`${filter}`)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

//계산 받아서 innnerText 실행
function setInnerText(sum) {
  const sumSpan = document.getElementById("sum");
  const sumTailSpan = document.getElementById("sum-tail");

  sumSpan.innerText = `$${sum}`;
  if (sum > 100) {
    sumTailSpan.innerText = `으로 $100를 넘습니다`;
  } else {
    sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
  }
}

//기본 총합
function defaultTotalPrice() {
  const storeItemPriceArr = [...document.querySelectorAll(".store-item-price")];
  const sum = storeItemPriceArr.reduce(function add(sum, currenValue) {
    return sum + +currenValue.innerText;
  }, 0);

  setInnerText(sum);
}

//버튼 이벤트 발생
function clickButtonEvent(e) {
  const filter = e.target.dataset.filter;

  setSumPrice(filter);
  showDisplay(filter);
}

function main() {
  defaultTotalPrice();
  const buttons = document.querySelector(".buttons");

  buttons.addEventListener("click", clickButtonEvent);
}
