const addBtn = document.getElementById('addBtn');
const saveBtn = document.getElementById('saveBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load saved tasks on page load
window.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', addTask);
saveBtn.addEventListener('click', saveTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    taskInput.value = '';
    taskInput.focus();
  }
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  li.textContent = taskText;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('removeBtn');
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(removeBtn);
  return li;
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const taskText = li.childNodes[0].textContent;
    const isCompleted = li.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('todoList', JSON.stringify(tasks));
  alert('Tasks saved!');
}

function loadTasks() {
  const saved = localStorage.getItem('todoList');
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(task => {
      const li = createTaskElement(task.text, task.completed);
      taskList.appendChild(li);
    });
  }
}
