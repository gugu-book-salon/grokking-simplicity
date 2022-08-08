// https://codesandbox.io/s/dazzling-mcnulty-h5o9dk?file=/src/index.js:0-4305

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

function addItems() {
  const submit = document.querySelector(".addItems-submit");
  submit.addEventListener("click", addItem);
}

addItems();

function clearItems() {
  const clear = document.querySelector(".displayItems-clear");
  clear.addEventListener("click", removeItems);
}

clearItems();

//Check for local storage
document.addEventListener("DOMContentLoaded", displayStorage);

function when(predicate, callback) {
  if (predicate) {
    callback();
  }
}

function executionByCondition(predicate, then, ELSE) {
  if (predicate) {
    then();
  } else {
    ELSE();
  }
}

function withArrayCopy(array, callback) {
  const copy = [...array];
  callback(copy);
}

function push(array, element) {
  return withArrayCopy(array, function (copy) {
    copy.push(element);
  });
}

function createAndUpdateItem(item) {
  createItem(item);
  updateStorage(item);
}

//functions
function addItem(event) {
  event.preventDefault();
  const addItemsAction = document.querySelector(".addItems-action");
  const input = document.querySelector(".addItems-input");
  const list = document.querySelector(".list");
  list.addEventListener("click", removeSingleItem);
  const value = input.value;

  executionByCondition(
    value === "",
    () => {
      showAction(addItemsAction, "Please add grocery item", false);
    },
    () => {
      showAction(addItemsAction, `${value} added to the list`, true);
      createAndUpdate(value);
    }
  );
}

function showAction(element, text, value) {
  element.classList.add(value ? "success" : "alert");
  element.innerText = text;
  setTimeout(function () {
    element.classList.remove(value ? "success" : "alert");
  }, 3000);
}

// create item
function createItem(value) {
  const parent = document.createElement("div");
  parent.classList.add("grocery-item");

  const list = document.querySelector(".list");
  list.addEventListener("click", removeSingleItem);

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

  push(groceryList, value);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

//display items in local storage
function displayStorage() {
  const exists = localStorage.getItem("groceryList");

  when(exists, function () {
    const storageItems = JSON.parse(localStorage.getItem("groceryList"));
    storageItems.forEach(function (element) {
      createItem(element);
    });
  });
}

//remove all items
function removeItems() {
  //delete from local storage
  localStorage.removeItem("groceryList");

  const items = document.querySelectorAll(".grocery-item");

  const displayItemsAction = document.querySelector(".displayItems-action");
  const list = document.querySelector(".list");

  executionByCondition(
    items.length > 0,
    function () {
      showAction(displayItemsAction, "All items deleted", false);
      items.forEach(function (element) {
        list.removeChild(element);
      });
    },
    function () {
      showAction(displayItemsAction, "No more items to delete", false);
    }
  );
}

//remove single item

function removeSingleItem(event) {
  event.preventDefault();
  const list = document.querySelector(".list");

  const displayItemsAction = document.querySelector(".displayItems-action");
  const link = event.target.parentElement;
  list.addEventListener("click", removeSingleItem);

  when(link.classList.contains("grocery-item__link"), function () {
    const text = link.previousElementSibling.innerHTML;
    const groceryItem = event.target.parentElement.parentElement;
    //remove from list

    list.removeChild(groceryItem);
    showAction(displayItemsAction, `${text} removed from the list`, true);

    //remove from local storage
    editStorage(text);
  });
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
