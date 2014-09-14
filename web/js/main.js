
var App = {
  Models: {},
  Collections: {},
  Views: {},
 
}


///-------------------------------------------------------Models
App.Models.UserModel = Backbone.Model.extend({
    urlRoot: './api/users',
    
  defaults: {
            name: 'Benjamin Cerigo',
            email: 'email@someplace.nl',
            city: 'Amsterdam',
            venue: 'Paradiso',
            telephone: '00Atelphone',
            notes: ''
        }
});

///------------------------------------------------------Colections

App.Collections.UserCollection = Backbone.Collection.extend({
       model: App.Models.UserModel,
      url: './api/users',
      initialize: function(){
        console.log('started to Collection');
      }, 
      fetch: function(){
        console.log('collection reset');
      },
      change: function(){
        console.log('collection change');
      }
    
    });

//------------------------------------------------------Views

// View that stats that View of all the details of a User
App.Views.UserDetailView = Backbone.View.extend({
    el: $("#page"),

    model: App.Models.UserModel,
 
  
  initialize: function(){
    this.model = new App.Models.UserModel();
    this.model.fetch();
    

  },

    render: function(){
      var atemplate = _.template($('#tpl_userdetail').html());
      $(this.el).html(template(this.model.toJSON()));

    }
});

//View that starts the view of each user in the list

App.Views.UserListView = Backbone.View.extend({
    
    
    model: App.Models.UserModel,
    initialize: function(){
      _.bindAll(this, 'render', 'on_click');
      this.model.bind('change', this.render);
    },
    
    

    render: function(){
     var atemplate = _.template($('#tpl_userlist').html());
      $(this.el).append(atemplate(this.model.toJSON()));
      return this;
    },

  });

//View that is the collection of UserListViews

App.Views.UserCollectionView = Backbone.View.extend({
    el: $('#page'),
   
   
    initialize: function(){
      _.bindAll(this, 'render');
      this.model.bind('reset', this.render);
      this.model.bind('change', this.render);
      this.model.bind('add', this.addOne);

       
      
      //console.log(this.collection.toJSON());   

    },

    addOne: function(contactModel){

      var userlistview = new App.Views.UserListView({model: App.Models.UserModel});
      
     $(this.el).append(userlistview.render().el);
    }, 

    render: function(){
      
      var atemplate = _.template($('#tpl_usercollection').html());
      $(this.el).html(atemplate);
      this.model.forEach(this.addOne, this);
    }

  });


//-------------------------------------------------------------- Routers

App.Router = Backbone.Router.extend({
    routes: {
      // Define some URL routes
     "users/p:name": "show", 
      // Default
      '*actions': 'showUserList'
    },
    initialize: function(){


    },
    show: function(name){
      var user = new App.Models.User({name: name});
      var user_view = new App.Views.UserDetailView({el: $('#content'), model: user});
      user.fetch();
    },

    showUserList: function(){
      
      var user_collection = new App.Collections.UserCollection();
      
      var user_collection_view = new App.Views.UserCollectionView({el: $('#page'), model: user_collection });
      user_collection.fetch({reset: true});
      console.log(user_collection);
    }


  });
  
  App.app = new App.Router();

Backbone.history.start();
/*
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
      console.log(m.attributes);
      $(this.el).html(this.view.render().el);

    },
    fetchError: function(m, response, options){
       $(this.el).html("Error in Fetch");
    }
});


 
var messageRouter = new MessageRouter();
Backbone.history.start();
*/

