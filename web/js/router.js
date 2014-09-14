// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  
], function($, _, Backbone) {
 console.log('PHP Router');
 

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
     
      // Default
      "": 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:show', function(name){
   
      //this.collection.showDetails(name);

    });


    app_router.on('route:defaultAction', function () {
       // We have no matching route, lets display the home page 
       
       var MessageModel = Backbone.Model.extend({   
        defaults: {
        message: "Text Message"
      }
    });
  
  
    var msg = new MessageModel();
    console.log(msg.get('message'));

        
    });

    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
   // var footerView = new FooterView();

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
