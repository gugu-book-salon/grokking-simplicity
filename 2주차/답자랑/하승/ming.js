// https://codesandbox.io/s/hamsuhyeongkoding-2juca-forked-9tyy05?file=/src/index.js

import "./styles.css";

function withArrayCopy(array, modify) {
  let copy = [...array];
  modify(copy);
  return copy;
}

function push(array, element) {
  return withArrayCopy(array, function (copy) {
    copy.push(element);
  });
}

function mergeCookie(cookiesName) {
  const cookies = [];

  cookiesName.forEach(function (cookie) {
    push(cookies, cookie);
  });
}

function compare(a, b) {
  return a === b;
}

function when(predicate, callback) {
  if (predicate) {
    callback();
  }
}
function displayCookie(content, cookiesName) {
  const cookieLists = cookiesName.map(function (cookie) {
    return `<li>${cookie}</li>`;
  });
  content.innerHTML = cookieLists.join("");
}

function displayCookieListByFilter(event, content) {
  const assultCookies = [
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
  ];
  const defensiveCookies = [
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
  ];
  const magicianCookies = [
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
  ];

  const cookiesType = event.target.id;

  const allCookies = mergeCookie([...assultCookies, ...defensiveCookies, ...magicianCookies]);

  const cookieTab = ["all", "assult", "defensive", "magician"];
  const cookieFilter = [allCookies, assultCookies, defensiveCookies, magicianCookies];

  cookieTab.forEach(function (cookie) {
    when(compare(cookiesType, cookie), function () {
      displayCookie(content, cookieFilter[cookieTab.indexOf(cookie)]);
    });
  });
}

function deleteCookie(content) {
  const filteredCookies = [];
  const filterInput = document.getElementById("filter-input");
  const contentChildren = content.children;

  Array.from(contentChildren).forEach(function (children) {
    when(!children.textContent.includes(filterInput.value), function () {
      filteredCookies.push(children.textContent);
    });
  });

  //displayCookie 함수는 이제 2개의 인자를 받음
  displayCookie(content, filteredCookies);
}

function addButtonClickedEventListener(button, eventName, callback) {
  button.addEventListener(eventName, callback);
}

function addClickedButton() {
  const content = document.getElementById("content");
  const cookieList = document.getElementById("cookie-list");
  const filterButton = document.getElementById("filter-button");
  // let appContent = "";
  addButtonClickedEventListener(cookieList, "click", (event) => {
    displayCookieListByFilter(event, content);
  });
  addButtonClickedEventListener(filterButton, "click", () => {
    deleteCookie(content);
  });
}

function main() {
  addClickedButton();
}

main();
