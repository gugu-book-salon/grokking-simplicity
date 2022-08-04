//구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// 문제 링크 : https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-7widdo?file=/src/index.js:0-3354

main();

function isSelected(item, selectedItem) {
  return item.classList.contains(selectedItem) || selectedItem === "all";
}

function getTotalPrice(storeItems) {
  //reduce 함수 구현
  const totalPrice = Array.from(storeItems).reduce((acc, el, i, src) => {
    const item = src[i];
    if (item.style.display !== "none") {
      const price = parseInt(
        item.querySelector(".store-item-price").innerText,
        10
      );
      return addTwo(acc, price);
    }
    return acc;
  }, 0);
  return totalPrice;
}

function setTotalPrice(storeItems){
  const sum = getTotalPrice(storeItems);
  setSumSpan(sum);
  setSumTailSpan(sum);
}

function setStyle(item, style) {
  item.style.display = style;
}

function addTwo(a, b) {
  return a + b;
}

function setSumSpan(sum) {
  const sumSpan = document.getElementById("sum");
  sumSpan.innerText = `$${sum}`;
}

function setSumTailSpan(sum) {
  const sumTailSpan = document.getElementById("sum-tail");
  if (sum > 100) {
    sumTailSpan.innerText = `으로 $100를 넘습니다`;
  } else {
    sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
  }
}

function renderSelectedItem(storeItems,selectedItem) {
  storeItems.forEach(function (item) {
    if (isSelected(item, selectedItem)) {
      setStyle(item, "block");
    } else {
      setStyle(item, "none");
    }
  });
  const sum = getTotalPrice(storeItems);
  setSumSpan(sum);
  setSumTailSpan(sum);
}

function main() {
  const storeItems = document.querySelectorAll(".store-item");
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const filter = e.target.dataset.filter;
      renderSelectedItem(storeItems,filter);
      setTotalPrice(storeItems);
    });
  });
}
