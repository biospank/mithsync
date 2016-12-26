var feedbackButton = {
  controller: function(attrs) {
    var ctrl = this;
    ctrl.label = m.prop(attrs.label);
    ctrl.style = m.prop(attrs.style);

    ctrl.actionWithFeedback = function(event) {
      event.preventDefault();

      ctrl.label(attrs.feedbackLabel);
      ctrl.style(ctrl.style() + ' disabled');
      m.redraw();

      attrs.action({background: true}).then(function() {
        ctrl.label(attrs.label);
        ctrl.style(attrs.style);
        m.redraw();
      });
    }

  },
  view: function(ctrl, attrs) {
    ctrl.disabled = m.prop(attrs.disabled || false);

    return m("button[type=submit]", {
              disabled: ctrl.disabled(),
              class: ctrl.style() + (ctrl.disabled() ? ' disabled' : ''), //'btn btn-success btn-lg',
              onclick: ctrl.actionWithFeedback
            }, ctrl.label());
  }
};

export default feedbackButton;
