/*
 *  유틸성 함수들
 * */

const divideElementByClassContains = (els, targetClass) =>
    els.reduce(
        (acc, el) =>
            el.classList.contains(targetClass)
                ? [[...acc[0], el], acc[1]]
                : [acc[0], [...acc[1], el]],

        [[], []]
    );

const delegate = (e, targetQuery, cb) => e.target.closest(targetQuery) && cb(e);

const changeItemsDisplay = (els, display) => {
    els.forEach((item) => {
        item.style.display = display;
    });
};

const sumAll = (arr) => arr.reduce((acc, item) => acc + item, 0);

const getTextBySumComparison = (sum, target) =>
    sum > target
        ? `으로 $${target}를 넘습니다`
        : `으로 $${target}를 넘지 못합니다`;

const getNumberArrayOfElements = (els, targetClass) =>
    els.reduce((acc, item) => {
        const target = item.querySelector(targetClass);
        const num = parseInt(target.innerText, 10);
        acc.push(num);
        return acc;
    }, []);

/*
 * 완존 액션 함수
 * */

const getTargetStoreItem = (filter) => {
    // 반복 로직과 조건 로직을 분리
    // 미리 따로 분리해서 작업 할 수 있도록 반복과 강결합 로직 느슨하게 만들기
    const storeItems = [...document.querySelectorAll(".store-item")];
    if (filter === "all") {
        return [storeItems, []];
    } else {
        return divideElementByClassContains(storeItems, filter);
    }
};

const setSumTailInnerText = (sum) => {
    const sumTailSpan = document.getElementById("sum-tail");
    sumTailSpan.innerText = getTextBySumComparison(sum, 100);
};

const setSumInnerText = (sum) => {
    const sumSpan = document.getElementById("sum");
    sumSpan.innerText = `$${sum}`;
};

const setPriceSum = (els) => {
    const priceArr = getNumberArrayOfElements(els, ".store-item-price"); // 가격 배열 뽑기 액션
    const sum = sumAll(priceArr); // 합치기 계산
    setSumTailInnerText(sum);
    setSumInnerText(sum);
};

const buttonEventHandler = (e) => {
    const filter = e.target.dataset.filter;
    const [showEls, hideEls] = getTargetStoreItem(filter);

    // 필터에 따른 노출 로직
    changeItemsDisplay(showEls, "block");
    changeItemsDisplay(hideEls, "none");

    // 가격 조작 로직
    setPriceSum(showEls);
};

const buttonDelegationEventHandler = (e) =>
    delegate(e, ".filter-btn", buttonEventHandler);

const setButtonEvent = () => {
    const buttonParent = document.querySelector(".filter-btn").parentElement;
    buttonParent.addEventListener("click", buttonDelegationEventHandler);
};

const init = () => {
    setPriceSum([...document.querySelectorAll(".store-item")]);
    setButtonEvent();
};

init();
