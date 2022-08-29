// https://codesandbox.io/s/dogsyal-2juca-bulbyeonseong-forked-11yych?file=/src/index.js:0-2730

import './styles.css';

const assultCookies = [
  '크런치초코칩 쿠키',
  '다크카카오 쿠키',
  '실론나이트 쿠키',
  '마라맛 쿠키',
  '라즈베리맛 쿠키',
  '벨벳케이크맛 쿠키',
  '구미호맛 쿠키',
  '자색고구마맛 쿠키',
  '다크초코 쿠키',
  '웨어울프맛 쿠키',
  '근육맛 쿠키',
  '공주맛 쿠키',
  '용감한 쿠키',
];

const defensiveCookies = [
  '휘낭시에맛 쿠키',
  '와일드베리맛 쿠키',
  '코코아맛 쿠키',
  '달토끼맛 쿠키',
  '홀리베리 쿠키',
  '딸기크레페맛 쿠키',
  '마들렌맛 쿠키',
  '우유맛 쿠키',
  '아보카도맛 쿠키',
  '용사맛 쿠키',
  '딸기맛 쿠키',
];

const magicianCookies = [
  '클로티드 크림 쿠키',
  '서리여왕 쿠키',
  '펌킨파이맛 쿠키',
  '오징어먹물맛 쿠키',
  '망고맛 쿠키',
  '악마맛 쿠키',
  '라떼맛 쿠키',
  '에스프레소맛 쿠키',
  '감초맛 쿠키',
  '눈설탕맛 쿠키',
  '마법사맛 쿠키',
];

main();

function isEqual(a, b) {
  return a === b;
}

function renderCookieList(content, cookieTypes) {
  const cookieList = cookieTypes
    .map((cookie) => `<li>${cookie}</li>`)
    .reduce((pre, cur) => pre + cur);
  content.innerHTML = cookieList;
}

function renderCookieListByMenu(target, content) {
  const cookieListAll = [
    ...assultCookies,
    ...defensiveCookies,
    ...magicianCookies,
  ];
  const menu = ['all', 'assult', 'defensive', 'magician'];
  const list = [
    cookieListAll,
    assultCookies,
    defensiveCookies,
    magicianCookies,
  ];
  menu.forEach((item, index) => {
    if (isEqual(target, item)) {
      renderCookieList(content, list[index]);
    }
  });
}

function filteredCookieArray(contentChildren, filterInput) {
  let cookiesList = [];
  const filteredCookies = [...contentChildren].filter(
    (cookie) => !cookie.textContent.includes(filterInput.value)
  );
  filteredCookies.forEach((cookie) => cookiesList.push(cookie.innerText));
  return cookiesList;
}

function removeSpecifiedCookieName(content) {
  const filterInput = document.getElementById('filter-input');
  const contentChildren = content.children;
  let filteredCookies = filteredCookieArray(contentChildren, filterInput);
  renderCookieList(content, filteredCookies);
  filterInput.value = '';
}

function addClickEventButton() {
  const content = document.getElementById('content');
  const cookieBtnGroup = document.querySelector('.cookie-btn-group');
  const filterButton = document.getElementById('filter-button');
  cookieBtnGroup.addEventListener('click', (event) => {
    let target = event.target.id;
    renderCookieListByMenu(target, content);
  });
  filterButton.addEventListener('click', () => {
    removeSpecifiedCookieName(content);
  });
}

function main() {
  addClickEventButton();
}
