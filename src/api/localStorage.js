let local = localStorage.getItem('todos')
if (local === null) {
  localStorage.setItem('todos', JSON.stringify([]))
}

function get() {
  return JSON.parse(localStorage.getItem('todos'))
}

function set(data) {
  localStorage.setItem('todos', JSON.stringify(data))
}

//用于生成uuid
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function createUUID() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}

export function getAll() {
  let data = get()
  return new Promise(resolve => {
    resolve({
      status: 200,
      data: data
    })
  })
}

export function addTodo(params) {
  let data = get()
  let id = createUUID()
  let todo = {
    id: id,
    title: params.title,
    completed: false
  }
  data.push(todo)
  set(data)
  return new Promise(resolve => {
    resolve({
      status: 200,
      data: todo
    })
  })
}

export function deleteTodo(id) {
  let data = get()
  let index = data.findIndex(item => item.id === id)
  data.splice(index, 1)
  set(data)
  return new Promise(resolve => {
    resolve({
      status: 200,
      data: id
    })
  })
}

export function updateTodo(todo) {
  let data = get()
  let oldTodo = data.find(item => item.id === todo.id)
  let newTodo = {...oldTodo, ...todo}
  let index = data.findIndex(item => item.id === todo.id)
  data.splice(index, 1, newTodo)
  set(data)
  return new Promise(resolve => {
    resolve({
      status: 200,
      data: newTodo
    })
  })
}

export function completedAll(value) {
  let data = get()
  data.forEach(item => {
    item.completed = value
  })
  set(data)
  return new Promise(resolve => {
    resolve({
      status: 200,
      data: data
    })
  })
}

export function clearCompleted() {
  let data = get()
  let newData = data.filter(item => item.completed === false)
  set(newData)
  return new Promise(resolve => {
    resolve({
      status: 200,
      data: newData
    })
  })
}
