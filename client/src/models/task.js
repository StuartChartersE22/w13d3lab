const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request_helper.js');

const Task = function () {
  this.url = 'http://localhost:3000/api/tasks';
  this.request = new Request(this.url);
}

Task.prototype.getData = function () {
  this.request.get()
    .then((tasks) => {
      PubSub.publish('Tasks:all-data-ready', tasks);
    })
    .catch((err) => {
      console.error(err);
    });
};


module.exports = Task;
