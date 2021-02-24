// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const completeList = document.querySelector('.completed-list');
const newTodo = document.querySelector('.new-todo');
const alertDiv = document.querySelector('.alert');
const name = document.getElementById('name');

// event listeners
window.addEventListener('load', getTodos);
window.addEventListener('load', getComps);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', delLocal);
todoList.addEventListener('click', check);
completeList.addEventListener('click', delComp);
completeList.addEventListener('click', unCheck);
newTodo.addEventListener('click', clearStorage);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

// functions

function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  if (!todoInput.value) {
    alertDiv.style.opacity = '1';
    alertDiv.style.display = 'grid';
    alertDiv.style.top = '50%';
    return false;
  } else {
    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    setTimeout(function () {
      todoDiv.classList.add('show');
    }, 10);
    // create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value);
    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-square"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.insertBefore(completedButton, todoDiv.childNodes[0]);
    // trash mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    // clear input field
    todoInput.value = '';
  }
}
// delete and check mark

function delLocal(e) {
  const item = e.target;
  const icon = e.target.firstElementChild;
  const todo = item.parentElement;

  // delete todo
  if (item.classList[0] === 'trash-btn') {
    // animation

    todo.classList.remove('show');
    removeLocalTodos(todo);
    todo.addEventListener('animationend', function () {
      todo.remove();
    });
  }
}

function check(e) {
  const item = e.target;
  const icon = e.target.firstElementChild;
  const todo = item.parentElement;

  // check item off and move to completed
  if (item.classList[0] === 'completed-btn') {
    const todoIt = e.target.nextSibling.innerText;
    //console.log(todoIt);

    // animation
    // manual timeouts because I didn't like the way event listeners were behaving
    todo.classList.remove('show');
    removeLocalTodos(todo);

    function fader() {
      setTimeout(function () {
        document.getElementById('completed-list').appendChild(todo);
        icon.classList.remove('fa-square');
        icon.classList.add('fa-check-square');
        todo.classList.add('completed');
        setTimeout(function () {
          todo.classList.add('show');
        }, 10);
        saveCompleteTodos(todoIt);
      }, 350);
    }
    fader();
  }
}

// del complete
function delComp(e) {
  const item = e.target;
  const icon = e.target.firstElementChild;
  const todo = item.parentElement;

  // delete todo
  if (item.classList[0] === 'trash-btn') {
    // animation
    todo.classList.remove('show');
    removeLocalComps(todo);
    todo.addEventListener('animationend', function () {
      todo.remove();
    });
  }
}

// uncheck todo and move back to To Do list

function unCheck(e) {
  const item = e.target;
  const icon = e.target.firstElementChild;
  const todo = item.parentElement;
  //console.log(icon);
  if (item.classList[0] === 'completed-btn') {
    const todoIt = e.target.nextSibling.innerText;
    const todo = item.parentElement;
    // animation
    // manual timeouts because I didn't like the way event listeners were behaving
    todo.classList.remove('show');
    removeLocalComps(todo);

    function fader() {
      setTimeout(function () {
        document.getElementById('todo-list').appendChild(todo);
        icon.classList.remove('fa-check-square');
        icon.classList.add('fa-square');
        todo.classList.remove('completed');
        setTimeout(function () {
          todo.classList.add('show');
        }, 10);
        saveLocalTodos(todoIt);
      }, 350);
    }
    fader();
  }
}

// save to local storage

function saveLocalTodos(todo) {
  // check for todos
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}
// recall from local storage
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo', 'show');
    // create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-square"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.insertBefore(completedButton, todoDiv.childNodes[0]);
    // trash mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
  });
}
// delete from local storage
function removeLocalTodos(todo) {
  let todos;
  if (!localStorage.getItem('todos')) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// save to local storage

function saveCompleteTodos(todo) {
  // check for todos
  let comps;
  if (localStorage.getItem('comps') === null) {
    comps = [];
  } else {
    comps = JSON.parse(localStorage.getItem('comps'));
  }
  comps.push(todo);
  localStorage.setItem('comps', JSON.stringify(comps));
}
// recall from local storage
function getComps() {
  let comps;
  if (localStorage.getItem('comps') === null) {
    comps = [];
  } else {
    comps = JSON.parse(localStorage.getItem('comps'));
  }
  comps.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo', 'show', 'completed');
    // create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-check-square"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.insertBefore(completedButton, todoDiv.childNodes[0]);
    // trash mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // append to list
    completeList.appendChild(todoDiv);
  });
}
// delete from local storage
function removeLocalComps(todo) {
  let comps;
  if (!localStorage.getItem('comps')) {
    comps = [];
  } else {
    comps = JSON.parse(localStorage.getItem('comps'));
  }
  const todoIndex = todo.children[0].innerText;
  comps.splice(comps.indexOf(todoIndex), 1);
  localStorage.setItem('comps', JSON.stringify(comps));
}

function clearStorage() {
  const page = document.getElementsByTagName('BODY')[0];
  page.classList.remove('fadeInDown');
  page.classList.add('fadeOutUp');
  // animation
  // manual timeouts because I didn't like the way event listeners were behaving
  function reload() {
    setTimeout(function () {
      localStorage.clear();
      location.reload();
      return false;
    }, 500);
  }
  reload();
}

// get name
function getName() {
  if (!localStorage.getItem('name')) {
    name.textContent = '[Enter List Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// set name
function setName(e) {
  if (e.type === 'keypress') {
    // make sure 'enter' is pressed
    // 'enter' is keycode 13
    if (e.which == 12 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

getName();
