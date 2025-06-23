let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("prioritySelect").value;

  if (input.value.trim() !== "") {
    tasks.push({ text: input.value, done: false, priority: priority });
    input.value = "";
    saveTasks();
  }
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  saveTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
}

function getPriorityColor(priority) {
  switch(priority) {
    case "high": return "red";
    case "medium": return "orange";
    case "low": return "green";
    default: return "black";
  }
}

function showTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" onchange="toggleTask(${i})" ${task.done ? "checked" : ""}>
      <span style="
        text-decoration: ${task.done ? 'line-through' : 'none'};
        margin-left: 8px;
        color: ${getPriorityColor(task.priority)};
        font-weight: bold;
      ">
        ${task.text} (${task.priority})
      </span>
      <button onclick="deleteTask(${i})" style="margin-left: 12px;">❌</button>
    `;
    list.appendChild(li);
  });
}

showTasks();
