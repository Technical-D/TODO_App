const form = document.getElementById("form");
const title = document.querySelector("#input");
const date = document.getElementById("dateInput");
const description = document.getElementById("textarea");
const msg = document.querySelector(".msg");
const tasks = document.querySelector("#tasks");
const add = document.querySelector("#add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})

function formValidation(){

    if(title.value === "") {
        msg.innerHTML = "Field can not be blank.";
        setTimeout(() => {
            msg.innerHTML = "";
        }, 2000);
    } else{
        acceptData();
        createTasks();
        hideModal();
    }
}

let data = [];

function acceptData() {
    data.push({
        title : title.value,
        date:  date.value,
        description: description.value
    });
    localStorage.setItem("data", JSON.stringify(data));

    clearForm();
}

    

let clearForm = () => {
    title.value = "";
    date.value = "";
    description.value = "";
}

function createTasks() {
    tasks.innerHTML = "";
    data.map((x,y) => {
        return tasks.innerHTML += 
    `<div id="${y}">
    <span class="fw-bold">${x.title}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.description}</p>
    <span class="options">
        <i onclick="taskUpdate(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
        <i onclick="taskDelete(this); createTasks()" class="fa-solid fa-trash"></i>
    </span>
    </div>`;
    });
    
}

function hideModal() {
    add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() =>{
            add.setAttribute("data-bs-dismiss", "");
            })()
}

let taskDelete = (e)=> {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    
}

let taskUpdate = (e) => {
    let selectedTask = e.parentElement.parentElement;

    title.value = selectedTask.children[0].innerHTML;
    date.value = selectedTask.children[1].innerHTML;
    description.value = selectedTask.children[2].innerHTML;

    taskDelete(e);

}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
}) ()