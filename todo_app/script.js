const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector(".todo-form");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const clearBtn = document.querySelector(".clear");

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    loadItems();
    updateState();
    todoForm.addEventListener("submit", handleFormSubmit);
    for (let button of filterButtons) {
        button.addEventListener("click", handleFilterSelection);
    }
    clearBtn.addEventListener("click", clear);
}

function clear() {
    todoList.innerHTML = "";
    localStorage.clear("todoItems");

    updateState();
}

function updateState() {
    const isEmpty = todoList.querySelectorAll("li").length === 0;
    const alert = document.querySelector(".alert");
    const filterBtns = document.querySelector(".filter-buttons");

    alert.classList.toggle("d-none", !isEmpty);
    filterBtns.classList.toggle("d-none", isEmpty);
    clearBtn.classList.toggle("d-none", isEmpty);
}

function saveToLocalStorage() {
    const listItems = todoList.querySelectorAll("li");
    const liste = [];

    for (let li of listItems) {
        const id = li.getAttribute("item-id");
        const name = li.querySelector(".item-name").textContent;
        const completed = li.hasAttribute("item-completed");

        liste.push({ id, name, completed });
    }

    localStorage.setItem("todoItems", JSON.stringify(liste));
}

function loadItems() {
    const items = JSON.parse(localStorage.getItem("todoItems")) || [];
    todoList.innerHTML = "";

    for (let item of items) {
        const li = createListItem(item);
        todoList.appendChild(li);
    }
}

function addItems(input) {
    const newItem = createListItem({
        id: generateId(),
        name: input.value,
        completed: false
    });

    todoList.appendChild(newItem);

    input.value = "";

    updatedFilteredItems();

    saveToLocalStorage();

    updateState();
}

function handleFormSubmit(e) {
    e.preventDefault();

    const input = document.getElementById("item_name");

    if (input.value.trim().length === 0) {
        alert("Yeni değer giriniz!");
        return;
    }

    addItems(input);
}

function createListItem(item) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("form-check-input");
    input.checked = item.completed;
    input.addEventListener("change", toggleCompleted);

    const div = document.createElement("div");
    div.textContent = item.name;
    div.classList.add("item-name");
    div.addEventListener("click", openEditMode);
    div.addEventListener("blur", closeEditMode);
    div.addEventListener("keydown", cancelEnter);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fs-3 bi bi-x text-danger delete-icon";
    deleteIcon.addEventListener("click", removeItem);

    const li = document.createElement("li");
    li.setAttribute("item-id", item.id);
    li.className = "border rounded p-3 mb-1";
    li.toggleAttribute("item-completed", item.completed);

    li.appendChild(input);
    li.appendChild(div);
    li.appendChild(deleteIcon);

    return li;
}

function generateId() {
    return Date.now().toString();
}

function toggleCompleted(e) {
    const li = e.target.parentElement;
    li.toggleAttribute("item-completed", e.target.checked);
    console.log(e.target.parentElement);

    updatedFilteredItems();

    saveToLocalStorage();

    updateState();
}

function removeItem(e) {
    const li = e.target.parentElement;
    todoList.removeChild(li);

    saveToLocalStorage();

    updateState();
}

function openEditMode(e) {
    const li = e.target.parentElement;
    if (li.hasAttribute("item-completed") == false) {
        e.target.contentEditable = true;
    }
}

function closeEditMode(e) {
    e.target.contentEditable = false;

    saveToLocalStorage();
}

function cancelEnter(e) {
    if (e.key == "Enter") {
        e.preventDefault();
        closeEditMode(e);
    }
}

function handleFilterSelection(e) {
    const filterBtn = e.target;

    for (let button of filterButtons) {
        button.classList.add("btn-secondary");
        button.classList.remove("btn-primary");
    }

    filterBtn.classList.add("btn-primary");
    filterBtn.classList.remove("btn-secondary");

    filterItems(filterBtn.getAttribute("item-filter"));
}

function filterItems(filterType) {
    const li_items = todoList.querySelectorAll("li");

    for (let li of li_items) {
        li.classList.remove("d-block");
        li.classList.remove("d-none");

        const item_completed = li.hasAttribute("item-completed");

        if (filterType == "completed") {
            li.classList.toggle(item_completed ? "d-flex" : "d-none");
        }
        else if (filterType == "incompleted") {
            li.classList.toggle(item_completed ? "d-none" : "d-flex");
        }
        li.classList.toggle("d-flex");
    }
}

function updatedFilteredItems() {
    const activeFilter = document.querySelector(".btn-primary[item-filter]");
    filterItems(activeFilter.getAttribute("item-filter"));
}