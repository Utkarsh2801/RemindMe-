const inputTask = document.querySelector(".add-form");
const addBtn  = document.querySelector("#add-btn");
const inputValue = document.querySelector("#add");
const taskList = document.querySelector(".task-list1");
const clear = document.querySelector("#clear-btn");
const filter = document.querySelector("#filter-input");

loadAllEventListener();

function loadAllEventListener(){
  inputTask.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clear.addEventListener('click', clearList);
  filter.addEventListener('keyup', filterTask);
  document.addEventListener('DOMContentLoaded', getFromLS);

}

function addTask(e){
  if(inputValue.value==="")
  {
    alert('Enter Some Task');
  }
  else{
    const li = document.createElement('li');
    li.className= 'task-item';
    const p = document.createElement('p');
    p.className = "task-name";
    p.appendChild(document.createTextNode(inputValue.value));
    const link = document.createElement('a');
    link.className = "delete-item";
    link.setAttribute('href','#');
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    li.appendChild(p);
    li.appendChild(link);
    saveDataToLS(inputValue.value);
    inputValue.value="";
    taskList.appendChild(li);

    //Save to LS

}
  e.preventDefault();
}


function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();
      //Remove From LS
      removeFromLS(e.target.parentElement.parentElement);
    }
  }
}


function clearList(e){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}


function filterTask(e){
  const filterData = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll('.task-item');
  tasks.forEach(function(task){
  const item = task.firstChild.textContent;
  if(item.toLowerCase().indexOf(filterData) != -1){
      task.style.display = 'flex';
    }
    else{
      task.style.display = 'none';
    }
  });
}


function saveDataToLS(taskToSave){
  let tasks;
  tasks = localStorage.getItem('tasks');
  if(tasks === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(tasks);
  }
  tasks.push(taskToSave);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getFromLS(){
    let tasks;
    tasks = localStorage.getItem('tasks');
    if(tasks === null){
      tasks = [];
    }
    else{
      tasks = JSON.parse(tasks);
    }

    tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className= 'task-item';
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = "delete-item";
    link.setAttribute('href','#');
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    li.appendChild(p);
    li.appendChild(link);
    taskList.appendChild(li);
});
}

function removeFromLS(taskToDelete){
  let tasks;
  tasks = localStorage.getItem('tasks');
  if(tasks === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(tasks);
  }
  tasks.forEach(function(task, index){
    if(taskToDelete.textContent === task){
      tasks.splice(index, 1);
    }
});
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
