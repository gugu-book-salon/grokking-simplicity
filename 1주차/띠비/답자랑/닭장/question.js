//문제 해결에 초점두기
// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요

main();

//계산하는 곳으로 넘어옴
function setSumPrice(filter) {
  const baseAmount = 100;
  const storeItemsArr = [...document.querySelectorAll(".store-item")];

  const sum = storeItemsArr
    .filter((el) => {
      return el.classList.contains(`${filter}`) || filter === "all";
    })
    .reduce((sum, currentValue) => {
      return sum + +currentValue.querySelector(".store-item-price").innerText;
    }, 0);

  setInnerText(sum, baseAmount);
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
function setInnerText(sum, baseAmount) {
  const sumSpan = document.getElementById("sum");
  const sumTailSpan = document.getElementById("sum-tail");

  sumSpan.innerText = `$${sum}`;
  sumTailSpan.innerText = `으로 $${baseAmount}를 ${
    sum > baseAmount ? "넘습니다" : "넘지 못합니다"
  }`;
}

//버튼 이벤트 발생
function clickButtonEvent(e) {
  const filter = e.target.dataset.filter;

  setSumPrice(filter);
  showDisplay(filter);
}

function main() {
  setSumPrice("all");
  showDisplay("all");

  const buttons = document.querySelector(".buttons");
  buttons.addEventListener("click", clickButtonEvent);
}
