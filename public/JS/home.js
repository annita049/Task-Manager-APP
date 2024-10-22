// document.querySelector('#popupModal .modal-title').textContent= "Create New Task";

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupForm').style.display = 'none';
});

function clearForm() {
    document.getElementById('taskid').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('status').value = '';
    document.getElementById('priority').value = '';
}

document.getElementById('createTask').addEventListener('click', function() {
    clearForm();
    document.getElementById('popupForm').style.display = 'block';
    document.querySelector('.from-title').textContent = 'Create a Task';
    document.getElementById('taskForm').action = '/CreateTask';
});

function UpdateTask(taskId){
    console.log("jobbie");
    console.log(taskId);
    document.querySelector('.from-title').textContent = "Update Task";
    document.getElementById('taskForm').action = `UpdateTask/${taskId}`;
    
    // editMode = true;
    // console.log(document.getElementById('taskForm'));
    // taskForm.action = `/UpdateTask/${taskId}`
    // console.log(taskForm.action);

    // fetching old values ...
    fetch(`/UpdateTask/${taskId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('title').value = data.task.title;
                document.getElementById('description').value = data.task.description;
                document.getElementById('status').value = data.task.status;
                document.getElementById('priority').value = data.task.priority;
                document.getElementById('taskid').value = data.task._id;
                
                console.log("we successfully fetched all data by id");
            }
            else {
                console.error('Error fetching task data:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching task data:', error);
        });
    // updating new values and submit
}

async function DeleteTask(taskId){ //obejct unique id
    if(confirm('Are you sure to delete this Task ?')){
        try {
            console.log("delete taskid", taskId);
            let Response = await fetch(`/DeleteTask/${taskId}`);
            Response = await Response.json();
    
            if (Response.success){
                console.log("yes deleted");
                location.reload();
            }
            else {
                console.log("Can't delete task!");
            }
        }
        catch (error) {
            // document.getElementById('task-board').innerHTML = "holy error!"
            console.log("cant just");
            console.error('Error fetching tasks:', error);
        }
    }
}

async function TaskCounts() {
    try {
        const countResponse = await fetch('/CountTask');
        const count = await countResponse.json();

        if (count.success) {
            document.getElementById('totalTasks').innerText = count.TotalTasks;
            document.getElementById('completedTasks').innerText = count.CompletedTasks;
            document.getElementById('pendingTasks').innerText = count.PendingTasks;
            document.getElementById('inProgressTasks').innerText = count.InProgressTasks;
        }
        else {
            console.error(countData.message);
        }
    } catch (error) {
        console.error('Error fetching task counts:', error);
    }
}

async function AllTaskList() {
    try {
        const tasksResponse = await fetch('/AllTaskList');
        const tasks = await tasksResponse.json();

        if (tasks.success) {
            const taskBoard = document.querySelector('.task-board');
            // taskBoard.innerHTML = `${tasks.tasks[2].title}`; //test

            tasks.tasks.forEach(task => {
                const taskBox = document.createElement('div');
                taskBox.className = 'task-box';

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

                document.getElementById(`updateTask-${task._id}`).addEventListener('click', () => {
                    document.getElementById('popupForm').style.display = 'block';
                    // $('#popupForm').show();
                    UpdateTask(task._id);
                });

                document.getElementById(`deleteTask-${task._id}`).addEventListener('click', () => {
                    // document.getElementById('popupForm').style.display = 'block';
                    DeleteTask(task._id);
                });
            });
        }
        else {
            document.getElementById('task-board').innerHTML = `<div class="no-task-found"> <h2>${tasks.message}</h2> </div>`;
        }
    }
    catch (error) {
        // document.getElementById('task-board').innerHTML = "holy error!"
        console.error('Error fetching tasks:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    TaskCounts();
    AllTaskList();
    document.querySelector('.nav-link#home').classList.add('active');
});


// implementing search ---------------------

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('titleInput').value.trim();

    fetch("/Home/search", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title}),
    })
    .then(response => response.json())
    .then(data => {
        
        const taskBoard = document.querySelector('.task-board');
        taskBoard.innerHTML = ''; 

        if (data.success && data.tasks.length) {

            data.tasks.forEach(task => {

                const taskBox = document.createElement('div');
                taskBox.className = 'task-box';

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
            document.getElementById(`updateTask-${task._id}`).addEventListener('click', () => {
                document.getElementById('popupForm').style.display = 'block';
                UpdateTask(task._id);
            });

            document.getElementById(`deleteTask-${task._id}`).addEventListener('click', () => {
                document.getElementById('popupForm').style.display = 'block';
                DeleteTask(task._id);
            });
        }
        else {
            taskBoard.innerHTML = '<div class="no-task-found"> <h2> No Taks found. </h2></div>';
        }
    })
    .catch(error => {
        console.error('Error fetching tasks:', error);
    });
});
