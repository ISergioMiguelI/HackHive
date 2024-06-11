function addTask() {
    var taskName = document.getElementById('taskName').value;
    var taskDescription = document.getElementById('taskDescription').value;
    var taskCompleted = document.getElementById('taskCompleted').checked;
    var taskProgress = document.getElementById('taskProgress').value;

    // Create a new task object
    var task = {
        name: taskName,
        description: taskDescription,
        completed: taskCompleted,
        progress: taskProgress
    };

    // Add the task to the task list
    var taskList = document.getElementById('taskList');
    var listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `
        <input type="checkbox" class="form-check-input" ${task.completed ? 'checked' : ''}>
        <span>${task.name}</span>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${task.progress}%" aria-valuenow="${task.progress}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    `;
    taskList.appendChild(listItem);
}

// Add task form submission event listener
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Add the task
    addTask();

    // Clear the form fields
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskCompleted').checked = false;
    document.getElementById('taskProgress').value = '';
});

// Function to update task completion and progress
function updateTask(event) {
    var checkbox = event.target;
    var taskItem = checkbox.parentElement;

    // Toggle task completion
    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
}

// Task list event delegation for dynamic checkbox
document.getElementById('taskList').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        updateTask(event);
    }
});