function GenerateTask(tasks){
    const taskBoard = document.querySelector('.task-board');

    tasks.forEach(task => {
        const taskBox = document.createElement('div');
        taskBox.className = 'task-box';

        taskBox.innerHTML = 
        `<div class="taskbox-header">
            <div class="task-title">${task.title}</div>
        </div>
        <div class="taskbox-body">
            <div class="task-description">${task.description}</div>
        </div>
        <div class="task-footer">
            <span class="task-status" id="${task.status.toLowerCase()}">${task.status}</span>
            <span class="task-priority" id="${task.priority.toLowerCase()}">${task.priority}</span>
            <div class="priority-indicator" id="${task.priority.toLowerCase()}"></div>
        </div>`
        taskBoard.appendChild(taskBox);
    });
}


// Search in categorical tasks

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('titleInput').value.trim();
    const status = document.getElementById('hiddenInput').value;
    console.log(status);

    if (!title && !status) {
        return;
    }

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

            GenerateTask(data.tasks)
        }
        else {
            document.getElementById('task-board').innerHTML = `<div class="no-task-found"> <h2> No Task Found </h2> </div>`;
        }
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });
});


// sorting

document.getElementById('sort-priority').addEventListener('click', function() {

    const status = document.getElementById('hiddenInput').value;
    
    fetch(`/Task/${status}/sorted`)
    .then(response => response.json())
    .then(data => {
        const taskBoard = document.querySelector('.task-board');
        taskBoard.innerHTML = '';

        if (data.success) {
            GenerateTask(data.SortedTasks);
        }
        else {
            document.getElementById('task-board').innerHTML = `<div class="no-task-found"> <h2> No Task Found </h2> </div>`;
        }
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });
});
