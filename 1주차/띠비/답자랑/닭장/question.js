//문제 해결에 초점두기
// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요

main();

let sum = 0;
[...document.querySelectorAll(".store-item-price")].forEach(
  (item) => (sum += +item.innerText)
);
innerText(sum);

//클릭 이벤트 발생
function filter(e) {
  const filter = e.target.dataset.filter;

  sumPrice(filter);
}

//계산하는 곳으로 넘어옴
function sumPrice(filter) {
  const storeItems = document.querySelectorAll(".store-item");
  let sum = 0;

  if (filter === "all") {
    //show all items
    storeItems.forEach(function (item) {
      const price = +item.querySelector(".store-item-price").innerText;
      sum += price;
      item.style.display = "block";
    });
  } else {
    storeItems.forEach(function (item) {
      if (item.classList.contains(`${filter}`)) {
        const price = +item.querySelector(".store-item-price").innerText;
        sum += price;
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  innerText(sum);
}

//계산 받아서 innnerText 실행
function innerText(sum) {
  const sumSpan = document.getElementById("sum");
  const sumTailSpan = document.getElementById("sum-tail");

  sumSpan.innerText = `$${sum}`;
  if (sum > 100) {
    sumTailSpan.innerText = `으로 $100를 넘습니다`;
  } else {
    sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
  }
}

function main() {
  const buttons = document.querySelector(".buttons");

  buttons.addEventListener("click", filter);
}
