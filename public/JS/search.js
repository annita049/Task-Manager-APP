// document.getElementById('searchForm').addEventListener(submit, (event)=>{
//     event.preventDefault();
//     console.log("hi");
//     const status = document.getElementById('searchInput').value;
//     console.log(status);
//     this.action = `/Task/${status}/search`;
//     this.submit();
// });

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('titleInput').value.trim();
    const status = document.getElementById('hiddenInput').value;
    console.log(status);

    if (!title && !status) {
        return;
    }
    console.log("ji");

    fetch(`/Task/${status}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, status }),
    })
    .then(response => response.json())
    .then(data => {
        
        const taskBoard = document.querySelector('.task-board');
        taskBoard.innerHTML = ''; 

        if (data.success && data.tasks.length) {

            data.tasks.forEach(task => {

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
