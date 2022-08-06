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

function setAppcontent(cookieList) {
  let appContent = cookieList.reduce(
    (acc, current) => acc + `<li>${current}</li>`,
    ""
  );
  return appContent;
}
function cookieRemover(contentChildren, filterInput) {
  let filteredCookies = [];
  [...contentChildren].reduce((acc, current) => {
    if (!current.textContent.includes(filterInput.value))
      filteredCookies.push(current.textContent);
  }, "");
  return filteredCookies;
}

function removeCookie(content) {
  const filterInput = document.getElementById("filter-input");
  const contentChildren = content.children;
  content.innerHTML = setAppcontent(
    cookieRemover(contentChildren, filterInput)
  );
  filterInput.value = "";
}

function filterBtnListner(content) {
  const filterButton = document.getElementById("filter-button");
  filterButton.addEventListener("click", () => {
    removeCookie(content);
  });
}

function cookieListSelctor(type) {
  const cookieTypeDict = {
    assult: assultCookies,
    defensive: defensiveCookies,
    magician: magicianCookies
  };
  if (type === "all") {
    const cookieList = [
      ...assultCookies,
      ...defensiveCookies,
      ...magicianCookies
    ];
    return cookieList;
  } else {
    const cookieList = cookieTypeDict[type];
    return cookieList;
  }
}

function showCookieList(type, content) {
  const cookieList = cookieListSelctor(type);
  cookieRenderer(cookieList, content);
}

function cookieRenderer(cookieDict, content) {
  content.innerHTML = setAppcontent(cookieDict);
}

function cookieTypeListner(content) {
  const cookieTypeBtn = document.querySelector("div#cookie-type-button");
  cookieTypeBtn.addEventListener("click", (event) => {
    const cookieType = event.target.id;
    showCookieList(cookieType, content);
  });
}

function main() {
  const content = document.getElementById("content");
  cookieTypeListner(content);
  filterBtnListner(content);
}

main();
