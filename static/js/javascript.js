console.log("ok");

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1778865799042954',
      xfbml      : true,
      version    : 'v2.3'
    });
    FB.AppEvents.logPageView();
    $( document ).ready(function() {
        FB.login(function(response) {
        if (response.status === 'connected') {
        	
          // Logged into your app and Facebook.
          FB.api('/me/taggable_friends?limit=5000', function(response) {
	          console.log(response);
	          displayFriends(response);
	      });

	      FB.api('/me/feed', function(response) {
	          console.log(response);
	          displayPostLikes(response);
	          displayPostReactions(response);
	          //displayPostComments(response);
	      });
	      
	      
	      FB.api('/me/inbox', function(response) {
	          console.log(response);
	          //displayPostLikes(response);
	
	      });
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
        }
      },{scope: 'public_profile, email, user_about_me, user_actions.books, user_actions.fitness, user_actions.music, user_actions.news, user_actions.video, user_birthday, user_education_history, user_events, user_games_activity, user_hometown, user_likes, user_location, user_managed_groups, user_photos, user_posts, user_relationships, user_relationship_details, user_religion_politics, user_friends, user_tagged_places, user_videos, user_website, user_work_history, read_custom_friendlists, read_insights, read_audience_network_insights, read_page_mailboxes, manage_pages, publish_pages, publish_actions, rsvp_event, pages_show_list, pages_manage_cta, pages_manage_instant_articles, ads_read, ads_management, pages_messaging, pages_messaging_subscriptions,  pages_messaging_phone_number, user_posts'});

    });
  }; 

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

/*
function displayFriends(id){
	//http://stackoverflow.com/a/28947185\
	var access_token = 1778865799042954;
	var app_secret = "0d33d2412d3555f0a3e15aedbd20ed5e";
	var url = "https://graph.facebook.com/" + id + "/friends?limit=0&access_token=" + access_token + "|"  + app_secret;
	 $.getJSON(url, function(mydata) {
        var output="<ul>";
        for (var i in mydata.data) {
            output+="<li>NAMA : " + mydata.data[i].name + "<br/>ID : " + mydata.data[i].id + "</li>";
        }

        output+="</ul>";
        document.getElementById("placeholder").innerHTML=output;   });
}
*/
function displayFriends(response){
	var output="<ul>";
    for (var i in response.data) {
        output+="<li>NAME : " + response.data[i].name + "<br/>ID : " + response.data[i].id + "</li>";
    }

    output+="</ul>";
    document.getElementById("placeholder").innerHTML=output;
}

function displayFeed(response){
	var output="<ul>";
    for (var i in response.data) {
        output+="<li>NAME : " + response.data[i].name + "<br/>ID : " + response.data[i].id + "</li>";
    }

    output+="</ul>";
    document.getElementById("placeholder").innerHTML=output;
}

function displayPostLikes(response){
	for (var i in response.data) {
		FB.api(
		    "/" + response.data[i].id + "/likes",
		    function (response) {
		      if (response && !response.error) {
		        /* handle the result */
		        console.log(response);
		      }
		    }
		);
        
    }
	console.log();
}

function displayPostReactions(response){
	for (var i in response.data) {
		FB.api(
		    "/" + response.data[i].id + "/reactions",
		    function (response) {
		      if (response && !response.error) {
		        /* handle the result */
		        console.log(response);
		      }
		    }
		);
        
    }
	console.log();
}

function displayPostComments(response){
	for (var i in response.data) {
		FB.api(
		    "/" + response.data[i].id + "/comments",
		    function (response) {
		      if (response && !response.error) {
		        /* handle the result */
		        console.log(response);
		      }
		    }
		);
        
    }
    //YOU CAN ACCESS USER'S ID THROUGH "FROM" OBJECT
	console.log();
}


//messages
//mutual likes
//mutual freinds req
//your own comments' likes
//nested comments