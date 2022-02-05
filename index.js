let bgMainContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function getTodoListfromlocalstorage() {
    let stringifiedLocalList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedLocalList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListfromlocalstorage();

let todoCount = todoList.length;


function todoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);

    let labelEl = document.getElementById(labelId);

    if (checkboxElement.checked === true) {
        labelEl.classList.add("checking");
    } else {
        labelEl.classList.remove("checking");
    }
    // labelEl.classList.toggle("checking");
}

function createAndAdding(eachItem) {
    let checkboxId = "check" + eachItem.uniqueNo;
    let labelId = "label" + eachItem.uniqueNo;
    let todoId = "del" + eachItem.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    bgMainContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.onclick = function() {
        todoStatusChange(checkboxId, labelId);
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);




    let divContainer = document.createElement("div");
    divContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(divContainer);


    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = eachItem.text;
    divContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    divContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    divContainer.appendChild(deleteIcon);

}

function onDeleteTodo(todoId) {
    let deleteEl = document.getElementById(todoId);
    bgMainContainer.removeChild(deleteEl)
}

for (let eachItem of todoList) {
    createAndAdding(eachItem);
}


function onAddtodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("give input")

    }
    todoCount = todoCount + 1;

    let newtodo = {
        text: userInputValue,
        uniqueNo: todoCount
    };

    todoList.push(newtodo);

    createAndAdding(newtodo);
    userInputElement.value = "";

}

addTodoButton.onclick = function() {
    onAddtodo();
};