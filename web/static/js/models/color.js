var Color = (function() {
  const range = [
    'LAVENDER',
    'MEDIUMPURPLE',
    'LIGHTSEAGREEN',
    'MEDIUMTURQUOISE',
    'LIGHTSTEELBLUE',
    'LIGHTBLUE',
    'DEEPSKYBLUE',
    'GAINSBORO'
  ];

  return {
    sample: function() {
      return _.sample(
        Please.make_color(
          {
            // golden: false,
            // format: 'rgb-string',
            base_color: _.sample(range),
            saturation: .2,
            value: .8,
            colors_returned: 10,
          }
        )
      );
    }
  }
})();

export default Color;
