// 당신은 구구 마트에 입사한 신입 개발자입니다
// 취업난 속에서도 취업을 하신 여러분 축하 드립니다

// 사장인 박훌린은 여러분에게 미션을 줍니다
// 여러분들의 선배가 짜놓은 장바구니 추가 페이지에 수량을 같이 넣어서 저장시키고 싶다는 요구입니다
// 신입 사원인 여러분은 함수형 코딩 책에서 배운 것을 바탕으로 리팩트링과 함께 수량 데이터를 추가해서 출력하는 기능 까지 구현하게 됩니다

// const addItemsAction = document.querySelector(".addItems-action");
// const input = document.querySelector(".addItems-input");
// const submit = document.querySelector(".addItems-submit");

//Display items container
// const list = document.querySelector(".list");
// const displayItemsAction = document.querySelector(".displayItems-action");
// const clear = document.querySelector(".displayItems-clear");

//Add event listeners
function setEventListnets() {
  const submit = document.querySelector(".addItems-submit");
  const list = document.querySelector(".list");
  const displayItemsAction = document.querySelector(".displayItems-action");
  const clear = document.querySelector(".displayItems-clear");
  submit.addEventListener("click", addItem);
  //Check for local storage
  document.addEventListener("DOMContentLoaded", displayStorage);
  //Clear list
  clear.addEventListener("click", removeItems);
  //Listen to list to delete individual items
  list.addEventListener("click", removeSingleItem);
}
//Submit listener

//functions
function addItem(event) {
  event.preventDefault();
  const input = document.querySelector(".addItems-input");
  const value = input.value;
  if (value === "") {
    showAction(addItemsAction, "Please add grocery item", false);
  } else {
    showAction(addItemsAction, `${value} added to the list`, true);
    createItem(value);
    updateStorage(value);
  }
}

function setClassList(element, value) {
  element.classList.add(value ? "success" : "alert");
}

function setInnerText(element, text) {
  element.innerHTML = text;
}

function showAction(element, text, value) {
  setClassList(element, value);
  setInnerText(element, text);
  setTimeout(function () {
    element.classList.remove(value ? "success" : "alert");
  }, 3000);
}

// create item
function createItem(value) {
  const list = document.querySelector(".list");
  const parent = document.createElement("div");
  parent.classList.add("grocery-item");
  parent.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
    <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
    </a>`;
  list.appendChild(parent);
}

//update storage
function updateStorage(value) {
  const groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];
  groceryList.push(value);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

//display items in local storage
function displayStorage() {
  const exists = localStorage.getItem("groceryList");
  if (exists) {
    const storageItems = JSON.parse(localStorage.getItem("groceryList"));
    storageItems.forEach(function (element) {
      createItem(element);
    });
  }
}

//remove all items
function removeItems() {
  //delete from local storage
  const list = document.querySelector(".list");
  localStorage.removeItem("groceryList");
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    //remove each item from the list
    showAction(displayItemsAction, "All items deleted", false);
    items.forEach(function (element) {
      list.removeChild(element);
    });
  } else {
    showAction(displayItemsAction, "No more items to delete", false);
  }
}

//remove single item

function removeSingleItem(event) {
  const list = document.querySelector(".list");
  event.preventDefault();
  const link = event.target.parentElement;
  if (link.classList.contains("grocery-item__link")) {
    const text = link.previousElementSibling.innerHTML;
    const groceryItem = event.target.parentElement.parentElement;
    //remove from list
    list.removeChild(groceryItem);
    showAction(displayItemsAction, `${text} removed from the list`, true);
    //remove from local storage
    editStorage(text);
  }
}

function editStorage(item) {
  const groceryItems = JSON.parse(localStorage.getItem("groceryList"));
  const index = groceryItems.indexOf(item);

  groceryItems.splice(index, 1);
  //first delete existing list
  localStorage.removeItem("groceryList");
  //add new updated/edited list
  localStorage.setItem("groceryList", JSON.stringify(groceryItems));
}

function main() {
  setEventListnets();
}
