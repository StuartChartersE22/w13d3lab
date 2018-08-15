const Task = require('./models/task.js');
const ListView = require('./views/list_view.js');
const FormView = require(`./views/form_view.js`)

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector(`form#form`);
  const formView = new FormView(form);
  formView.bindingEvents();

  const container = document.querySelector(`.task-list`);
  const listView = new ListView(container);
  listView.bindingEvents();

  const task = new Task();
  task.bindingEvents();
  task.getData();
});
