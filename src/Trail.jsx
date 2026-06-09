 import React from 'react'
 import { useState } from 'react'
 
 const App = () => {
  const [todo, setTodo] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleChange = (e) => {
      setTodo(e.target.value);
  }
  const handleSubmit = () => {
      setTaskList([...taskList, todo]);
      setTodo('');
      console.log(taskList);
  }

  function handleDelete(index) {
      const newList = [...taskList];
      newList.splice(index, 1);
      setTaskList(newList);
  }
   return (
     <div>
      <h1>Unified Board</h1>
      <input
      type='text'
      placeholder='Enter task'
      value={todo}
      onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add Task</button>
      <ul>
        {
          taskList.map((task, index) =>(
            <>
             <li key={index}>{task}</li>
            <button onClick={() => handleDelete(index)}>Delete</button>
            </>
          ))
        }

      </ul>
      </div>
   )
 }
 
 export default App