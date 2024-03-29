//Ajax test

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

//If ajax Error aller
$( document ).ajaxError(function(e, j, po, str) {
   
  alert( 'Sorry there was an Error' + str);
});

// Set App object
var App = {
  Models: {},
  Collections: {},
  Views: {},
  offset: 0,
  limit: 100,
 
}


///-------------------------------------------------------Models
//User model
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
//User collection
App.Collections.UserCollection = Backbone.Collection.extend({
       model: App.Models.UserModel,
      url: './api/users',
      initialize: function(){
        
      }, 


      
      
    
    });

//------------------------------------------------------Views

// View that starts that View of all the details of a User
App.Views.UserDetailView = Backbone.View.extend({
    el: $("#page"),

    
 
  
  initialize: function(){
    //this.model = new App.Models.UserModel();
    //this.model.fetch();
    

  },

    render: function(){
      $(this.el).empty();
      
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
      
      $(document).scroll(this.scrollTest);

       
      
      //console.log(this.collection.toJSON());   

    },
    events: {
      'testLoad' : 'funcTestLoad'
    },

    addOne: function(userModel){
      
      var userlistview = new App.Views.UserListView({model: userModel});
      var rendered = userlistview.render().el;
      //console.log(rendered);
     $('#page').append(rendered);

    }, 

    render: function(){
       console.log('render');
      var atemplate = _.template($('#tpl_usercollection').html());
      
      this.model.forEach(this.addOne, this);
      //console.log($(document).height());

      
    },
    

    scrollTest: function(){
      if(App.scrollAddHelp){
          
        var difference = $(document).height()-$( window ).height();
       
        
        if ($(document).scrollTop() >= (difference-3)){
          
         App.Views.user_collection_view.loadMore();
         
       };
     }
   },

   loadMore: function(){
    var jsonToAdd = [];
           for(i = App.offset; i < (App.offset + 3); i++ ){
            jsonToAdd.push( {'id': i});
           }
         App.offset += 3;
        
         App.Collections.user_collection.add(jsonToAdd);
         this.funcTestLoad();
   },

   funcTestLoad: function(){
    console.log('before:'+ $('#page').height()+ $( window ).height());

    if($('#page').height() < ($( window ).height())){
   
      this.loadMore();
       console.log('after:'+ $('#page').height()+ $( window ).height());
    };
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
    //Show clicked user model
    show: function(id){
      App.scrollAddHelp = false;
      if(typeof(App.Collections.user_collection) == 'undefined'){
     // console.log(id);
      var user = new App.Models.UserModel({id:id});
      user.fetch();
    }else{
      var user = App.Collections.user_collection.get(id);
    }
      //console.log(user);
      var user_view = new App.Views.UserDetailView({el: $('#page'), model: user});
      user_view.render();

    },

    //show full user list
    showUserList: function(){
      App.scrollAddHelp = true;
      $('#page').empty();
      App.Collections.user_collection = new App.Collections.UserCollection();
      
      App.Views.user_collection_view = new App.Views.UserCollectionView({model: App.Collections.user_collection });
      App.Collections.user_collection.fetch({success: function(collection, response){
        
        App.Views.user_collection_view.funcTestLoad();
      }});
    }
      


  });
  
//Run the app
App.app = new App.Router();


//The history
Backbone.history.start();
