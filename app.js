// Variabler defineres i starten så de kan bruges senere.

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {

  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Locastorage

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
  // Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';

  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
   }

// Create li element
const li = document.createElement('li');
li.className = 'collection-item';

// Create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
const link = document.createElement('a');
// Add class
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
// Append the link
li.appendChild(link);
// Append li to ul
taskList.appendChild(li);

//Local Storage
storeTaskInLocalStorage(taskInput.value);


// Clear input
taskInput.value = '';

  e.preventDefault();
}

// Storage task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
    tasks.push(task);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) 
    {
      if(confirm('Are you sure?')){
  e.target.parentElement.parentElement.remove();

  // Remove tasks form localstorage
  removeTaskFromLocalstorage(e.target.parentElement.parentElement);
     }
  } 
}

// Remove  from localstorage
function removeTaskFromLocalstorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(){

// Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear tasks form localstorage
  clearTasksFromLocalStorage();

  // clear tasks from localstorage
  function clearTasksFromLocalStorage(){
    localStorage.clear();
  }
}

// Filter
function filterTasks(e) {
 const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';

    } else {
      task.style.display = 'none';
  
    }
  });
}