(function() {
  var markup;

  markup = window.Markup || (window.Markup = {});

  markup.Templates = {
    element: _.template("<div class=\"tag\">\n  <span class=\"lt\">&lt;</span>\n  <span class=\"node-name\" contenteditable=\"true\"><%= nodeName %></span>\n  <% if(id !== ''){ %>\n  id=\"<%= id %>\"\n  <% } %>\n  <% if(classes !== ''){ %>\n  class=\"<%= classes %>\"\n  <% } %>\n  <span class=\"gt\">&gt;</span></div>\n<div class=\"contents\">\n  \n</div>\n<form class=\"add\">\n  <input type=\"text\" placeholder=\"+\"></input>\n</form>\n<div class=\"tag close\">\n  <span class=\"gt\">&lt;</span>\n  /<span class=\"node-name\"><%= nodeName %></span>\n  <span class=\"gt\">&gt;</span>\n</div>")
  };

}).call(this);
