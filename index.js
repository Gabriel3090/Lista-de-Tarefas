const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

// Load tasks from localStorage (or set to an empty array if not present)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTaskOnHTML(task) {
    const li = document.createElement("li");

    // Create a checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;  // Set the checkbox based on the task's completion state

    // Optionally, style the completed task (e.g., strikethrough)
    if (task.completed) {
        li.style.textDecoration = "line-through";
    } else {
        li.style.textDecoration = "none";
    }

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;

        // Optionally, style the completed task
        if (task.completed) {
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
        }

        // Save the updated tasks to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    // Create a button to remove the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", () => {
        const taskIndex = tasks.indexOf(task);
        if (taskIndex !== -1) {
            // Remove the task from the tasks array
            tasks.splice(taskIndex, 1);

            // Remove the list item from the DOM
            todoListUl.removeChild(li);

            // Save the updated tasks to localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.title));
    li.appendChild(removeButton);

    todoListUl.appendChild(li);
}

// Render the tasks from localStorage when the page loads
tasks.forEach((task) => {
    renderTaskOnHTML(task);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskTitle = taskTitleInput.value;

    if (taskTitle.length < 3) {
        alert("Sua tarefa precisa ter, pelo menos, 3 caracteres");
        return;
    }

    // Create a new task object
    const task = {
        title: taskTitle,
        completed: false,
    };
    tasks.push(task);

    // Render the new task on the HTML
    renderTaskOnHTML(task);

    // Save the updated tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear the input field
    taskTitleInput.value = "";
});
