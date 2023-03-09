import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import Card from './components/Card/card'
import './App.css'

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todoInput, setTodoInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('@todoList:todos')

    if (storedTodos) {
      return JSON.parse(storedTodos)
    }
    return []

  })

  useEffect(() => {
    localStorage.setItem('@todoList:todos', JSON.stringify(todos))
  }, [todos])



  function addTodo() {
    setTodos((previousTodos) =>
      [...previousTodos, { id: Math.random(), title: todoInput, completed: false }])

    setTodoInput('')

  }

  function completeTodo(id: number) {
    setTodos((previousTodos) =>
      previousTodos.map((todo => todo.id != id ? todo : { ...todo, completed: !todo.completed }))
    )
  }

  function deleteTodo(id: number) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id != id))
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value)
  }

  return (
    <div className="App">
      <div className='add-todo-bg'>
        <div className='add-todo'>
          <input placeholder='Insira a tarefa' value={todoInput} onChange={handleInputChange} />
          <button onClick={addTodo}>Adicionar</button>
        </div>
      </div>

      {
        todos.map((todo) => (
          <Card key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        ))
      }


    </div>
  )
}

export default App
