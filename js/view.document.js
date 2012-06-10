(function() {
  var markup;

  markup = window.Markup || (window.Markup = {});

  markup.Views || (markup.Views = {});

  markup.Views.Document = Backbone.View.extend({
    nodeCount: 0,
    events: {
      'submit .add': 'addElement'
    },
    initialize: function(options) {
      this.options = options;
      _.bindAll(this);
      this.$el = $(this.el);
    },
    addElement: function(e) {
      var $el, $input, addition, attrs, classes, elementModel, elementView, id, name, s, val,
        _this = this;
      e.preventDefault();
      $el = $(e.target);
      $input = $el.find('input[type=text]');
      $input.blur();
      val = String($input.val());
      if (val.substr(0, 1) === ' ') {
        addition = val;
      } else {
        name = /^[a-z]*/ig;
        classes = /\b\.[a-z\-]*\b/ig;
        id = /\b\#[a-z\-]*\b/ig;
        attrs = /\b\[[a-z\/=-]*\b/ig;
        elementModel = new Backbone.Model({
          index: this.nodeCount,
          nodeName: val.match(name)[0] || "div",
          id: '',
          classes: ''
        });
        if (val.match(classes)) {
          s = '';
          _.each(val.match(classes), function(c) {
            c = c.replace('.', '');
            return s += "" + c + " ";
          });
          elementModel.set({
            classes: s
          });
        }
        if (val.match(id)) {
          elementModel.set({
            id: val.match(id)[0].replace('#', '')
          });
        }
        elementView = new markup.Views.Element({
          className: 'element',
          model: elementModel,
          id: "element" + (elementModel.get('index'))
        });
        addition = elementView.el;
        this.nodeCount++;
      }
      $el.parent().find('> .contents').append(addition);
      $input.val('');
    }
  });

}).call(this);
