const Task = require('./models/task.js');

document.addEventListener('DOMContentLoaded', () => {
  const task = new Task();
  task.getData();
});
