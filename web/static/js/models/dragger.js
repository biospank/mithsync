var dragger = {
  init: (opts={}) => {
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
        copy: (el, source) => {
          return source === document.getElementById(opts.containers.from)
        },
        revertOnSpill: true
      }
    );

    drake.on('drop', (el, target, source, sibling) => {
      drake.cancel();
      if(opts.onDropCallback)
        opts.onDropCallback(el.dataset.url)
    }).on('over', (el, container) => {
      container.className += ' ex-over';
    }).on('out', (el, container) => {
      container.className = container.className.replace(' ex-over', '');
    });

    return drake;
  }
}

export default dragger;
