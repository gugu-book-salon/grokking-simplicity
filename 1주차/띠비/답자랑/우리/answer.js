// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요

main();

function compareNum(a, b) {
  return a > b;
}

function add(a, b) {
  return a + b;
}

function setSumTailSpanInnerText(sum) {
  const sumTailSpan = document.getElementById("sum-tail");
  sumTailSpan.innerText = compareNum(sum, 100)
    ? `으로 $100를 넘습니다`
    : `으로 $100를 넘지 못합니다`;
}

function setSumSpanInnerText(sum) {
  const sumSpan = document.getElementById("sum");
  sumSpan.innerText = `${sum}`;
}

function setInnerText(sum) {
  setSumSpanInnerText(sum);
  setSumTailSpanInnerText(sum);
}

function convertNum(data) {
  return Number(data);
}

function showItempSumPrice(filter) {
  let sum = 0;
  const storeItems = document.querySelectorAll(".store-item");
  storeItems.forEach(function (item) {
    if (item.classList.contains(filter) || filter === "all") {
      sum = add(
        sum,
        convertNum(item.querySelector(".store-item-price").innerText)
      );

      item.style.display = "block";
      setInnerText(sum);
    } else {
      item.style.display = "none";
    }
  });
}

function main() {
  showItempSumPrice("all");
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const filter = e.target.dataset.filter;
      showItempSumPrice(filter);
    });
  });
}
