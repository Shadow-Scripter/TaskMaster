function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render each task in the task list
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.title;
        li.appendChild(taskText);

        // Create a button to mark task as complete
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Mark as Complete';
        completeButton.classList.add('complete-btn');
        completeButton.addEventListener('click', () => markTaskAsComplete(index));
        li.appendChild(completeButton);

        // Create an "Edit" button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editTask(index));
        li.appendChild(editButton);

        taskList.appendChild(li);
    });
}

function markTaskAsComplete(index) {
    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Remove the task at the given index
    tasks.splice(index, 1);

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Re-render the tasks to reflect the changes
    renderTasks();
}

function editTask(index) {
    // Retrieve tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Prompt the user to edit the task title
    const newTitle = prompt('Enter the new task title:', tasks[index].title);

    if (newTitle !== null && newTitle.trim() !== '') {
        // Update the task title
        tasks[index].title = newTitle.trim();

        // Save the updated tasks array back to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Re-render the tasks to reflect the changes
        renderTasks();
    }
}

function addTask() {
    const taskInput = document.getElementById('input').value;
    if (!taskInput) {
        alert('Please enter a task!');
        return;
    }

    // Create a task object with title and status
    const newTask = {
        title: taskInput,
        status: 'pending'
    };

    // Retrieve existing tasks from local storage or initialize an empty array
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the existing tasks array
    existingTasks.push(newTask);

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    // Clear the input field after adding the task
    document.getElementById('input').value = '';

    // Update the UI to reflect the newly added task
    renderTasks();
}

// Call renderTasks on page load to display any existing tasks
renderTasks();
