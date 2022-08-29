// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// 문제 링크 : https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-7widdo?file=/src/index.js:0-3354
// 계산 함수 //

// 더하기
function add(a, b) {
  return a + b;
}

// DOM 조작 (Action) //
// 아이템 필터에 따라 display 스타일 변경
function showItems(storeItems, filter) {
  storeItems.forEach((storeItem) => {
    const isFiltered = storeItem.classList.contains(filter) || filter === "all";

    if (isFiltered) {
      storeItem.style.display = "block";
    } else {
      storeItem.style.display = "none";
    }
  });
}

// 필터링 된 아이템의 총 합계 구하기
function getItemsTotal(storeItems) {
  return Array.from(storeItems).reduce((prev, curr, idx, src) => {
    const item = src[idx];
    if (item.style.display !== "none") {
      const price = parseInt(
        item.querySelector(".store-item-price").innerText,
        10
      );

      return add(prev, price);
    }
    return prev;
  }, 0);
}

function setCalculatedAmount(storeItems) {
  const sumSpan = document.getElementById("sum");
  const sumTailSpan = document.getElementById("sum-tail");

  const total = getItemsTotal(storeItems);
  sumSpan.innerText = `$${total}`;
  if (total > 100) {
    sumTailSpan.innerText = "으로 $100를 넘습니다.";
  } else {
    sumTailSpan.innerText = "으로 $100를 넘지 못합니다.";
  }
}

// 버튼 이벤트
function main() {
  const buttons = document.querySelectorAll(".filter-btn");
  const storeItems = document.querySelectorAll(".store-item");

  // 초기 로딩 시 가격 설정
  setCalculatedAmount(storeItems);

  // 버튼 클릭하고 나서 가격 설정
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const filter = event.target.dataset.filter;
      showItems(storeItems, filter);
      setCalculatedAmount(storeItems);
    });
  });
}

main();
