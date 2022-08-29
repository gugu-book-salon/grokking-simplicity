// 구현 조건
// 전역변수를 쓰지마세요
// 암묵적 할당을 하지마세요
// 반복되는 코드는 삼가주세요
// 문제 링크 : https://codesandbox.io/s/hamsuhyeongkoding-1juca-ddibi-7widdo?file=/src/index.js:0-3354

function getElements(selector) {
  return [...document.querySelectorAll(selector)];
}

function getElement(element) {
  return function (selector) {
    return element.querySelector(selector);
  };
}

const getElementFromDocument = getElement(document);

function add(a, b) {
  return a + b;
}

function getTotalPrice(prices) {
  return prices.reduce(add, 0);
}

function getTotalStoreItemPrice(elements) {
  return getTotalPrice(elements.map((element) => Number(element.innerText)));
}

function checkPrice(limit) {
  return function (price) {
    return price > limit;
  };
}

function setInnerText(text) {
  return function (element) {
    element.innerText = text;
  };
}

function setStyle(key, val) {
  return function (element) {
    element.style[key] = val;
  };
}

function checkClassList(element, findClass) {
  return element.classList.contains(findClass);
}

function setInnerTextByTotalPrice(element) {
  return function (totalPrice) {
    if (check100Price(totalPrice)) {
      set100OverText(element);
    } else {
      set100UnderText(element);
    }

    return totalPrice;
  };
}

function setPriceInnerText(sumSpan) {
  return function (price) {
    setInnerText(`$${price}`)(sumSpan);
    return price;
  };
}

function setAllText(price, sumSpan, sumTailSpan) {
  // FIXME
  // pipe를 쓰면 로직 명확하지만 변수에 대입을해 사용 할 경우
  // 뭔가 함수 이름이 애매해짐
  // setInnerTextByTotalPrice 함수는 계산된 totalPrice를 그대로 반환하고 있음
  setPriceInnerText(sumSpan)(setInnerTextByTotalPrice(sumTailSpan)(price));
}

function isAllFilter(filter) {
  return filter === "all";
}

function isClassNameInclude(element, className) {
  return element.classList.contains(className);
}

function setDisplayByClassName(storeItems, filter) {
  storeItems.forEach((storeItem) => {
    if (isAllFilter(filter) || isClassNameInclude(storeItem, filter)) {
      setDisplayBlock(storeItem);
      return;
    }
    setDisplayNone(storeItem);
  });
}

function getPriceFromStoreItem(storeItems, filter) {
  return getTotalStoreItemPrice(
    storeItems
      .filter(
        (storeItem) =>
          isAllFilter(filter) || isClassNameInclude(storeItem, filter)
      )
      .map((storeItem) => getElement(storeItem)(".store-item-price"))
  );
}

function clickEventHandler(event, storeItems, setAllTextByPrice) {
  const filter = event.target.dataset.filter;
  setDisplayByClassName(storeItems, filter);
  setAllTextByPrice(getPriceFromStoreItem(storeItems, filter));
}

const check100Price = checkPrice(100);
const set100OverText = setInnerText("으로 $100를 넘습니다");
const set100UnderText = setInnerText("으로 $100를 넘지 못합니다");

const setDisplayBlock = setStyle("display", "block");
const setDisplayNone = setStyle("display", "none");

function init(elements) {
  function setAllTextByPrice(price) {
    return setAllText(price, elements.sumSpan, elements.sumTailSpan);
  }
  const totalPrice = getTotalStoreItemPrice(elements.totalItemPriceElement);
  setAllTextByPrice(totalPrice);
  elements.buttonContainer.addEventListener("click", (event) => {
    if (event.target.closest(".filter-btn")) {
      clickEventHandler(event, elements.storeItems, setAllTextByPrice);
    }
  });
}

init({
  sumSpan: getElementFromDocument("#sum"),
  sumTailSpan: getElementFromDocument("#sum-tail"),
  totalItemPriceElement: getElements(".store-item-price"),
  buttonContainer: getElementFromDocument(".filter-btn").parentElement,
  storeItems: getElements(".store-item")
});
