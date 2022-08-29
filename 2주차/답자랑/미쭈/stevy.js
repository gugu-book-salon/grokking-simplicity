main();

function isEqual(a, b) {
  return a === b;
}

function isQuantityLarger(a, b) {
  return a > b;
}

function setDom(className) {
  return document.createElement(className);
}

function getDom(className) {
  return document.querySelector(className);
}

function getDomAll(className) {
  return document.querySelectorAll(className);
}

function addClassList(element, ...className) {
  element.classList.add(...className);
}

function addInnerText(element, text) {
  element.innerText = text;
}

function addInnerHTML(element, html) {
  element.innerHTML = html;
}

function resetInnerValue(element) {
  element.value = '';
}

function removeClassName(element, className, time) {
  setTimeout(() => {
    element.classList.remove(className);
  }, time);
}

function setLocalSt(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function getLocalSt(key) {
  return JSON.parse(localStorage.getItem(key));
}

function removeLocalSt(key) {
  return localStorage.removeItem(key);
}

function actionType(element, text, type, time) {
  addClassList(element, type);
  addInnerText(element, text);
  removeClassName(element, type, time);
}

function showAction(element, text, isSuccess) {
  if (isSuccess) {
    actionType(element, text, 'success', 3000);
  }
  if (!isSuccess) {
    actionType(element, text, 'alert', 3000);
  }
}

function groceryItemTemplate(quantity, item) {
  return `<span class="grocery-item__count">${quantity}</span>
  <h4 class="grocery-item__title">${item}</h4>
  <a href="#" class="grocery-item__link">
      <i class="far fa-trash-alt"></i>
  </a>`;
}

function createItem(value, list) {
  const parent = setDom('div');
  const item = getLocalSt(value).value;
  const quantity = getLocalSt(value).quantity;
  addClassList(parent, 'grocery-item', `${value}`);
  addInnerHTML(parent, groceryItemTemplate(quantity, item));
  list.appendChild(parent);
}

function updateDom(value, list) {
  const groceryItemDom = getDom(`.grocery-item.${value}`);
  if (groceryItemDom) {
    list.removeChild(groceryItemDom);
    createItem(value, list);
  }
  if (!groceryItemDom) {
    createItem(value, list);
  }
}

function groceryNamesArr() {
  return getLocalSt('groceryName') ?? [];
}

function updateStorage(value) {
  let quantity = 1;
  let groceryNames = groceryNamesArr();
  if (getLocalSt(value)) {
    quantity = getLocalSt(value).quantity += 1;
    setLocalSt(value, { value, quantity });
  }
  if (!getLocalSt(value)) {
    setLocalSt(value, { value, quantity });
    groceryNames.push(value);
  }
  setLocalSt('groceryName', groceryNames);
}

function addItem(list) {
  const addItemsAction = getDom('.addItems-action');
  const input = getDom('.addItems-input');
  const value = input.value;
  if (!isEqual(value, '')) {
    showAction(addItemsAction, `${value} added to the list`, true);
    updateStorage(value);
    updateDom(value, list);
    resetInnerValue(input);
  }
  if (isEqual(value, '')) {
    showAction(addItemsAction, 'Please add grocery item', false);
  }
}

function displayStorage(list) {
  const groceryNames = groceryNamesArr().map((item) => getLocalSt(item));
  groceryNames.forEach((data) => {
    const value = data.value;
    const quantity = data.quantity;
    const parent = setDom('div');
    addClassList(parent, 'grocery-item', `${value}`);
    addInnerHTML(parent, groceryItemTemplate(quantity, value));
    list.appendChild(parent);
  });
}

function removeItems(list, displayItemsAct) {
  const items = getDomAll('.grocery-item');
  if (isQuantityLarger(items.length, 0)) {
    showAction(displayItemsAct, 'All items deleted', false);
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  if (isEqual(items.length, 0)) {
    showAction(displayItemsAct, 'No more items to delete', false);
  }
}

function removeSingleItem(link, list, displayItemsAct) {
  if (link.classList.contains('grocery-item__link')) {
    const text = link.previousElementSibling.innerHTML;
    const groceryItem = link.parentElement;
    let groceryNames = groceryNamesArr();
    removeLocalSt(text);
    if (isQuantityLarger(groceryNames.length, 0)) {
      const filteredName = groceryNames.filter((item) => item !== text);
      setLocalSt('groceryName', filteredName);
    }
    list.removeChild(groceryItem);
    showAction(displayItemsAct, `${text} removed from the list`, true);
  }
}

function clickSubmitItem(list) {
  const submit = getDom('.addItems-submit');
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    addItem(list);
  });
}

function clickRemoveAll(list, displayItemsAct) {
  const displayItemsClear = getDom('.displayItems-clear');
  displayItemsClear.addEventListener('click', () => {
    const groceryNames = groceryNamesArr();
    groceryNames.forEach((item) => removeLocalSt(item));
    removeLocalSt('groceryName');
    removeItems(list, displayItemsAct);
  });
}

function clickRemoveSingle(list, displayItemsAct) {
  list.addEventListener('click', (event) => {
    event.preventDefault();
    const link = event.target.parentElement;
    removeSingleItem(link, list, displayItemsAct);
  });
}

function addClickEvent(list) {
  const displayItemsAct = getDom('.displayItems-action');
  clickSubmitItem(list);
  clickRemoveAll(list, displayItemsAct);
  clickRemoveSingle(list, displayItemsAct);
}

function main() {
  const list = getDom('.list');
  document.addEventListener('DOMContentLoaded', displayStorage(list));
  addClickEvent(list);
}
