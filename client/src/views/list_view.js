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

const addTask = (container, task) => {
  const taskDiv = document.createElement(`div`);
  taskDiv.className = `complete-${task.complete}`;

  const taskTitle = document.createElement(`h3`);
  taskTitle.textContent = task.task;

  taskDiv.appendChild(taskTitle);

  taskDiv.addEventListener(`click`, () => {
    task.complete = !task.complete;
    PubSub.publish(`ListView:task-status-update`, task);
  });
  container.appendChild(taskDiv);
  return container;
};

ListView.prototype.render = function (tasks) {
  this.container.innerHTML = ``;
  const list = tasks.reduce(addTask, this.container);
};

module.exports = ListView;
