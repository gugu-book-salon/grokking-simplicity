import "./styles.css";

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
  "딸기맛 쿠키"
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

function getListItemFromText(text) {
  return `<li>${text}</li>`;
}

function getCookieListItems(cookies) {
  return cookies.reduce(
    (content, cookie) => content + getListItemFromText(cookie),
    "",
  );
}

function setAppContentByCookieListItem(cookies) {
  const content = document.getElementById("content");
  content.innerHTML = getCookieListItems(cookies);
  return cookies;
}

function getAllCookies(...cookieArrays) {
  return cookieArrays.reduce(
    (allCookies, cookieArray) => [...allCookies, ...cookieArray],
    [],
  );
}

function applyClickEventHandler({ element, handler }) {
  element.addEventListener('click', handler);
}

function getTextContentFromElement(element) {
  return element.textContent;
}

function getCurrentCookies() {
  const content = document.getElementById("content");
  const contentChildren = [...content.children];
  return contentChildren.map(getTextContentFromElement);
}

function getFilterInputValue() {
  const filterInput = document.getElementById("filter-input");
  return filterInput.value;
};

function getFilterdCookies() {
  const filterInputValue = getFilterInputValue();
  const currentCookies = getCurrentCookies();
  return currentCookies.filter((cookie) => !cookie.includes(filterInputValue));
}

function init() {
  [
    {
      button: document.getElementById("all"),
      getCookies: () => getAllCookies(assultCookies, defensiveCookies, magicianCookies),
    },
    {
      button: document.getElementById("assult"),
      getCookies: () => assultCookies,
    },
    {
      button: document.getElementById("defensive"),
      getCookies: () => defensiveCookies,
    },
    {
      button: document.getElementById("magician"),
      getCookies: () => magicianCookies,
    },
    {
      button: document.getElementById("filter-button"),
      getCookies: getFilterdCookies,
    },
  ]
  .map(({ button, getCookies }) => ({
    button,
    handler: () => setAppContentByCookieListItem(getCookies()),
  }))
  .forEach(applyClickEventHandler);
}

init();
