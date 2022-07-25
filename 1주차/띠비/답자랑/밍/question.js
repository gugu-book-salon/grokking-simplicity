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
  }
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
  }
}

function setInnerText(text) {
  return function (element) {
    element.innerText = text;
  }
}

function setStyle(key, val) {
  return function (element) {
    element.style[key] = val;
  }
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
  }
}

function setPriceInnerText(sumSpan) {
  return function (price) {
    setInnerText(`$${price}`)(sumSpan);
    return price;
  }
}
function setAllText(price, sumSpan, sumTailSpan) {
  setPriceInnerText(sumSpan)(
    setInnerTextByTotalPrice(sumTailSpan)(
      price,
    ),
  )
}

function isAllFilter(filter) {
  return filter === 'all';
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
  })
}

function getPriceFromStoreItem(storeItems, filter) {
  return getTotalStoreItemPrice(
    storeItems
      .filter((storeItem) => isAllFilter(filter) || isClassNameInclude(storeItem, filter))
      .map((storeItem) => getElement(storeItem)('.store-item-price'))
  );
}

function clickEventHandler(storeItems, sumSpan, sumTailSpan) {
  return function (event) {
    const filter = event.target.dataset.filter;
    setDisplayByClassName(storeItems, filter);
    setAllText(getPriceFromStoreItem(storeItems, filter), sumSpan, sumTailSpan);
  }
}

const check100Price = checkPrice(100);
const set100OverText = setInnerText('으로 $100를 넘습니다');
const set100UnderText = setInnerText('으로 $100를 넘지 못합니다');

const setDisplayBlock = setStyle('display', 'block');
const setDisplayNone = setStyle('display', 'none');

function init(elements) {
  setAllText(
    getTotalStoreItemPrice(elements.totalItemPriceElement),
    elements.sumSpan,
    elements.sumTailSpan,
  );
  elements.buttons.forEach(function (button) {
    button.addEventListener(
      'click',
      clickEventHandler(
        elements.storeItems,
        elements.sumSpan,
        elements.sumTailSpan,
      ),
    );
  });
}

init(
  {
    sumSpan: getElementFromDocument("#sum"),
    sumTailSpan: getElementFromDocument("#sum-tail"),
    totalItemPriceElement: getElements(".store-item-price"),
    buttons: getElements(".filter-btn"),
    storeItems: getElements(".store-item"),
  }
);