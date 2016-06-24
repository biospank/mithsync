var feedbackButton = {
  controller: function(attrs) {
    var ctrl = this;
    ctrl.label = m.prop(attrs.label);

    ctrl.actionWithFeedback = function(event) {
      event.preventDefault();
      ctrl.label(attrs.feedbackLabel);

      attrs.action({background: true}).then(function() {
        ctrl.label(attrs.label);
        m.redraw();
      });
    }
  },

  view: function(ctrl, attrs) {
    return m("button[type=submit]", {
              class: 'btn btn-success btn-lg',
              onclick: ctrl.actionWithFeedback
            }, ctrl.label());
  }
};

export default feedbackButton;
