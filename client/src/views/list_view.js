const PubSub = require('../helpers/pub_sub.js');
const RenderView = require(`./render_view.js`)

const addTask = (container, task) => {
  const taskDiv = document.createElement(`div`);
  const taskTitle = document.createElement(`h3`);
  taskTitle.textContent = task.task;
  taskDiv.appendChild(taskTitle);
  container.appendChild(taskDiv);
  return container;
}

const ListView = function (container) {
  this.container = container;
}

ListView.prototype.bindingEvents = function () {
  PubSub.subscribe('Tasks:all-data-ready', (evt) => {
    const tasks = evt.detail;
    console.log(tasks);
    this.render(tasks);
    console.dir(this.container);
  })
};

ListView.prototype.render = function (tasks) {
  const list = tasks.reduce(addTask, this.container);
};

module.exports = ListView;
