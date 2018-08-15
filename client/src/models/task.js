const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');

const Task = function () {
  this.url = 'http://localhost:3000/api/tasks';
  this.request = new Request(this.url);
}

Task.prototype.bindingEvents = function () {

  PubSub.subscribe(`ListView:task-status-update`, (evt) => {
    const taskCompleteStatus = {complete: evt.detail.complete};
    const taskId = evt.detail._id;
    this.request.update(taskId, taskCompleteStatus)
    .then((tasks) => {
      PubSub.publish('Tasks:all-data-ready', tasks);
    })
    .catch((err) => {
      console.error(err);
    });
  });

  PubSub.subscribe(`FormView:new-entry`, (evt) => {
    const task = evt.detail;
    console.log(task);
    this.request.post(task)
    .then((tasks) => {
      PubSub.publish('Tasks:all-data-ready', tasks);
    })
    .catch((err) => {
      console.error(err);
    });
  })

};

Task.prototype.getData = function () {
  this.request.get()
    .then((tasks) => {
      PubSub.publish('Tasks:all-data-ready', tasks);
      console.dir(tasks);
    })
    .catch((err) => {
      console.error(err);
    });
};


module.exports = Task;
