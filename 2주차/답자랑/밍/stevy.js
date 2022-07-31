// 당신은 구구 마트에 입사한 신입 개발자입니다
// 취업난 속에서도 취업을 하신 여러분 축하 드립니다

// PR 1
// 사장인 박훌린은 여러분에게 미션을 줍니다
// 여러분들의 선배가 짜놓은 장바구니 추가 페이지에 수량을 같이 넣어서 저장시키고 싶다는 요구입니다
// 신입 사원인 여러분은 함수형 코딩 책에서 배운 것을 바탕으로 리팩트링과 함께 수량 데이터를 추가해서 출력하는 기능 까지 구현하게 됩니다

// PR2
// 변덕스러운 사장 박훌린은 두번째 미션을 줍니다
// 당장 오늘까지 사원들이 쓸 TODO LIST 를 구현해오라는 미션입니다
// 신입 사원이 여러분들은 고민을 하겠지만 큰 문제가 없습니다 여러분들이 구현한 계층형 설계가 잘된 장바구니 페이지를 이용하면 되니까요!
// 장바구니에는 상품명과 개수가 저장 되었지만 TODO LIST 에는 할일 이름과 마감 시간, 중요도 데이터가 들어가 있습니다
// 장바구니에서 계층화 시킨 함수들을 이용해서 코드 수정을 최소화 하여 TODO LIST를 구현해주세요

function getInputValue() {
  const input = document.querySelector('.addItems-input');
  return input.value;
}

function resetInputValue() {
  const input = document.querySelector('.addItems-input');
  input.value = '';
}

function setInnerText(element, text) {
  element.innerText = text;
  return element;
}

function addClass(element, className) {
  element.classList.add(className);
  return element;
}

function removeClass(element, className) {
  element.classList.remove(className);
  return element;
}

function manageClass(className) {
  return function (element) {
    return {
      addClassName: () => addClass(element, className),
      removeClassName: () => removeClass(element, className)
    };
  };
}

function isClassContains(element, findClass) {
  return element.classList.contains(findClass);
}

function manageLocalStorage(key) {
  return {
    set: (value) => {
      localStorage.setItem(key, value);
    },
    get: (defaultValue) => {
      const value = localStorage.getItem(key);
      return value ? value : defaultValue;
    },
    clear: () => {
      localStorage.removeItem(key);
    },
  };
}

const manageSuccessClass = manageClass('success');
const manageAlertClass = manageClass('alert');

function submitButtonClickHandler(listElement) {
  return function (event) {
    event.preventDefault();
    const inputValue = getInputValue();

    addItemElement(listElement, inputValue);
    setCreateShowAction(inputValue);

    const itemList = updateStorage(inputValue);
    setItemCount(itemList.length);
  };
}

function loadEventHandler(listElement) {
  return function() {
    const itemList = displayStorage(listElement);
    setItemCount(itemList.length);
  };
}

function clearButtonClickHandler(listElement) {
  return function () {
    const itemListCount = removeItems(listElement);
    setItemCount(itemListCount);
  };
}

function listItemClickHandler(listElement) {
  return function (event) {
    event.preventDefault();
    const element = findListItemElement(event.target);
    const groceryListLoacalStorageManager = manageLocalStorage('groceryList');
    const currentLocalStorageItems = JSON.parse(groceryListLoacalStorageManager.get('[]'));
    const text = element.textContent.trim();
    const newItems = currentLocalStorageItems.filter((item) => item !== text);

    listElement.removeChild(element);
    setRemoveShowAction(text, true);
    setItemCount(newItems.length);

    groceryListLoacalStorageManager.set(JSON.stringify(newItems));
  }
}


function showAction(element, text, isSuccess) {
  const { addClassName, removeClassName } = (isSuccess ? manageSuccessClass : manageAlertClass)(
    element
  );

  addClassName();
  setTimeout(removeClassName, 3000);
  setInnerText(element, text);
  resetInputValue();
}

/**
 * @param {(value: any) => boolean} predicate
 * @param {{ onSuccess: string, onFail: string }} messages 성공 실패 메세지
 * @returns [string, boolean] -> [show action 텍스트, 성공 실패 여부]
 */
function getShowActionParameters(predicate, messages) {
  return predicate()
    ? [messages.onFail, false]
    : [messages.onSuccess, true];
}

function setCreateShowAction(value) {
  const addItemsActionElement = document.querySelector('.addItems-action');
  const messages = { onSuccess: `${value} added to the list`, onFail: 'Please add grocery item'};
  const params = getShowActionParameters(() => value === '', messages);

  showAction(...[addItemsActionElement, ...params]);
}

function setItemCount(count) {
  setInnerText(
    document.querySelector('.displayItems-count'),
    `(${count})`
  );
}

function setRemoveShowAction(value, isSingle) {
  const displayItemsActionElement = document.querySelector('.displayItems-action');

  if (isSingle) {
    showAction(displayItemsActionElement, `${value} removed from the list`, true);
    return;
  }

  const messages = { onSuccess: 'All items deleted', onFail: 'No more items to delete' };
  const params = getShowActionParameters(() => value <= 0, messages);

  showAction(...[displayItemsActionElement, ...params]);
}

function addItemElement(list, value) {
  value !== '' && list.appendChild(createItemElement(value));
}

function createItemElement(value) {
  const element = addClass(document.createElement('div'), 'grocery-item');
  element.innerHTML = `
    <h4 class='grocery-item__title'>${value}</h4>
    <a href='#' class='grocery-item__link'>
      <i class='far fa-trash-alt'></i>
    </a>
  `;
  return element;
}

function updateStorage(value) {
  const groceryListLoacalStorageManager = manageLocalStorage('groceryList');
  const groceryList = JSON.parse(groceryListLoacalStorageManager.get('[]'));
  groceryList.push(value);
  groceryListLoacalStorageManager.set(JSON.stringify(groceryList));
  return groceryList;
}

function displayStorage(listElement) {
  const storageItems = JSON.parse(manageLocalStorage('groceryList').get('[]'));
  storageItems
    .forEach((storageItem) => addItemElement(listElement, storageItem));
  return storageItems;
}

function removeItems(listElement) {
  const groceryListLoacalStorageManager = manageLocalStorage('groceryList');
  const groceryListItemElements = document.querySelectorAll('.grocery-item');

  setRemoveShowAction(groceryListItemElements.length);
  groceryListLoacalStorageManager.clear();
  groceryListItemElements.forEach((groceryListItemElement) => listElement.removeChild(groceryListItemElement));

  return 0;
}

function findListItemElement(element) {
  let findElement = element;
  while (!isClassContains(findElement, 'grocery-item')) {
    findElement = element.parentElement;
  }
  return findElement;
}

function init() {
  const submit = document.querySelector('.addItems-submit');
  const list = document.querySelector('.list');
  const clear = document.querySelector('.displayItems-clear');

  submit.addEventListener('click', submitButtonClickHandler(list));
  document.addEventListener('DOMContentLoaded', loadEventHandler(list));
  clear.addEventListener('click', clearButtonClickHandler(list));
  list.addEventListener('click', listItemClickHandler(list));
}

init();