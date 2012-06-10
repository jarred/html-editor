markup = window.Markup ||= {}

markup.Main =
  init: ->
    @loadLibs()
    return

  loadLibs: ->
    require [
      "http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js"
      "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js"
    ], () =>
      require [
        "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js"
      ], () =>
        require [
          "js/templates"
          "js/view.document"
          "js/view.element"
        ], markup.Main.startApp
    return

  startApp: ->
    markup.Main.extendViews()
    return

  extendViews: ->
    _.each $('.extend'), (el) =>
      $el = $(el)
      name = $el.data('view')
      return if name is null or name is ''
      return if markup.Views[name] is undefined
      view = new markup.Views[name]
        el: $el
      $el.removeClass 'extend'      
      $el.addClass 'extended'
      return
    return

markup.Main.init()