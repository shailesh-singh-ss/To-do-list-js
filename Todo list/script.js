//elements
const addButton = document.querySelector(".todo-button");
const checkedButton = document.querySelector(".checked-button");
const todos = document.querySelector(".todos");
const todoInput = document.querySelector(".todo-input");
const select = document.querySelector("select");

// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
addButton.addEventListener("click", createTodo);
todos.addEventListener("click", checkDelete);
select.addEventListener("click", filter);

// functions
function createTodo(e) {
  e.preventDefault();

  const containerDiv = document.createElement("div");
  const todoDiv = document.createElement("div");
  const checkedButton = document.createElement("button");
  const trashButton = document.createElement("button");

  containerDiv.classList.add("container-div");
  todoDiv.classList.add("todo-div");
  checkedButton.classList.add("checked-button");
  trashButton.classList.add("trash-button");

  checkedButton.innerHTML = '<i class="fas fa-check"></i>';
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';

  todoDiv.innerText = todoInput.value;
  saveLocalStorage(todoInput.value,todoDiv.classList.contains('completed'));

  containerDiv.appendChild(todoDiv);
  containerDiv.appendChild(checkedButton);
  containerDiv.appendChild(trashButton);

  todos.appendChild(containerDiv);
  todoInput.value = "";
}

function checkDelete(e) {
  if (e.target.classList[0] == "checked-button") {
    e.target.parentElement.children[0].classList.toggle("completed");
    e.target.parentElement.classList.toggle("fade");
    putCheckedStatus(e.target.parentElement.children[0].innerText,
      e.target.parentElement.children[0].classList.contains('completed'));
  }
  if (e.target.classList[0] == "trash-button") {
      deleteFromLocalStorage(e.target.parentElement.children[0].innerText);
    e.target.parentElement.classList.add("remove");
    e.target.parentElement.addEventListener("transitionend", function () {
      e.target.parentElement.remove();
    });
  }
}

function filter(e) {
  for (let todo of todos.children) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("fade")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
      case "uncompleted":
        if (todo.classList.contains("fade")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  }
}

function saveLocalStorage(data,checkedStatus) {
  let todo;
  if (localStorage.getItem("todo") === null) {
    todo = [];
  } else {
    todo = localStorage.getItem("todo");
    todo = JSON.parse(todo);
  }
  let fullData={
    value:data,
    checked:checkedStatus
  };
  todo.push(fullData);
  todo = JSON.stringify(todo);
  localStorage.setItem("todo", todo);
}


function getTodos() {
  if (localStorage.getItem("todo") != null) {
    let todoStorage = localStorage.getItem("todo");
    todoStorage = JSON.parse(todoStorage);

    for (let todo of todoStorage) {
      const containerDiv = document.createElement("div");
      const todoDiv = document.createElement("div");
      const checkedButton = document.createElement("button");
      const trashButton = document.createElement("button");

      containerDiv.classList.add("container-div");
      todoDiv.classList.add("todo-div");
      checkedButton.classList.add("checked-button");
      trashButton.classList.add("trash-button");

      checkedButton.innerHTML = '<i class="fas fa-check"></i>';
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';

      todoDiv.innerText = todo.value;
      if(todo.checked){
        todoDiv.classList.add('completed');
        containerDiv.classList.add('fade');
      }
      containerDiv.appendChild(todoDiv);
      containerDiv.appendChild(checkedButton);
      containerDiv.appendChild(trashButton);

      todos.appendChild(containerDiv);
    }
  }
}


function deleteFromLocalStorage(data){
    let storedData=localStorage.getItem('todo');
    storedData=JSON.parse(storedData);
        for(let i of storedData){
            if(i.value==data){
                storedData.splice(storedData.indexOf(i),1);
            }
            localStorage.setItem('todo',JSON.stringify(storedData));
        }
}


function putCheckedStatus(valueData,checkedStatus){
  let todo=localStorage.getItem('todo');
  todo=JSON.parse(todo);
         for(let i of todo){
           if(i.value==valueData){
             i.checked=checkedStatus;
           }
         }
         todo=JSON.stringify(todo);
         localStorage.setItem('todo',todo);
}
