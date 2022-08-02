import "./styles.css";

main();

function main() {
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

  const cookieMap = [
    {
      type: "all",
      value: []
    },
    {
      type: "defensive",
      value: defensiveCookies
    },
    {
      type: "magician",
      value: magicianCookies
    },
    {
      type: "assult",
      value: assultCookies
    }
  ];

  getCookies(cookieMap);
  removeCookie();
}

function getInnerText() {
  const content = document.getElementById("content");
  const contentChildren = [...content.children];
  return contentChildren.reduce((acc, cur) => {
    acc.push(cur);
    return acc;
  }, []);
}

function getFilteredCookie(filteredCookie) {
  const newArr = getInnerText();
  return newArr.filter((item) => filteredCookie !== item);
}

function setInnerText(cookies) {
  let newArr = [...cookies];
  const content = document.getElementById("content");
  let appContent = "";

  content.innerHTML = "";
  for (let i = 0; i < cookies.length; i++) {
    newArr.push(cookies[i]);
    appContent += `<li>${cookies[i]}</li>`;
  }
  content.innerHTML = appContent;
  appContent = "";
  return newArr;
}

function pushCookie(filteredCookies) {
  return filteredCookies.reduce((acc, cur) => {
    acc.push(cur);
    return acc;
  }, []);
}

function mergeCookie(cookieMap) {
  let newArr = [];
  cookieMap.forEach((element) => {
    newArr = [...newArr, ...pushCookie(element.value)];
  });
  return newArr;
}

function getCookies(cookieMap) {
  cookieMap.forEach((element) => {
    let newArr = [];
    const button = document.getElementById(element.type);
    button.addEventListener("click", () => {
      newArr =
        element.type === "all"
          ? mergeCookie(cookieMap)
          : pushCookie(element.value);
      setInnerText(newArr);
    });
  });
}

function removeCookie() {
  const filterInput = document.getElementById("filter-input");
  const filterButton = document.getElementById("filter-button");
  let filteredCookies = [];
  filterButton.addEventListener("click", () => {
    filteredCookies = getFilteredCookie(filterInput.value);
    setInnerText(filteredCookies);
  });
}
