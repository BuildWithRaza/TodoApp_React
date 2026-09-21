import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'


import { v4 as uuidv4 } from 'uuid';




const App = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [flag, setFlag] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editTodo, setEditTodo] = useState('')


  useEffect(() => {
    let data = localStorage.getItem('todos') || []
    if (data != '') {
      let mydata = JSON.parse(data)
      setTodos(mydata)
    }

  }, [])

  useEffect(() => {
    if (todos.length == 0) {
      localStorage.setItem('todos', '')
    }
    else {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])




  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {

    if (todo != '') {
      if (edit) {
        let index = todos.findIndex(item => {
          return item.id === editTodo;
        })
        let newtodos = [...todos];
        newtodos[index].todo = todo
        setTodos(newtodos)
        setTodo("")
        setEdit(false)
        setEditTodo('')
      }
      else {
        setTodos([...todos, { id: uuidv4(), todo: todo, isComplete: false }])
        setTodo("")

      }
    }
  }
  const handleCheckbox = (e) => {

    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isComplete = !newtodos[index].isComplete
    setTodos(newtodos)

  }

  const handleEdit = (e) => {
    setTodo(e.todo)
    setEdit(true)
    setEditTodo(e.id)
  }

  const handleDelete = (todoToDelete) => {

    const filterTask = todos.filter(alltodo => alltodo !== todoToDelete)
    setTodos(filterTask)
  }

  const handleShowFinished = (e) => {

    console.log(e.target.checked);
    setFlag(!flag)
  }

   todos.sort((a, b) => a.isComplete - b.isComplete);

  return (
    <>
      <Navbar />
      <div className='md:w-max md:mx-auto mt-10 h-[85vh] mb-5 p-4 bg-red-200 rounded-lg flex flex-col gap-5 mx-5'>
        <h1 className='font-bold text-2xl'>NoteTodo - Manage your todos at one place</h1>
        <hr />
        <div className='space-y-4'>
          <h1 className='font-bold text-2xl'>Add a Todo</h1>
          <div className="flex gap-5 ">

            <input onChange={handleChange} value={todo} className='w-full h-10 border-2 border-gray-400 bg-stone-300' type="text" />
            <button onClick={handleAdd} className='cursor-pointer px-4 py-2 border-0 bg-blue-400 text-white font-semibold rounded-lg'>Save</button>
          </div>
        </div>
        <div className="flex gap-2  items-center">

          <input onChange={handleShowFinished} type="checkbox" id='showfinished' />
          <h3>Show Finished</h3>
        </div>
        <hr />
        <div className="overflow-y-auto scrollhide space-y-3">
          <h1 className='font-bold text-2xl sticky top-0 bg-red-200 pb-3'>Your Todos</h1>
          {todos.length == 0 && <div className='px-2 text-xl'>No Todos to show</div>}
          {todos.map((e, idx) => {
            return (<div key={idx}>
              <div className={e.isComplete && flag == false ? "justify-between items-center hidden" : (e.isComplete && flag == true ? 'flex justify-between items-center opacity-30 ' : "flex justify-between items-center")} >
                <div className="flex gap-2  items-center">
                  <input onChange={handleCheckbox} name={e.id} type="checkbox" value={e.isComplete} id='showfinished' checked={e.isComplete} />
                  <h3 className={e.isComplete ? "line-through" : ""}>{e.todo}</h3>
                </div>
                <div className='flex gap-2 items-center'>
                  <button onClick={() => {
                    handleEdit(e)
                  }} className=' bg-blue-400 px-2 py-1 rounded-lg cursor-pointer'>Edit</button>
                  <button onClick={() => {
                    handleDelete(e)
                  }} className=' bg-blue-400 px-2 py-1 rounded-lg cursor-pointer'>Delete</button>
                </div>
              </div>
            </div>
            )
          })}


        </div>
      </div>
    </>
  )
}

export default App
