This is the contacts list assinment that was set by Tunemelt for Benjamin Cerigo.

The test being:

ASSIGNMENT: 
Please build and small application using at least BackboneJS, Ajax, CSS3, HTML5 and Json. 
--  It should have a responsive layout and all the data should be loaded as Json.
-- Application should consists of 2 layouts
	-- 1. 1st is a list of thumbs. It should contain an image, title sub-text. More thumbs should be loaded if user scrolls to the bottom of the page. 
	-- 2. 2nd layout is a detailed page of the thumb. It should future full page with large image, title and sub-text. User can navigate to this layout by selecting an article from the home page.

Thumbs should have a unique url and user can arrive to the detail article page by a direct link.
Examples:
www.mainsite.com
www.mainsite.com#article-name

In the attachment you'll find a psd. 
You can choose any font you like. 

The final deadline is on tuesday the 16th of sept.


This app inludes Backbone.js, Css, HTML5 ad JSON. 
View app at http://evening-headland-4297.herokuapp.com/
Short explaination:
It is run on top of php and composer is used to manage the packages for the backend.
In the main.js:
The app uses a route to load the user collection. 
This uses Siliex API as a RESTFul server to load the $users array.(this is pretending to be a database). 
The user collection view is bound to the collection and adds each JSON object to the html document. 
funcTestLoad is then tested if more users can be loaded into the list. 
if so loadMore: loads more default users (not from data base just from an id offset in javascript) until the hieght of document is greater then window. 
If scroll reachs bottom then load more. 
Each user list view has a link. If clicked then show route is called:
The show route gets the clicked model from the collection. 
It is then rendered by the UserDetailVeiw. 

Bugs:
There are deffinatly problems is you try to load from a /#{id}
if it is one of the first 12, ie User1, this will be called from the fake data base. If it is bigger then it will not.  
Hopefully there are no problems with the app. 
I was having problems with Firefox loading my css from my local run app but chrome was good. 

Thanks for looking. 
