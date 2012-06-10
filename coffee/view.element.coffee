markup = window.Markup ||= {}
markup.Views ||= {}

markup.Views.Element = Backbone.View.extend

  events:
    'blur .node-name': 'nodeNameActions'
    'keydown .node-name': 'nodeNameActions'
    'keydown .add input': 'checkForRemoval'

  initialize: (@options) ->
    _.bindAll @
    @$el = $(@el)
    # console.log @model.toJSON()
    @render()
    return

  render: ->
    @$el.html markup.Templates.element @model.toJSON()

    setTimeout () =>
      @$('input').focus()
    , 200
    return

  nodeNameActions: (e) ->
    e.stopPropagation()
    # e.stopImmediatePropagation()
    $el = $ e.target
    switch e.type
      when 'keydown'
        if e.which == 13
          e.preventDefault()
          $el.blur()
      when 'focusout'
        text = $el.text()
        @model.set
          nodeName: text
        @$("> .tag .node-name").text @model.get('nodeName')
    return

  checkForRemoval: (e) ->
    e.stopPropagation()
    $el = $(e.target)
    if e.which == 8 && $el.val() == ''
      $el.blur()
      @destroy()
    return

  destroy: ->
    @remove()
    return