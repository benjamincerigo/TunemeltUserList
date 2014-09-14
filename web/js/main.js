console.log('hello');

var MessageModel = Backbone.Model.extend({ 
urlRoot: './api/index.php',
    defaults: {
        message: "Hello"
    }
});

var MessageView = Backbone.View.extend({
 
    template: _.template('<div><%= message %></div>'),
 
    render:function () {
       
       
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var MessageRouter = Backbone.Router.extend({
  el: $('#page'),
  initialize: function(){
    _.bindAll(this, 'fetchSuccess');
  }, 
    routes:{
        "*action": "displayMessage"
    },
    displayMessage: function() {
      this.model = new MessageModel();


       this.view = new MessageView({model:this.model});
       
       this.model.fetch({
          success: this.fetchSuccess,
          error: this.fetchError
        });
      
           
    },

    fetchSuccess: function(m, response, options){
      
      $(this.el).html(this.view.render().el);


    },
    fetchError: function(m, response, options){
       $(this.el).html("Error in Fetch");
    }
});


 
var messageRouter = new MessageRouter();
Backbone.history.start();


