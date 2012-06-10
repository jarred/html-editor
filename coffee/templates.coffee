markup = window.Markup ||= {}

markup.Templates =

  # div.element
  element: _.template """
  <div class="tag">
    <span class="lt">&lt;</span>
    <span class="node-name" contenteditable="true"><%= nodeName %></span>
    <% if(id !== ''){ %>
    id="<%= id %>"
    <% } %>
    <% if(classes !== ''){ %>
    class="<%= classes %>"
    <% } %>
    <span class="gt">&gt;</span></div>
  <div class="contents">
    
  </div>
  <form class="add">
    <input type="text" placeholder="+"></input>
  </form>
  <div class="tag close">
    <span class="gt">&lt;</span>
    /<span class="node-name"><%= nodeName %></span>
    <span class="gt">&gt;</span>
  </div>
  """