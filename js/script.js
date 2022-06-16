const inputTodo = document.querySelector('#input-todo')
const addTodo = document.querySelector('#button-add-todo')
const todosWrapper = document.querySelector('#todo-wrapper')

let todos;

class Storage {
   constructor(key) {
      this.key = key;
      this.storageItems = localStorage.getItem(this.key)
   }
   getItems() {
      return JSON.parse(this.storageItems)
   }
   setItems(value) {
      localStorage.setItem(this.key, JSON.stringify(value))
   }
}

const storage = new Storage('todos')

!storage.storageItems ? todos = [] : todos = storage.getItems()

class Todo {
   constructor(text) {
      this.text = text;
      this.completed = false
   }
}

let todoElements = []

const getDateString = (date = new Date()) => {
   return `${date.getDate() < 10
      ? '0' + date.getDate()
      : date.getDate()}.${(date.getMonth() + 1) < 10
         ? '0' + (date.getMonth() + 1)
         : (date.getMonth() + 1)}.${date.getFullYear()}`
}

const createTemplate = (todo, idx) => {
   const date = new Date
   return (`
         <div class="card mb-2 bg-light" id="todo-item">
            <div class="card-body">
               <h5 class="card-title">${getDateString()}</h5>
               <p class="card-text fs-2 ${todo.completed ? 'checked' : ''}">${idx + 1}:${todo.text}</p>
               <input type="checkbox" class="btn-check" id="btn-done" autocomplete="off" ${todo.completed ? 'checked' : ''}>
               <label onclick="completeTodo(${idx})" class="btn btn-success" for="btn-done">Done!</label>
               <button onclick="removeTodo(${idx})" class="btn btn-danger">Delete</button>
            </div>
         </div>
   `)
}

const createTodoList = () => {
   todosWrapper.innerHTML = ''
   if (todos.length) {
      todos.forEach((item, idx) => {
         todosWrapper.innerHTML += createTemplate(item, idx)
      })
      todoElements = document.querySelectorAll('#todo-item')
   }
   todosWrapper.insertAdjacentElement('afterbegin', <p>No Todos</p>)
}
createTodoList()

const completeTodo = (index) => {
   todos[index].completed = !todos[index].completed
   if (todos[index].completed) {
      todoElements[index].classList.add('checked')
   } else {
      todoElements[index].classList.remove('checked')
   }
   storage.setItems(todos)
   createTodoList()
}

const removeTodo = (index) => {
   console.log(index)
   todos.splice(index, 1)
   storage.setItems(todos)
   createTodoList()
}

addTodo.addEventListener('click', () => {
   todos.push(new Todo(inputTodo.value))
   inputTodo.value = ''
   storage.setItems(todos)
   createTodoList()
})