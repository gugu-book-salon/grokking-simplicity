// 당신은 구구 마트에 입사한 신입 개발자입니다
// 취업난 속에서도 취업을 하신 여러분 축하 드립니다

// 사장인 박훌린은 여러분에게 미션을 줍니다
// 여러분들의 선배가 짜놓은 장바구니 추가 페이지에 수량을 같이 넣어서 저장시키고 싶다는 요구입니다
// 신입 사원인 여러분은 함수형 코딩 책에서 배운 것을 바탕으로 리팩트링과 함께 수량 데이터를 추가해서 출력하는 기능 까지 구현하게 됩니다
main();
function main() {
  setEventListener();
}

function setEventListener() {
  setSubmitEvent();
  setClearEvent();
  setRemoveSingleItem();
  document.addEventListener("DOMContentLoaded", displayStorage);
}
function setSubmitEvent() {
  const addItemsAction = document.querySelector(".addItems-action");
  const addItems = document.querySelector(".addItems-input");
  const itemCount = document.querySelector(".itemCount-input");
  const list = document.querySelector(".list");
  const submit = document.querySelector(".addItems-submit");
  submit.addEventListener("click", function (event) {
    addItem(event, addItemsAction, addItems, itemCount, list);
  });
}
// event setting
function setClearEvent() {
  const displayItemsAction = document.querySelector(".displayItems-action");
  const list = document.querySelector(".list");

  const clear = document.querySelector(".displayItems-clear");

  //Clear list
  clear.addEventListener("click", () => {
    removeItems(displayItemsAction, list);
  });
}
function setRemoveSingleItem() {
  const displayItemsAction = document.querySelector(".displayItems-action");
  const list = document.querySelector(".list");

  list.addEventListener("click", function (event) {
    removeSingleItem(event, displayItemsAction, list);
  });
}

// util function

function isNotBrank(str) {
  return str === "";
}
function isError(addItemsValue, itemCount) {
  return !isNotBrank(addItemsValue) || isNaN(itemCount);
}
function resetInputValue(...element) {
  element.forEach((item) => (item.value = ""));
}
function setInnerText(element, text) {
  element.innerText = text;
}
function addClassList(element, className) {
  element.classList.add(className);
}
function setInnerHTML(element, text) {
  element.innerHTML = text;
}
function getLocalStorage(key) {
  console.log(localStorage.getItem(key));
  return localStorage.getItem(key);
}
function getJsonParseLocalStorage(key) {
  return JSON.parse(getLocalStorage(key));
}
function compare(a, b) {
  return a > b;
}

function addItem(event, addItemsAction, addItems, itemCount, list) {
  event.preventDefault();
  const addItemsValue = addItems.value;
  const itemCountValue = itemCount.value;
  if (!isError(addItemsValue, itemCountValue)) {
    showAction(
      addItemsAction,
      "Please add grocery item and grocery count",
      "alert"
    );
    resetInputValue(addItems, itemCount);
    return;
  }
  showAction(addItemsAction, `${addItemsValue} added to the list`, "success");
  createItem(addItemsValue, itemCountValue, list);
  updateStorage(addItemsValue);
  resetInputValue(addItems, itemCount);
}

function showAction(element, text, className) {
  addClassList(element, className);
  setInnerText(element, text);
  setTimeout(function () {
    element.classList.remove(className);
  }, 3000);
}

// create item
function createItem(addItem, itemCnt, list) {
  let parent = document.createElement("div");
  addClassList(parent, "grocery-item");
  setInnerHTML(
    parent,
    `<h4 class="grocery-item__title">${addItem} ${itemCnt}개</h4>
  <a href="#" class="grocery-item__link">
      <i class="far fa-trash-alt"></i>
  </a>`
  );
  list.appendChild(parent);
}

// update storage
function updateStorage(value) {
  let groceryList = getLocalStorage("groceryList")
    ? getJsonParseLocalStorage("groceryList")
    : [];
  groceryList.push(value);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

//display items in local storage
function displayStorage() {
  if (!getLocalStorage("groceryList")) return;

  const storageItems = getJsonParseLocalStorage("groceryList");
  storageItems.forEach(function (element) {
    createItem(element);
  });
}

//remove all items
function removeItems(displayItemsAction, list) {
  //delete from local storage
  localStorage.removeItem("groceryList");
  const items = document.querySelectorAll(".grocery-item");
  if (!compare(items.length, 0)) {
    showAction(displayItemsAction, "No more items to delete", "alert");
    return;
  }

  showAction(displayItemsAction, "All items deleted", "alert");
  items.forEach(function (element) {
    list.removeChild(element);
  });
}

function removeSingleItem(event, displayItemsAction, list) {
  event.preventDefault();

  const link = event.target.parentElement;
  if (!link.classList.contains("grocery-item__link")) return;
  const text = link.previousElementSibling.innerHTML;
  const groceryItem = event.target.parentElement.parentElement;
  list.removeChild(groceryItem);
  showAction(displayItemsAction, `${text} removed from the list`, "success");
  editStorage(text);
  
}

function editStorage(item) {
  const groceryItems = getJsonParseLocalStorage("groceryList");
  const index = groceryItems.indexOf(item);

  groceryItems.splice(index, 1);
  //first delete existing list
  localStorage.removeItem("groceryList");
  //add new updated/edited list
  localStorage.setItem("groceryList", JSON.stringify(groceryItems));
}
