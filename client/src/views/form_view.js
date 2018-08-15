const PubSub = require('../helpers/pub_sub.js');

const FormView = function (form) {
  this.form = form;
}

FormView.prototype.bindingEvents = function () {
  this.form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const task = {
      task: evt.target.task.value,
      complete: false
    }
    PubSub.publish(`FormView:new-entry`, task);
  })
};

module.exports = FormView;
