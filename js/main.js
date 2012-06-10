(function() {
  var markup;

  markup = window.Markup || (window.Markup = {});

  markup.Main = {
    init: function() {
      this.loadLibs();
    },
    loadLibs: function() {
      var _this = this;
      require(["http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js", "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js"], function() {
        return require(["http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js"], function() {
          return require(["js/templates", "js/view.document", "js/view.element"], markup.Main.startApp);
        });
      });
    },
    startApp: function() {
      markup.Main.extendViews();
    },
    extendViews: function() {
      var _this = this;
      _.each($('.extend'), function(el) {
        var $el, name, view;
        $el = $(el);
        name = $el.data('view');
        if (name === null || name === '') return;
        if (markup.Views[name] === void 0) return;
        view = new markup.Views[name]({
          el: $el
        });
        $el.removeClass('extend');
        $el.addClass('extended');
      });
    }
  };

  markup.Main.init();

}).call(this);
