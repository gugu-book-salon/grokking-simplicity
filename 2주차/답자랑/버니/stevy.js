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

const addItemsAction = document.querySelector(".addItems-action");
const input = document.querySelector(".addItems-input");
const submit = document.querySelector(".addItems-submit");

//Display items container
const list = document.querySelector(".list");
const displayItemsAction = document.querySelector(".displayItems-action");
const clear = document.querySelector(".displayItems-clear");

//Add event listeners
//Submit listener
submit.addEventListener("click", addItem);
//Check for local storage
document.addEventListener("DOMContentLoaded", displayStorage);
//Clear list
clear.addEventListener("click", removeItems);
//Listen to list to delete individual items
list.addEventListener("click", removeSingleItem);

//functions
function addItem(event) {
  event.preventDefault();
  let value = input.value;
  if (value === "") {
    showAction(addItemsAction, "Please add grocery item", false);
  } else {
    showAction(addItemsAction, `${value} added to the list`, true);
    createItem(value);
    updateStorage(value);
  }
}

function showAction(element, text, value) {
  if (value === true) {
    element.classList.add("success");
    element.innerText = text;
    input.value = "";
    setTimeout(function () {
      element.classList.remove("success");
    }, 3000);
  } else {
    element.classList.add("alert");
    element.innerText = text;
    input.value = "";
    setTimeout(function () {
      element.classList.remove("alert");
    }, 3000);
  }
}

// create item
function createItem(value) {
  let parent = document.createElement("div");
  parent.classList.add("grocery-item");

  // let title = document.createElement('h4');
  //     title.classList.add('grocery-item__title');

  parent.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
    <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
    </a>`;

  list.appendChild(parent);
}

//update storage
function updateStorage(value) {
  let groceryList;

  groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];

  groceryList.push(value);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

//display items in local storage
function displayStorage() {
  let exists = localStorage.getItem("groceryList");

  if (exists) {
    let storageItems = JSON.parse(localStorage.getItem("groceryList"));
    storageItems.forEach(function (element) {
      createItem(element);
    });
  }
}

//remove all items
function removeItems() {
  //delete from local storage
  localStorage.removeItem("groceryList");
  let items = document.querySelectorAll(".grocery-item");

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
  event.preventDefault();

  let link = event.target.parentElement;
  if (link.classList.contains("grocery-item__link")) {
    let text = link.previousElementSibling.innerHTML;
    let groceryItem = event.target.parentElement.parentElement;
    //remove from list

    list.removeChild(groceryItem);
    showAction(displayItemsAction, `${text} removed from the list`, true);

    //remove from local storage
    editStorage(text);
  }
}

function editStorage(item) {
  let groceryItems = JSON.parse(localStorage.getItem("groceryList"));
  let index = groceryItems.indexOf(item);

  groceryItems.splice(index, 1);
  //first delete existing list
  localStorage.removeItem("groceryList");
  //add new updated/edited list
  localStorage.setItem("groceryList", JSON.stringify(groceryItems));
}
