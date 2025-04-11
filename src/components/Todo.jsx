import React, { useEffect, useRef, useState } from 'react'
import TodoItem from './TodoItem';

const Todo = () => {
  const[todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const inputRef = useRef()
  
  //Update Localstorage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todoList));
  },[todoList])

//Add new task
  const addTask = () => {
    const inputText = inputRef.current.value.trim();
    if(inputText === ""){
      return null;
    }
    const newTodo = {
      id : Date.now(),
      text : inputText,
      isComplete : false
    };
setTodoList((prev)=>[...prev, newTodo]);
inputRef.current.value = "";
  }

//Update task status
const toggleTask = (id) =>{
setTodoList((prev)=>{
  return prev.map((todo)=>{
    if(id==todo.id){
      return {...todo, isComplete : !todo.isComplete}
    }
    return todo;
  })
})
}

//Delete Todo
const deleteTodo = (id) => {
  setTodoList((prev)=>{
    return prev.filter((todo)=>todo.id !== id)
  })
}

  return (
    <>
    <div className='w-[30-rem]'>
       <h1 className='text-lg my-2 font-medium text-amber-500'>To-do-list</h1> 
    <div className='flex gap-2'>
    <div className='flex-1'>
    <input ref={inputRef} type="text" className='px-4 py-3 w-full text-sm border focus:outline-none  focus:border-amber-400 hover:bg-orange-100' placeholder='Add your task'/> 
    </div>
    <button className='px-4 py-3 bg-blue-600 text-white hover:bg-blue-800 text-sm font-medium rounded-sm border-none' onClick={addTask}>Add Task</button>
    </div>
    <p className='my-3 text-sm text-zinc-400 px-1 '>Fill task details</p>
    </div>
    <div className='w-[30rem] bg-white shadow px-4 py-6' >
    <fieldset className='space-y-3'>
      <legend className='text-pink-800 font-bold'>List of Tag</legend>
      {/* List Items start */}
  {todoList.length==0?(
    <p className = "text-gray-600 text-sm"> No task found</p>
  ) : (
    todoList.map((todo, index) => {
     return <TodoItem text = {todo.text} key = {index} isComplete = {todo.isComplete}
     id={todo.id} toggleTask = {toggleTask} deleteTodo = {deleteTodo} />
  })
  )}

      {/*List Items ends */}
    </fieldset>

    </div>
    </>
  )
}

export default Todo