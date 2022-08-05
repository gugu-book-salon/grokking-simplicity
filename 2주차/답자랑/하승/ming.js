// https://codesandbox.io/s/hamsuhyeongkoding-2juca-forked-9tyy05?file=/src/index.js

import "./styles.css";

const cookies = [];
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
    "용감한 쿠키"
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
    "마법사맛 쿠키"
];
let filteredCookies = [];

function mergeCookie() {
    for (let i = 0; i < assultCookies.length; i++) {
        cookies.push(assultCookies[i]);
    }
    for (let i = 0; i < defensiveCookies.length; i++) {
        cookies.push(defensiveCookies[i]);
    }
    for (let i = 0; i < magicianCookies.length; i++) {
        cookies.push(magicianCookies[i]);
    }
}

const content = document.getElementById("content");
const allButton = document.getElementById("all");
const assultButton = document.getElementById("assult");
const defensiveButton = document.getElementById("defensive");
const magicianButton = document.getElementById("magician");
const filterInput = document.getElementById("filter-input");
const filterButton = document.getElementById("filter-button");

let appContent = "";

allButton.addEventListener("click", () => {
    mergeCookie();
    content.innerHTML = "";
    for (let i = 0; i < cookies.length; i++) {
        filteredCookies.push(cookies[i]);
        appContent += `<li>${cookies[i]}</li>`;
    }
    content.innerHTML = appContent;
    appContent = "";
});

assultButton.addEventListener("click", () => {
    content.innerHTML = "";
    for (let i = 0; i < assultCookies.length; i++) {
        filteredCookies.push(cookies[i]);
        appContent += `<li>${assultCookies[i]}</li>`;
    }
    content.innerHTML = appContent;
    appContent = "";
});

defensiveButton.addEventListener("click", () => {
    content.innerHTML = "";
    for (let i = 0; i < defensiveCookies.length; i++) {
        filteredCookies.push(cookies[i]);
        appContent += `<li>${defensiveCookies[i]}</li>`;
    }
    content.innerHTML = appContent;
    appContent = "";
});

magicianButton.addEventListener("click", () => {
    content.innerHTML = "";
    for (let i = 0; i < magicianCookies.length; i++) {
        appContent += `<li>${magicianCookies[i]}</li>`;
    }
    content.innerHTML = appContent;
    appContent = "";
});

filterButton.addEventListener("click", () => {
    const contentChildren = content.children;
    filteredCookies = [];

    for (let children of contentChildren) {
        if (!children.textContent.includes(filterInput.value)) {
            filteredCookies.push(children.textContent);
        }
    }

    content.innerHTML = "";
    for (let i = 0; i < filteredCookies.length; i++) {
        appContent += `<li>${filteredCookies[i]}</li>`;
    }
    content.innerHTML = appContent;
    filterInput.value = "";
});
