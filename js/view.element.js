(function() {
  var markup;

  markup = window.Markup || (window.Markup = {});

  markup.Views || (markup.Views = {});

  markup.Views.Element = Backbone.View.extend({
    events: {
      'blur .node-name': 'nodeNameActions',
      'keydown .node-name': 'nodeNameActions',
      'keydown .add input': 'checkForRemoval'
    },
    initialize: function(options) {
      this.options = options;
      _.bindAll(this);
      this.$el = $(this.el);
      this.render();
    },
    render: function() {
      var _this = this;
      this.$el.html(markup.Templates.element(this.model.toJSON()));
      setTimeout(function() {
        return _this.$('input').focus();
      }, 200);
    },
    nodeNameActions: function(e) {
      var $el, text;
      e.stopPropagation();
      $el = $(e.target);
      switch (e.type) {
        case 'keydown':
          if (e.which === 13) {
            e.preventDefault();
            $el.blur();
          }
          break;
        case 'focusout':
          text = $el.text();
          this.model.set({
            nodeName: text
          });
          this.$("> .tag .node-name").text(this.model.get('nodeName'));
      }
    },
    checkForRemoval: function(e) {
      var $el;
      e.stopPropagation();
      $el = $(e.target);
      if (e.which === 8 && $el.val() === '') {
        $el.blur();
        this.destroy();
      }
    },
    destroy: function() {
      this.remove();
    }
  });

}).call(this);
