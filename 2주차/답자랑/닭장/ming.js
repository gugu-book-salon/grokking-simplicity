//button eventlistner로 evnent.target.id의 문자열이 어떤 게 들어오는지 확인.

//if event.target.id === "all"
//const cookies : cookies 리스트 전체 목록화
//리스트 전 목록이 화면 출력
//if event.target.id !== "all"
//객체의 키의 일부분과 target.id와 같은 것을 찾기
//찾은 키의 값을 출력하기

//remove
//const filterInput = document.getElementById("filter-input");의 value 가져오기
//출력된 리스트에서 filterInput.value와 같은 걸 제거하기

const cookies = {
  assultCookies: [
    "크런치초코칩 쿠키",
    "다크카카오 쿠키",
    "실론나이트 쿠키",
    "마라맛 쿠키",
    "라즈베리맛 쿠키",
    "벨벳케이크맛 쿠키",
    "구미호맛 쿠키",
    "자색고구마맛 쿠키",
    "다크초코 쿠키",
    "웨어울프맛 쿠키",
    "근육맛 쿠키",
    "공주맛 쿠키",
    "용감한 쿠키",
  ],
  defensiveCookies: [
    "휘낭시에맛 쿠키",
    "와일드베리맛 쿠키",
    "코코아맛 쿠키",
    "달토끼맛 쿠키",
    "홀리베리 쿠키",
    "딸기크레페맛 쿠키",
    "마들렌맛 쿠키",
    "우유맛 쿠키",
    "아보카도맛 쿠키",
    "용사맛 쿠키",
    "딸기맛 쿠키",
  ],
  magicianCookies: [
    "클로티드 크림 쿠키",
    "서리여왕 쿠키",
    "펌킨파이맛 쿠키",
    "오징어먹물맛 쿠키",
    "망고맛 쿠키",
    "악마맛 쿠키",
    "라떼맛 쿠키",
    "에스프레소맛 쿠키",
    "감초맛 쿠키",
    "눈설탕맛 쿠키",
    "마법사맛 쿠키",
  ],
};

main();

//cookie list 배열 뱉어내기
function setCookieList(button) {
  if (button === "all") {
    return [
      ...cookies.assultCookies,
      ...cookies.defensiveCookies,
      ...cookies.magicianCookies,
    ];
  } else {
    return [...cookies[`${button}Cookies`]];
  }
}

//cookie list와 버튼값 받아와서 필터하기
function filterCookies(button) {}

//배열 눈에 보이게 하기
function showCookieList() {}

//클릭 이벤트 발생
function clickButton() {
  const buttons = document.querySelectorAll("#app button");

  buttons.forEach((buttons) => {
    buttons.addEventListener("click", (event) => {
      const button = event.target.id;

      button === "filter-button"
        ? filterCookies(button)
        : setCookieList(button);
    });
  });
}

function main() {
  clickButton();
}

//이벤트 위임 처리할 수 있는 것들
// const allButton = document.getElementById("all");
// const assultButton = document.getElementById("assult");
// const defensiveButton = document.getElementById("defensive");
// const magicianButton = document.getElementById("magician");
// const filterButton = document.getElementById("filter-button");

//지역변수로 넣어야 하는 것들
// const filterInput = document.getElementById("filter-input");
// const content = document.getElementById("content");

// let appContent = "";

// allButton.addEventListener("click", () => {
//   content.innerHTML = "";
//   for (let i = 0; i < cookies.length; i++) {
//     filteredCookies.push(cookies[i]);
//     appContent += `<li>${cookies[i]}</li>`;
//   }
//   content.innerHTML = appContent;
//   appContent = "";
// });

// assultButton.addEventListener("click", () => {
//   content.innerHTML = "";
//   for (let i = 0; i < cookies.assultCookies.length; i++) {
//     filteredCookies.push(cookies[i]);
//     appContent += `<li>${cookies.assultCookies[i]}</li>`;
//   }
//   content.innerHTML = appContent;
//   appContent = "";
// });

// defensiveButton.addEventListener("click", () => {
//   content.innerHTML = "";
//   for (let i = 0; i < cookies.defensiveCookies.length; i++) {
//     filteredCookies.push(cookies[i]);
//     appContent += `<li>${cookies.defensiveCookies[i]}</li>`;
//   }
//   content.innerHTML = appContent;
//   appContent = "";
// });

// magicianButton.addEventListener("click", () => {
//   content.innerHTML = "";
//   for (let i = 0; i < cookies.magicianCookies.length; i++) {
//     appContent += `<li>${cookies.magicianCookies[i]}</li>`;
//   }
//   content.innerHTML = appContent;
//   appContent = "";
// });

// filterButton.addEventListener("click", () => {
//   const contentChildren = content.children;
//   filteredCookies = [];

//   for (let children of contentChildren) {
//     if (!children.textContent.includes(filterInput.value)) {
//       filteredCookies.push(children.textContent);
//     }
//   }

//   content.innerHTML = "";
//   for (let i = 0; i < filteredCookies.length; i++) {
//     appContent += `<li>${filteredCookies[i]}</li>`;
//   }
//   content.innerHTML = appContent;
//   filterInput.value = "";
// });
