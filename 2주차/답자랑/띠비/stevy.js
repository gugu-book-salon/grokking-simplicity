// 당신은 구구 마트에 입사한 신입 개발자입니다
// 취업난 속에서도 취업을 하신 여러분 축하 드립니다

// PR 1
// 사장인 박훌린은 여러분에게 미션을 줍니다
// 여러분들의 선배가 짜놓은 장바구니 추가 페이지에 수량을 같이 넣어서 저장시키고 싶다는 요구입니다
// 신입 사원인 여러분은 함수형 코딩 책에서 배운 것을 바탕으로 리팩트링과 함께 수량 데이터를 추가해서 출력하는 기능 까지 구현하게 됩니다

const allInputClear = (...inputs) =>
    inputs.forEach((input) => (input.value = ""));

function addItem(event, { addItemsAction, list, input1, input2 }) {
    event.preventDefault();

    const name = input1.value;
    const count = input2.value;

    const isEmpty = name.length === 0 || count.length === 0;

    if (isEmpty) {
        showMessage(addItemsAction, "alert", "Please add grocery item");
    } else {
        showMessage(addItemsAction, "success", `${name} added to the list`);
        createItem(list, name, count);
        updateStorage({ name, count });
    }
    allInputClear(input1, input2);
}

const showMessage = (element, showClass, text) => {
    element.classList.add(showClass);
    element.innerText = text;
    setTimeout(function () {
        element.classList.remove(showClass);
    }, 3000);
};

const groceryItemTmpl = ({ name, count }) => `
  <div>
    <span class="grocery-item__title">${name}</span>
    <span>${count}개</span>
  </div>
  <a href="#" class="grocery-item__link">
    <i class="far fa-trash-alt"></i>
  </a>
`;

function createItem(parent, name, count) {
    let newItemWrapper = document.createElement("div");
    newItemWrapper.classList.add("grocery-item");

    newItemWrapper.innerHTML = groceryItemTmpl({ name, count });

    parent.appendChild(newItemWrapper);
}

function updateStorage(value) {
    const groceryList = localStorage.getItem("groceryList")
        ? JSON.parse(localStorage.getItem("groceryList"))
        : [];

    groceryList.push(value);
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
}

function removeItems(_, { list, displayItemsAction, input1, input2 }) {
    localStorage.removeItem("groceryList");
    let items = document.querySelectorAll(".grocery-item");

    if (items.length > 0) {
        showMessage(displayItemsAction, "success", "All items deleted");
        allInputClear(input1, input2);
        items.forEach((element) => list.removeChild(element));
    } else {
        showMessage(displayItemsAction, "alert", "No more items to delete");
    }
}

function removeSingleItem(event, { list, displayItemsAction, input1, input2 }) {
    event.preventDefault();

    let link = event.target.parentElement;
    if (link.classList.contains("grocery-item__link")) {
        let name = link.previousElementSibling.children[0].innerHTML;

        let groceryItem = event.target.parentElement.parentElement;
        list.removeChild(groceryItem);
        editStorage(name);

        showMessage(displayItemsAction, "success", `${name} removed from the list`);
        allInputClear(input1, input2);
    }
}

function editStorage(name) {
    let groceryItems = JSON.parse(localStorage.getItem("groceryList"));
    let index = groceryItems.findIndex((item) => name === item.name);

    groceryItems.splice(index, 1);
    localStorage.removeItem("groceryList");
    localStorage.setItem("groceryList", JSON.stringify(groceryItems));
}

function displayStorage() {
    const list = document.querySelector(".list");
    let localList = localStorage.getItem("groceryList");

    if (localList) {
        let storageItems = JSON.parse(localList);
        storageItems.forEach((item) => createItem(list, item.name, item.count));
    }
}

const eventSetting = {
    ".addItems-submit": {
        data: {
            list: document.querySelector(".list"),
            addItemsAction: document.querySelector(".addItems-action"),
            input1: document.querySelector("#addItems-input-name"),
            input2: document.querySelector("#addItems-input-count")
        },
        eventHandlers: {
            click: addItem
        }
    },
    ".displayItems-clear": {
        data: {
            list: document.querySelector(".list"),
            displayItemsAction: document.querySelector(".displayItems-action"),
            input1: document.querySelector("#addItems-input-name"),
            input2: document.querySelector("#addItems-input-count")
        },
        eventHandlers: {
            click: removeItems
        }
    },
    ".list": {
        data: {
            list: document.querySelector(".list"),
            displayItemsAction: document.querySelector(".displayItems-action"),
            input1: document.querySelector("#addItems-input-name"),
            input2: document.querySelector("#addItems-input-count")
        },
        eventHandlers: {
            click: removeSingleItem
        }
    }
};

const setEvent = (data) => {
    Object.entries(data).forEach(([query, { eventHandlers, data }]) => {
        const el = document.querySelector(query);
        Object.entries(eventHandlers).forEach(([event, handler]) => {
            el.addEventListener(event, (e) => handler(e, data));
        });
    });
};

const init = ({ eventSetting }) => {
    displayStorage();
    setEvent(eventSetting);
};

init({ eventSetting });
