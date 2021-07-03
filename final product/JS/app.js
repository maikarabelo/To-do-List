const input_todo = document.getElementById('inputtodo');
const todobutton = document.getElementById('to_do_btn');
const filterTodo = document.querySelector('.filter-todo');
const todo_list = document.querySelector('.todo-list');
const search_btn = document.getElementById('fa');


document.addEventListener("DOMContentLoaded", getTodos);
todobutton.addEventListener('click', addTodo);
todo_list.addEventListener('click', deleteCheck);
filterTodo.addEventListener('click', filtertodo);
search_btn.addEventListener('click', search_vent);





function addTodo(event) {



    //preventing form from submitting
    event.preventDefault();

    //to do div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //creat Li
    const newTodo = document.createElement('Li'); //create new li
    //newTodo.innerText = input_todo.value; 
    newTodo.classList.add("todo-items"); //add


    //a
    const addingTodo = document.createElement("a");
    addingTodo.classList.add("todo-item");
    addingTodo.innerText = input_todo.value;

    todoDiv.appendChild(newTodo);
    newTodo.appendChild(addingTodo);


    //add todo to local storage
    saveLocalTodos(input_todo.value);

    const completeButton = document.createElement('button');
    completeButton.innerHTML = "Completed";
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //check trash btuon

    const trashButton = document.createElement('button');
    trashButton.innerHTML = "Delete";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    //APPEND TO LIST
    todo_list.appendChild(todoDiv);

    //cleartodo input value

    input_todo.value = "";

}


function deleteCheck(e) {

    const item = e.target;

    //delete  todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filtertodo(e) {
    const todos = todo_list.childNodes;

    todos.forEach(function(lineItem) {
        console.log(lineItem.nodeName);

        if (lineItem.nodeName != "#text") {

            switch (e.target.value) {
                case "all":
                    lineItem.style.display = "flex";
                    break;
                case "completed":

                    if (lineItem.classList.contains("completed")) {
                        lineItem.style.display = "flex";
                    } else {
                        lineItem.style.display = "none";

                    }
                    break;
                case "uncompleted":
                    if (!lineItem.classList.contains("completed")) {
                        lineItem.style.display = "flex";
                    } else {
                        lineItem.style.display = "none";

                    }
                    break;
            }
        }
    });
}

function search_vent() {
    var input, filter, li, a, i, txtValue, btn_complete, btn_delete;
    input = document.getElementById("searchtxt");

    let todos;
    if (localStorage.getItem("todo-list") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todo-list"));
    }

    let ul = document.getElementsByTagName("ul")[0];
    
    for(let childElement of ul.children){
       childElement.style.display = "none";
    }


    for(let childElement of ul.children){
        if (input.value ===childElement.firstElementChild.firstChild.nodeValue){
            childElement.style.display = "";
        }
     }

   

}

function saveLocalTodos(todo) {
    //check hey do I already have things in there
    let todos;
    if (localStorage.getItem("todo-list") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todo-list"));
    }

    todos.push(todo);
    localStorage.setItem("todo-list", JSON.stringify(todos));

}

//delete from local storage
function getTodos() {
    let todos;

    if (localStorage.getItem("todo-list") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todo-list"));
    }

    todos.forEach(function(todo) {


        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //creat Li
        const newTodo = document.createElement('Li'); //create new li
        newTodo.innerText = todo;
        newTodo.classList.add("todo-items"); //add


        //a
        const addingTodo = document.createElement("a");
        addingTodo.classList.add("todo-item");
        addingTodo.innerText = input_todo.value;

        todoDiv.appendChild(newTodo);
        newTodo.appendChild(addingTodo);


        const completeButton = document.createElement('button');
        completeButton.innerHTML = "Completed";
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        //check trash btuon

        const trashButton = document.createElement('button');
        trashButton.innerHTML = "Delete";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);


        //APPEND TO LIST
        todo_list.appendChild(todoDiv);
    });

}

// //delete local storage

function removeLocalTodos(todo) {
    let todos;

    if (localStorage.getItem("todo-list") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todo-list"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
}