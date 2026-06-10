const handleMoveTask = (currentColumnId, targetColumnId, taskToMove) => {
     const updatedColumn = columns.map((col) => {
        if(col.id === targetColumnId) {

            //we need to return new { object }
            return {...col, tasks: [...col.tasks, taskToMove]}
        }
        if(col.id === currentColumnId) {
            
            return {
                ...col, 
                tasks: col.tasks.filter((tak) => tak.id !== taskToMove.id  )}
        }
     })
}