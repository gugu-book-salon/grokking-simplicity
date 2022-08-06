// https://codesandbox.io/s/dazzling-mcnulty-h5o9dk?file=/src/index.js:0-4305

// 당신은 구구 마트에 입사한 신입 개발자입니다
// 취업난 속에서도 취업을 하신 여러분 축하 드립니다

// PR 1
// 사장인 박훌린은 여러분에게 미션을 줍니다
// 여러분들의 선배가 짜놓은 장바구니 추가 페이지에 수량을 같이 넣어서 저장시키고 싶다는 요구입니다
// 신입 사원인 여러분은 함수형 코딩 책에서 배운 것을 바탕으로 리팩트링과 함께 수량 데이터를 추가해서 출력하는 기능 까지 구현하게 됩니다

function editStorage(item) {
  const groceryItems = JSON.parse(getStorageItmes("groceryList"));
  const index = groceryItems.indexOf(item);

  groceryItems.splice(index, 1);
  //first delete existing list
  removeStorageItems("groceryList");
  //add new updated/edited list
  setStorageItems("groceryList", JSON.stringify(groceryItems));
}

// dom parse
function parseStringToElement(text, mimeType) {
  if (!text) {
    return "첫번째 인자에 문자열이 포함되어야 합니다.";
  }

  const parser = new DOMParser();
  const parsedElement = parser.parseFromString(text, mimeType ?? "text/html");

  return parsedElement.body.firstChild;
}

// append to element
function appendTo(parent, element) {
  parent.appendChild(element);

  return element;
}

// add event to element
function addEventToSpecificElement(element, selector, eventName, cb) {
  const selectedElement = element.querySelector(selector);
  selectedElement.addEventListener(eventName, cb);

  return element;
}

// is localStorage key valid
function hasStorageValidItems(key) {
  return !!getStorageItmes(key);
}

// get storage items
function getStorageItmes(key) {
  return localStorage.getItem(key);
}

// set storage items
function setStorageItems(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

// remove storage items
function removeStorageItems(key) {
  return localStorage.removeItem(key);
}

// update storage
function updateStorage(key, value) {
  const list = getStorageItmes(key) ? JSON.parse(getStorageItmes(key)) : [];

  list.push(value);
  setStorageItems(key, list);
}

// just main.
function main() {
  // const addItemsAction = document.querySelector(".addItems-action");
  const addItemForm = document.querySelector("form#add-items");

  //Display items container
  const clear = document.querySelector(".displayItems-clear");

  addItemForm.addEventListener("submit", submitItems);
  clear.addEventListener("click", removeAllItems);
  document.addEventListener("DOMContentLoaded", displayStorage);
}

// submit event
function submitItems(event) {
  event.preventDefault();
  const { itemName, quantity } = event.target.elements;

  if (itemName.value && typeof Number(quantity.value) === "number") {
    createItems(itemName.value, quantity.value);
  } else {
    showAction(".addItems-action", "Please add grocery item", false);
  }
}

//display items in local storage
function displayStorage() {
  const exists = hasStorageValidItems("groceryList");

  if (exists) {
    const storageItems = JSON.stringify(getStorageItmes("groceryList"));
    storageItems.forEach(function (item) {
      createItems(item.name, item.quantity);
    });
  }
}

function showAction(selector, text, value) {
  const element = document.querySelector(selector);

  if (!element) {
    return "you cannot change state from non-dom items.";
  }

  if (value === true) {
    element.classList.add("success");
    element.innerText = text;

    setTimeout(function () {
      element.classList.remove("success");
    }, 3000);
  } else {
    element.classList.add("alert");
    element.innerText = text;

    setTimeout(function () {
      element.classList.remove("alert");
    }, 3000);
  }
}

function createItems(name, quantity) {
  const list = document.querySelector(".list");
  const createdElement = parseStringToElement(`
      <div class="grocery-item">
        <h4 class="grocery-item__title">${name} (${quantity})개</h4>
        <a href="#" class="grocery-item__link">
          <i class="far fa-trash-alt"></i>
        </a>
      </div>
      `);

  addEventToSpecificElement(
    appendTo(list, createdElement),
    "a.grocery-item__link",
    "click",
    removeItem
  );
  updateStorage("groceryList", {
    name,
    quantity,
  });
  showAction(
    ".addItems-action",
    `${name} (${quantity})개 added to the list`,
    true
  );
}

//remove all items
function removeAllItems() {
  const list = document.querySelector(".list");

  //delete from local storage
  removeStorageItems("groceryList");
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    //remove each item from the list
    showAction(".displayItems-action", "All items deleted", false);
    items.forEach(function (element) {
      list.removeChild(element);
    });
  } else {
    showAction(".displayItems-action", "No more items to delete", false);
  }
}

//remove single item
function removeItem(event) {
  event.preventDefault();
  const list = document.querySelector(".list");

  const link = event.target.parentElement;
  if (link.classList.contains("grocery-item__link")) {
    const text = link.previousElementSibling.innerHTML;
    const groceryItem = event.target.parentElement.parentElement;
    //remove from list

    list.removeChild(groceryItem);
    showAction(".displayItems-action", `${text} removed from the list`, true);

    //remove from local storage
    editStorage(text);
  }
}

main();
