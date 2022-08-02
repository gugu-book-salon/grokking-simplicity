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

const setEventHandler = (id, { eventHandlers, data }) => {
    const el = document.getElementById(id);
    Object.entries(eventHandlers).forEach(([event, handler]) => {
        el.addEventListener(event, (e) => handler(e, data));
    });
};

const setEvent = (data) => {
    Object.entries(data).forEach((arr) => {
        setEventHandler(...arr);
    });
};

const changeArrayToLiString = (data) =>
    data.map((item) => `<li>${item}</li>`).join("");

const setContentInnerHtml = (e, data) => {
    document.getElementById("content").innerHTML = changeArrayToLiString(data);
};

const removeContentChild = () => {
    const content = document.getElementById("content");
    const filterInput = document.getElementById("filter-input");
    const removeOne = [...content.children].find(
        (item) => item.innerText === filterInput.value
    );
    content.removeChild(removeOne);
};

const init = (setting) => {
    setEvent(setting);
};

const filterSetting = {
    all: {
        data: [...assultCookies, ...defensiveCookies, ...magicianCookies],
        eventHandlers: {
            click: setContentInnerHtml
        }
    },
    assult: {
        data: [...assultCookies],
        eventHandlers: {
            click: setContentInnerHtml
        }
    },
    defensive: {
        data: [...defensiveCookies],
        eventHandlers: {
            click: setContentInnerHtml
        }
    },
    magician: {
        data: [...magicianCookies],
        eventHandlers: {
            click: setContentInnerHtml
        }
    },
    "filter-button": {
        data: {},
        eventHandlers: {
            click: removeContentChild
        }
    }
};

init(filterSetting);
