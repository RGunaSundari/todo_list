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

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
  });

  // Task text
  const span = document.createElement('span');
  span.textContent = taskText;
  span.style.flex = '1';

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('removeBtn');
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
  });

  // Append elements
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(removeBtn);

  if (completed) {
    li.classList.add('completed');
  }

  return li;
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const checkbox = li.querySelector('input[type="checkbox"]');
    const span = li.querySelector('span');
    tasks.push({ text: span.textContent, completed: checkbox.checked });
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
