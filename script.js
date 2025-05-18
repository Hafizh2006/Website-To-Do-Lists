const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text, done: false });
  taskInput.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

renderTasks();