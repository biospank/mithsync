var confirmDialog = (function() {
  var msg = "Change me";
  var cbConfirm = function() {};
  var cbCancel = function() {};

  var hide = function() {
    $("#confirmDialog").hide();
  };

  var show = function() {
    $("#confirmDialog").fadeIn( "fast" );
  };

  return {
    init: function(opts) {
      msg = opts.msg || msg;
      cbConfirm = opts.cbConfirm || cbConfirm;
      cbCancel = opts.cbCancel || cbCancel;

      show();
    },
    controller: function() {
      var ctrl = this;

      ctrl.confirm = function(){
        cbConfirm();
        hide();
      };
      ctrl.cancel = function(){
        cbCancel();
        hide();
      };
    },
    view: function(ctrl) {
      return m(".modal bs-example-modal-sm", {
        tabindex: "-1",
        role: "dialog",
        id: "confirmDialog" }, [
        m(".modal-dialog", {
          class: "modal-sm"
        }, [
          m(".modal-content", [
            m(".modal-body", [
              m("p", { class: "text-center no-margin" }, msg)
            ]),
            m(".modal-footer", [
              m("button", {
                type: "button",
                class: "btn btn-success",
                "data-dismiss": "modal",
                onclick: ctrl.confirm
              }, "Confirm"),
              m("button", {
                type: "button",
                class: "btn btn-danger",
                "data-dismiss": "modal",
                onclick: ctrl.cancel
              }, "Cancel")
            ])
          ])
        ])
      ])
    }
  };
})();

export default confirmDialog;
