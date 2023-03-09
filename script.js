let tasks = [];

// Load tasks from local storage
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    showTasks();
}

function addTask() {
    const taskInput = document.getElementById("task");
    const priorityInput = document.getElementById("priority");

    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        text: taskInput.value,
        priority: priorityInput.value
    };
    tasks.push(task);

    // Store the tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();

    taskInput.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

function showTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>No tasks yet.</p>";
        return;
    }

    tasks.sort(function(a, b) {
        const priorityOrder = { "high": 3, "medium": 2, "low": 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    tasks.forEach(function(task, index) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskTextElement = document.createElement("div");
        taskTextElement.classList.add("task-text");
        taskTextElement.innerText = task.text;
        taskElement.appendChild(taskTextElement);

        const taskPriorityElement = document.createElement("div");
        taskPriorityElement.classList.add("task-priority");
        taskPriorityElement.innerText = task.priority;
        taskElement.appendChild(taskPriorityElement);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });
        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);
    });
}
