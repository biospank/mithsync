var dragger = {
  init: function(opts={}) {
    // var drake = dragula({
    //   copy: true
    // });
    // drake.containers.push(container);

    var drake = dragula(
      [
        document.getElementById(opts.containers.from),
        document.getElementById(opts.containers.to)
      ],
      {
        copy: function (el, source) {
          return source === document.getElementById(opts.containers.from)
        },
        revertOnSpill: true
      }
    );

    drake.on('drop', function(el, target, source, sibling) {
      drake.cancel();
      if(opts.onDropCallback)
        opts.onDropCallback(el.querySelector('img').src)
    }).on('over', function (el, container) {
      container.className += ' ex-over';
    }).on('out', function (el, container) {
      container.className = container.className.replace(' ex-over', '');
    });

    return drake;
  }
}

export default dragger;
