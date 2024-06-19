// JavaScript file for handling profile page functionality

document.addEventListener("DOMContentLoaded", function () {
    const profileImageInput = document.getElementById("profileImageInput");
    const profileImageContainer = document.getElementById("profileImageContainer");
    const tasksTableBody = document.getElementById("tasksTableBody");
    const editTaskForm = document.getElementById("editTaskForm");

    profileImageInput.addEventListener("change", function () {
        const file = profileImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImageContainer.style.backgroundImage = `url(${e.target.result})`;
                profileImageContainer.innerHTML = ''; // Clear the default icon
            };
            reader.readAsDataURL(file);
        }
    });

    function fetchUserData() {
        // Simulate an API call to get user data
        const userData = {
            fullName: "John Doe",
            email: "john.doe@example.com",
            additionalInfo: "Hello there! I'm passionate about programming and technology, with a keen interest in crafting efficient solutions to complex problems."
        };

        document.getElementById("fullName").textContent = userData.fullName;
        document.getElementById("email").textContent = userData.email;
        document.getElementById("additionalInfo").textContent = userData.additionalInfo;
        document.getElementById("userName").textContent = userData.fullName;
    }

    function fetchTasks() {
        // Simulate an API call to get tasks
        const tasks = [
            { id: 1, title: "Task 1", description: "Description 1", status: "Pending" },
            { id: 2, title: "Task 2", description: "Description 2", status: "In Progress" },
            { id: 3, title: "Task 3", description: "Description 3", status: "Completed" }
        ];

        tasksTableBody.innerHTML = '';

        tasks.forEach(task => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.status}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary edit-task" data-id="${task.id}" data-toggle="modal" data-target="#editTaskModal">Edit</button>
                    <button class="btn btn-sm btn-outline-danger delete-task" data-id="${task.id}">Delete</button>
                </td>
            `;

            tasksTableBody.appendChild(row);
        });

        document.querySelectorAll(".edit-task").forEach(button => {
            button.addEventListener("click", function () {
                const taskId = this.getAttribute("data-id");
                const task = tasks.find(t => t.id == taskId);
                document.getElementById("editTaskId").value = task.id;
                document.getElementById("editTaskTitle").value = task.title;
                document.getElementById("editTaskDescription").value = task.description;
                document.getElementById("editTaskStatus").value = task.status;
            });
        });

        document.querySelectorAll(".delete-task").forEach(button => {
            button.addEventListener("click", function () {
                const taskId = this.getAttribute("data-id");
                // Simulate an API call to delete the task
                const index = tasks.findIndex(t => t.id == taskId);
                if (index > -1) {
                    tasks.splice(index, 1);
                    fetchTasks();
                }
            });
        });
    }

    editTaskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const taskId = document.getElementById("editTaskId").value;
        const taskTitle = document.getElementById("editTaskTitle").value;
        const taskDescription = document.getElementById("editTaskDescription").value;
        const taskStatus = document.getElementById("editTaskStatus").value;

        // Simulate an API call to update the task
        // ...

        fetchTasks(); // Refresh the tasks list
        $('#editTaskModal').modal('hide');
    });

    fetchUserData();
    fetchTasks();
});
