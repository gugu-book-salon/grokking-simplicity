const buttons = document.querySelector(".buttons");
const storeItems = document.querySelectorAll(".store-item");
const sumSpan = document.getElementById("sum");
const sumTailSpan = document.getElementById("sum-tail");

//아무런 이벤트가 없을 때 전부 다 더해져서 결과값이 나옴
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
  sumSpan.innerText = `$${sum}`;
  if (sum > 100) {
    sumTailSpan.innerText = `으로 $100를 넘습니다`;
  } else {
    sumTailSpan.innerText = `으로 $100를 넘지 못합니다`;
  }
}

buttons.addEventListener("click", filter);

//크게 더러워 보이는 것들 추려내보기 -> O 반복적인 if문 없앰.
//innterText 계산 분리
//filter 분리
//가격 counter 분리
//액션, 계산, 데이터?

//click event -> return filter
//fliter 받아서 -> sum 계산하는 함수 -> return sum
//sum 받아서 -> innerText 변경해주는 함수
//style,display 어디로? 분리할 수 있나?

//버튼이 눌렸을 때 어떤 게 필터가 되어있는지.
//그것만 남기고 뼈와 살을 다 발라버려야.... 어? css 같다
//이벤트 위임하면 더 깔끔해질 거 같은데.

//이게 최선인가?
//sumPrice 부분 더 쪼갤 수 있을 거 같은데
//forEach가 중복된다. 이거 어떻게 정리 가능하지 않을까?
//display none, block 이것도 분리할 수 있지 않을까?
//filter 로 조건을 받아서 배열로 만든 다음, 그 배열을 display와 forEach 가지고 갈 수 있게 만든다면 두 개 쪼개기 가능할 거 같은데.... 아.. 머리가 안돌아가....
