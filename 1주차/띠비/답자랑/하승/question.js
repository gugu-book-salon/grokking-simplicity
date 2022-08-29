// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// 문제 링크 : https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-7widdo?file=/src/index.js:0-3354

const addPrice = (a, b) => a + b;

const changeItemToFilter = (items, filter) => {
  //filter 버튼에 따라 다른 아이템 및 가격 보여주기
  items.forEach((item) => {
    const isFilteredStoreItem = item.classList.contains(filter);
    item.style.display = isFilteredStoreItem ? "block" : "none";
  });
};

const getTotalPriceItems = (items) => {
  //총 가격 가져오기
  const totalPrice = Array.from(items).reduce(
    (preValue, _, currentIndex, arr) => {
      const currentItem = arr[currentIndex];
      if (currentItem.style.display === "block") {
        const currentPrice = Number(
          currentItem.querySelector(".store-item-price").innerText
        );
        return addPrice(preValue, currentPrice);
      }
      return preValue;
    },
    0
  );
  return totalPrice;
};

const setTotalPriceItems = (items) => {
  //아이템 개수에 따른 가격 설정하기
  const sumSpan = document.getElementById("sum");
  const sumTailSpan = document.getElementById("sum-tail");

  const sumPrice = getTotalPriceItems(items);
  sumSpan.innerText = `$${sumPrice}`;
  sumTailSpan.innerText =
    sumPrice > 100 ? `으로 $100를 넘습니다` : `으로 $100를 넘지 못합니다`;
};

const filterButton = () => {
  const buttonsByFilter = document.querySelectorAll(".filter-btn");
  const storeItems = document.querySelectorAll(".store-item");

  buttonsByFilter.forEach((button) => {
    button.addEventListener("click", function (clickedEvent) {
      const filter = clickedEvent.target.dataset.filter;
      changeItemToFilter(storeItems, filter);
      setTotalPriceItems(storeItems);
    });
  });
};

filterButton();
