var feedbackButton = {
  controller: function(attrs) {
    var ctrl = this;
    ctrl.label = m.prop(attrs.label);
    ctrl.style = m.prop(attrs.style);

    ctrl.actionWithFeedback = function(event) {
      event.preventDefault();
      ctrl.label(attrs.feedbackLabel);
      ctrl.style(ctrl.style() + ' disabled');

      attrs.action({background: true}).then(function() {
        ctrl.label(attrs.label);
        ctrl.style(attrs.style);
        m.redraw();
      });
    }
  },

  view: function(ctrl, attrs) {
    return m("button[type=submit]", {
              class: ctrl.style(), //'btn btn-success btn-lg',
              onclick: ctrl.actionWithFeedback
            }, ctrl.label());
  }
};

export default feedbackButton;
