import React, { useState } from "react";

const App = () => {
  const [columns, setColumns] = useState([
    { id: "col-todo", title: "To - Do", tasks: [] },
    { id: "col-inprogress", title: "In Progress", tasks: [] },
    { id: "col-done", title: "Done", tasks: [] },
  ]);

  //Single task state
  const [task, setTask] = useState("");

  //Add task to To - Do column
  const handleAddTask = () => {
    if (task.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
      text: task
    };
    const updatedColumn = columns.map((col) => {
      if (col.id === "col-todo") {
        // CORRECTION: Added the missing '...' spread operator before col.tasks to prevent array-nesting bugs
        return { ...col, tasks: [...col.tasks, newTask] };
      }
      return col;
    });
    setColumns(updatedColumn);
    setTask("");
  };


  // Move - Task
  const handleMoveTask = (currentColumnId, targetColumnId, taskToMove) => {
    const updatedColumn = columns.map((col) => {
      if(col.id === targetColumnId) {
        return {...col, tasks: [...col.tasks, taskToMove]}
      }
      if(col.id === currentColumnId) {
        return {...col, tasks: col.tasks.filter((t) => t.id !== taskToMove.id) };
      }
        return col;
    })
    setColumns(updatedColumn)
  
  };


  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div>
        <h1>Kanban Board</h1>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add to To - Do</button>
      </div>

      {/* Render columns and tasks here */}
      <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
        {columns.map((column) => (
          <div key={column.id} style={{ backgroundColor: "#f4f5f7", width: "250px", padding: "15px", borderRadius: "6px" }}>
            <h3>{column.title}</h3>
            <div>
            {/* Render tasks for each column */}
            {column.tasks.map((taskItem) => (
              // CORRECTION: Wrapped the task item elements inside a single parent container div per row so React can render them side-by-side
              <div key={taskItem.id} style={{ backgroundColor: "white", padding: "10px", marginBottom: "10px", borderRadius: "4px" }}>
                <p style={{ margin: "0 0 10px 0" }}>{taskItem.text}</p>
            
                {/*Action Control 3 */}
                <div>
                  {column.id === "col-todo" && (
                    <button
                      onClick={() =>
                        handleMoveTask("col-todo", "col-inprogress", taskItem)
                      }
                    >
                      Start ➡️
                    </button>
                  )}
                  {column.id === "col-inprogress" && (
                    <button
                      onClick={() =>
                        handleMoveTask("col-inprogress", "col-done", taskItem)
                      }
                    >
                      In progress ➡️
                    </button>
                  )}
                  {column.id === "col-done" && <span>✅ Done</span>}
                </div>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;