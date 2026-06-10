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
      text: task,
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
      if (col.id === targetColumnId) {
        return { ...col, tasks: [...col.tasks, taskToMove] };
      }
      if (col.id === currentColumnId) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskToMove.id),
        };
      }
      return col;
    });
    setColumns(updatedColumn);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div>
        <h1>KanFlow</h1>
        <br />
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
        />
        <button 
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
        >
          Add to To - Do
        </button>
      </div>

      {/* Render columns and tasks here */}
      <div className="flex flex-col md:flex-row gap-6 mt-10 max-w-5xl">
        {columns.map((column) => (
          <div 
            key={column.id}
            className="w-full md:w-80 bg-slate-200/70 rounded-xl p-4 border border-slate-300/50 min-h-[350px]"
          >
            <h3>{column.title}</h3>
            <div>
              {/* Render tasks for each column */}
              {column.tasks.map((taskItem) => (
                // CORRECTION: Wrapped the task item elements inside a single parent container div per row so React can render them side-by-side
                <div 
                  key={taskItem.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-slate-200/80 mb-3 hover:shadow-md transition-shadow"
                >
                  <p className="text-slate-700 font-medium mb-3 break-words">{taskItem.text}</p>

                  {/* 3 Action Controls */}
                  <div className="flex justify-end">
                    {column.id === "col-todo" && (
                      <button
                        onClick={() =>
                          handleMoveTask("col-todo", "col-inprogress", taskItem)
                        }
                        className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        Start ➡️
                      </button>
                    )}
                    {column.id === "col-inprogress" && (
                      <button
                        onClick={() =>
                          handleMoveTask("col-inprogress", "col-done", taskItem)
                        }
                        className="text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md hover:bg-amber-100 transition-colors"
                      >
                        In progress ➡️
                      </button>
                    )}
                    {column.id === "col-done" && (
                      <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md">
                        ✅ Completed
                      </span>
                    )}
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