const PubSub = require('../helpers/pub_sub.js');
const RenderView = require(`./render_view.js`)

const ListView = function (container) {
  this.container = container;
}

ListView.prototype.bindingEvents = function () {
  PubSub.subscribe('Tasks:all-data-ready', (evt) => {
    const tasks = evt.detail;
    this.render(tasks);
  })
};

ListView.prototype.render = function (tasks) {
  this.container.innerHTML = ``;
  const list = tasks.reduce(addTask, this.container);
};

module.exports = ListView;

function addTask (container, task) {
  const taskDiv = document.createElement(`div`);
  taskDiv.className = `task-div`;

  const taskTitle = document.createElement(`h3`);
  taskTitle.textContent = task.task;
  taskTitle.className = `complete-${task.complete}`;

  taskDiv.appendChild(taskTitle);

  const deleteButton = document.createElement(`button`);
  deleteButton.value = task._id;
  deleteButton.className = `delete-button`;
  deleteButton.textContent = `Delete`;
  deleteButton.addEventListener(`click`, (evt) => {
    PubSub.publish(`ListView:delete-task`, evt.target.value);
  })

  taskDiv.appendChild(deleteButton);

  taskDiv.addEventListener(`click`, () => {
    task.complete = !task.complete;
    PubSub.publish(`ListView:task-status-update`, task);
  });
  container.appendChild(taskDiv);
  return container;
};
