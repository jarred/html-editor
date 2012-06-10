markup = window.Markup ||= {}
markup.Views ||= {}

markup.Views.Document = Backbone.View.extend

  nodeCount: 0

  events:
    'submit .add': 'addElement'
  
  initialize: (@options) ->
    _.bindAll @
    @$el = $(@el)
    return

  addElement: (e) ->
    e.preventDefault()
    $el = $(e.target)
    $input = $el.find('input[type=text]')
    $input.blur()
    val = String $input.val()
    if val.substr(0, 1) == ' '
      # add content
      addition = val
    else
      name = /^[a-z]*/ig
      classes = /\b\.[a-z\-]*\b/ig
      id = /\b\#[a-z\-]*\b/ig
      attrs = /\b\[[a-z\/=-]*\b/ig

      elementModel = new Backbone.Model
        index: @nodeCount
        nodeName: val.match(name)[0] || "div"
        id: ''
        classes: ''

      if val.match(classes)
        s = ''
        _.each val.match(classes), (c) =>
          c = c.replace('.', '')
          s += "#{c} "
        elementModel.set
          classes: s
      if val.match(id)
        elementModel.set
          id: val.match(id)[0].replace('#', '')


      elementView = new markup.Views.Element
        className: 'element'
        model: elementModel
        id: "element#{elementModel.get('index')}"
      addition = elementView.el
      @nodeCount++
    $el.parent().find('> .contents').append addition
    $input.val('')
    return