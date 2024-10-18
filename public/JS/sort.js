document.getElementById('sort-priority').addEventListener('click', function() {

    const status = document.getElementById('hiddenInput').value;

    console.log("yes", status);

    fetch(`/Task/${status}/sorted`)
    .then(response => response.json())
    .then(data => {
        const taskBoard = document.querySelector('.task-board');
        taskBoard.innerHTML = '';
        // console.log(status); 

        if (data.success) {
            console.log("hi---");
            console.log(data.SortedTasks);
            data.SortedTasks.forEach(task => {

                const taskBox = document.createElement('div');
                taskBox.className = 'task-box';
                console.log("why");

                taskBox.innerHTML = 
                `<div class="taskbox-header">
                    <div class="task-title">${task.title}</div>
                </div>
                <div class="taskbox-body">
                    <div class="task-description">${task.description}</div>
                </div>
                <div class="edit-delete-icons">
                    <a id="updateTask-${task._id}"><i class="fa-solid fa-pen"></i></a>
                    <a id="deleteTask-${task._id}"><i class="fas fa-trash-alt"></i></a>
                </div>
                <div class="task-footer">
                    <span class="task-status" id="${task.status.toLowerCase()}">${task.status}</span>
                    <span class="task-priority" id="${task.priority.toLowerCase()}">${task.priority}</span>
                    <div class="priority-indicator" id="${task.priority.toLowerCase()}"></div>
                </div>`
                
                taskBoard.appendChild(taskBox);
            });
        }
        else {
            taskBoard.innerHTML = '<h2>No Tasks found.</h2>';
        }
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });
});
