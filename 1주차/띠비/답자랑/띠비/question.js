// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// 문제 링크 : https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-7widdo?file=/src/index.js:0-3354

// const getStoreItemSum = (els) =>
//     // sum이라는 전역변수를 쓰지 않고 reduce를 이용해서 가산하도록 개선
//     els.reduce((acc, item) => {
//         const storeItemPriceEl = item.querySelector(".store-item-price");
//         const price = +storeItemPriceEl.innerText;
//         return acc + price;
//     }, 0);

const getTargetStoreItem = (filter) => {
    // 반복 로직과 조건 로직을 분리
    // 미리 따로 분리해서 작업 할 수 있도록 반복과 강결합 로직 느슨하게 만들기
    const storeItems = document.querySelectorAll(".store-item");
    if (filter === "all") {
        return [[...storeItems], []];
    } else {
        const showEls = [...storeItems].filter((item) =>
            item.classList.contains(filter)
        );
        const hideEls = [...storeItems].filter(
            (item) => !item.classList.contains(filter)
        );
        return [showEls, hideEls];
    }
};

const sumAll = (arr) => arr.reduce((acc, item) => acc + item, 0);

const setSumText = (sum) => {
    // 전역변수를 쓰지 않고 명시적으로 값을 주입을 받아서 사이드 이펙트를 만든다
    const sumSpan = document.getElementById("sum");
    const sumTailSpan = document.getElementById("sum-tail");

    sumSpan.innerText = `$${sum}`;
    sumTailSpan.innerText =
        sum > 100 ? `으로 $100를 넘습니다` : `으로 $100를 넘지 못합니다`;
};

const getStoreItemPriceArray = (els, priceClassName) =>
    els.reduce((acc, item) => {
        const storeItemPriceEl = item.querySelector(priceClassName);
        const price = +storeItemPriceEl.innerText;
        acc.push(price);
        return acc;
    }, []);

const setPriceSum = (els) => {
    const priceArr = getStoreItemPriceArray(els, ".store-item-price"); // 가격 배열 뽑기 액션
    const sum = sumAll(priceArr); // 합치기 계산
    setSumText(sum); // DOM 조작 액션
};

const changeItemsDisplay = (els, display) => {
    els.forEach((item) => {
        item.style.display = display;
    });
}

const setButtonEvent = () => {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            const filter = e.target.dataset.filter;
            const [showEls, hideEls] = getTargetStoreItem(filter);

            // 필터에 따른 노출 로직
            changeItemsDisplay(showEls, "block");
            changeItemsDisplay(hideEls, "none");

            // 가격 조작 로직
            setPriceSum(showEls);
        });
    });
};

const init = () => {
    setPriceSum([...document.querySelectorAll(".store-item")]);
    setButtonEvent();
};

init();
