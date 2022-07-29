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

function setSumSpanInnerText(sum) {
  const sumSpan = document.getElementById("sum");
  sumSpan.innerText = `${sum}`;
}

function setSumTailSpanInnerText(sum, target) {
  const sumTailSpan = document.getElementById("sum-tail");
  sumTailSpan.innerText = compareNum(sum, target)
    ? `으로 $${target}를 넘습니다`
    : `으로 $${target}를 넘지못합니다`;
}

function isAllFilter(filter) {
  return filter === "all";
}

function isTargetFilter(classList, filter) {
  return classList.contains(filter);
}

function setDisplayNone(storeItems, filter) {
  storeItems.forEach((item) => {
    if (!isTargetFilter(item.classList, filter) && !isAllFilter(filter)) {
      item.style.display = "none";
      return;
    }
  });
}

function getFilteredItems(storeItems, _filter) {
  return Object.values(storeItems).filter(
    (item) => isTargetFilter(item.classList, _filter) || isAllFilter(_filter)
  );
}

function getStoreItems(className) {
  return document.querySelectorAll(className);
}

function getTotalPrice(filteredItems) {
  return Object.values(filteredItems).reduce((acc, current) => {
    current.style.display = "block";
    return add(
      acc,
      Number(current.querySelector(".store-item-price").innerText)
    );
  }, 0);
}

function showItemSumPrice(filter) {
  const storeItems = getStoreItems(".store-item");
  setDisplayNone(storeItems, filter);
  const filteredItems = getFilteredItems(storeItems, filter);
  const sum = getTotalPrice(filteredItems);
  setSumSpanInnerText(sum);
  setSumTailSpanInnerText(sum, 100);
}

function main() {
  showItemSumPrice("all");
  document.addEventListener("click", function (event) {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;
    const filter = event.target.dataset.filter;
    showItemSumPrice(filter);
  });
}
