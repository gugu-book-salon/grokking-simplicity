// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// 문제 링크 : https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-7widdo?file=/src/index.js:0-3354

main();

function setStyleNone(item) {
  item.style.display = "none";
}

function setStlyeBlock(item) {
  return (item.style.display = "block");
}

function sumPrice(a, b) {
  return a + b;
}

function compareTwo(a, b) {
  return a > b;
}

function setSumSpan(sum) {
  const sumSpan = document.getElementById("sum");
  sumSpan.innerText = `$${sum}`;
}

function setSumTailSpan(sum) {
  const sumTailSpan = document.getElementById("sum-tail");
  if (compareTwo(sum, 100)) {
    sumTailSpan.innerText = `으로 $100를 넘습니다`;
  } else {
    sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
  }
}

function filterItem(selectedItem) {
  let sum = 0;
  const storeItems = document.querySelectorAll(".store-item");
  storeItems.forEach(function (item) {
    if (item.classList.contains(selectedItem) || selectedItem === "all") {
      const price = +item.querySelector(".store-item-price").innerText;
      sum = sumPrice(sum, price);
      setStlyeBlock(item);
      setSumSpan(sum);
      setSumTailSpan(sum);
    } else {
      setStyleNone(item);
    }
  });
}

function main() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const filter = e.target.dataset.filter;
      filterItem(filter);
    });
  });
}
