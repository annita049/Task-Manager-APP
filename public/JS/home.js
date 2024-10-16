// document.querySelector('#CreateTaskModal .modal-title').textContent= "Create New Task";


function UpdateTask(taskId){
    console.log("jobbie");
    console.log(taskId);
    fetch(`/UpdateTask/${taskId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                document.getElementById('title').value = data.task.title;
                document.getElementById('description').value = data.task.description;
                document.getElementById('status').value = data.task.status;
                document.getElementById('priority').value = data.task.priority;

            }
            else {
                console.error('Error fetching task data:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching task data:', error);
        });

}

async function TaskCounts() {
    try {
        const countResponse = await fetch('/CountTask');
        const count = await countResponse.json();

        if (count.status === 'success') {
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

        if (tasks.status === 'success') {
            const taskBoard = document.querySelector('.task-board');
            // taskBoard.innerHTML = `${tasks.tasks[2].title}`; //test

            tasks.tasks.forEach(task => {
                const taskBox = document.createElement('div');
                taskBox.className = 'task-box';

                taskBox.innerHTML = 
                `<div class="task-title">${task.title}</div>
                <div class="task-description">${task.description}</div>
                <div class="edit-delete-icons">
                    <a href="#" id="updateTask-${task._id}"><i class="fa-solid fa-pen"></i></a>
                    <a href="#" id="deleteTask-${task._id}"><i class="fas fa-trash-alt"></i></a>
                </div>
                <div class="task-footer">
                    <span class="task-status" id="${task.status.toLowerCase()}">${task.status}</span>
                    <span class="task-priority" id="${task.priority.toLowerCase()}">${task.priority}</span>
                </div>`
                taskBoard.appendChild(taskBox);

                document.getElementById(`updateTask-${task._id}`).addEventListener('click', () => {
                    document.getElementById('popupForm').style.display = 'block';
                    // $('#popupForm').show();
                    UpdateTask(task._id);
                });

                document.getElementById(`deleteTask-${task._id}`).addEventListener('click', () => {
                    document.getElementById('popupForm').style.display = 'block';
                    DeleteTask(task._id);
                });
            });
        }
        else {
            document.getElementById('task-board').innerHTML = `<h2>${tasks.message}</h2>`;
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
});

// document.getElementById('updateTask').addEventListener('click', function() {
    
// });

// document.getElementById(`deleteTask-${task._id}`).addEventListener('click', function() {
//     DeleteTask(task._id);
// });