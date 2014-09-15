function ajaxGo(){
  $.ajax({
    type: 'GET',
      url: './api/users',
      success: function(data){
        //console.log(data);
      }

    });
}
ajaxGo();

$( document ).ajaxError(function(e, j, po, str) {
   
  alert( 'Sorry there was an Error' + str);
});


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
            img: './img/defaultUserImage.png',
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
      
      
    
    });

//------------------------------------------------------Views

// View that stats that View of all the details of a User
App.Views.UserDetailView = Backbone.View.extend({
    el: $("#page"),

    
 
  
  initialize: function(){
    //this.model = new App.Models.UserModel();
    //this.model.fetch();
    

  },

    render: function(){
      $(this.el).empty();
      console.log(this.model.toJSON());
      var atemplate = _.template($('#tpl_userdetail').html());
      $(this.el).html(atemplate(this.model.toJSON()));

    }
});

//View that starts the view of each user in the list

App.Views.UserListView = Backbone.View.extend({
    
    className: 'user-list-item',
    model: App.Models.UserModel,
    initialize: function(){
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    },
    
    

    render: function(){
     console.log($('#tpl_userlist'));
     var atemplate = _.template($('#tpl_userlist').html());
     
      this.$el.html(atemplate(this.model.toJSON()));
      return this;
    }

  });

//View that is the collection of UserListViews

App.Views.UserCollectionView = Backbone.View.extend({
    
   
   className: 'usercollection',
    initialize: function(){
      _.bindAll(this, 'render');
      this.model.bind('reset', this.render);
      this.model.bind('change', this.render);
      this.model.bind('add', this.addOne);

       
      
      //console.log(this.collection.toJSON());   

    },

    addOne: function(userModel){
      
      var userlistview = new App.Views.UserListView({model: userModel});
      var rendered = userlistview.render().el;
      //console.log(rendered);
     $('#page').append(rendered);

    }, 

    render: function(){
      
      var atemplate = _.template($('#tpl_usercollection').html());
      
      this.model.forEach(this.addOne, this);
    }

  });


//-------------------------------------------------------------- Routers

App.Router = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      
      // Default
      "": 'showUserList',
      "*name": "show",
    },
    initialize: function(){


    },
    show: function(id){
      if(typeof(App.Collections.user_collection) == 'undefined'){
      console.log(id);
      var user = new App.Models.UserModel({id:id});
      user.fetch();
    }else{
      var user = App.Collections.user_collection.get(id);
    }
      //console.log(user);
      var user_view = new App.Views.UserDetailView({el: $('#page'), model: user});
      user_view.render();

    },

    showUserList: function(){
      $('#page').empty();
      App.Collections.user_collection = new App.Collections.UserCollection();
      
      var user_collection_view = new App.Views.UserCollectionView({model: App.Collections.user_collection });
      App.Collections.user_collection.fetch({success: function(collection, response){
        //console.log(collection + response);
      }
    });
      
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

