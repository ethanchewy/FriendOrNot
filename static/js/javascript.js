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
          var friends;
          FB.api('/me/taggable_friends?limit=5000', function(response) {
	          console.log(response);
	          displayFriends(response);
	          friends = response;
	          //displayMutualFriends(response);
	      });
	      
          
	      FB.api('/me/feed?limit=5000', function(response) {
	          //console.log(response);
	          //displayPostLikes(response);
	          var reactions = displayPostReactions(response);
	          
	          var comments = displayPostComments(response);
	          //var list = 
	          displayTotalScoreComments(reactions, comments, friends);

	      });
	      
	      /*
	      FB.api('/me/inbox', function(response) {
	          console.log(response);
	          //displayPostLikes(response);
	
	      });
	      */
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
        output+="<img href=" + ">"+"</img>"+"<li>NAME : " + response.data[i].name + "<br/>ID : " + response.data[i].id + "</li>";
    }

    output+="</ul>";
    document.getElementById("friend_score").innerHTML=output;
}

function displayFeed(response){
	var output="<ul>";
    for (var i in response.data) {
        output+="<li>NAME : " + response.data[i].name + "<br/>ID : " + response.data[i].id + "</li>";
    }

    output+="</ul>";
    document.getElementById("placeholder").innerHTML=output;
}
/*
function displayPostLikes(response){
	var total ={items:[]};
	var output="<pre>"
	for (var i in response.data) {
		FB.api(
		    "/" + response.data[i].id + "/likes",
		    function (response) {
		      if (response && !response.error) {
		        total.items.push(response);
		        output+=JSON.stringify(response);
		      }
		    }
		);
        
    }
    output+="</pre>";
    document.getElementById("placeholder").innerHTML=output;
    console.log("displayPostLikes");
    console.log(total);
	console.log();
}
*/
var convArrToObj = function(array){
    var thisEleObj = new Object();
    if(typeof array == "object"){
        for(var i in array){
            var thisEle = convArrToObj(array[i]);
            thisEleObj[i] = thisEle;
        }
    }else {
        thisEleObj = array;
    }
    return thisEleObj;
}
function displayPostReactions(response){
	var total ={items:[]};
	for (var i in response.data) {
		FB.api(
		    "/" + response.data[i].id + "/reactions",
		    function (response) {
		      if (response && !response.error) {
		        /* handle the result */
		        total.items.push(response);
		        //console.log(Object.prototype.toString.call(response));
		      }
		    }
		);
        
    }
    //console.log("displayPostReactions");
    //console.log(total);
	console.log();
	console.log(Object.prototype.toString.call(total));
	console.log(convArrToObj(total));
	return total;
}

function displayPostComments(response){
	var total ={items:[]};
	for (var i in response.data) {
		FB.api(
		    "/" + response.data[i].id + "/comments",
		    function (response) {
		      if (response && !response.error) {
		        /* handle the result */
		        total.items.push(response);
		        //console.log(Object.prototype.toString.call(response));
		      }
		    }
		);
        
    }
    //YOU CAN ACCESS USER'S ID THROUGH "FROM" OBJECT
	//console.log("displayPostComments");
    //console.log(total);
	console.log(Object.prototype.toString.call(total));
	console.log(convArrToObj(total));
	return total;
}
function displayTotalScoreComments(reactions, comments, friends){
	post_likes = reactions;
	post_comments = comments;
	friends_list = friends;
	//console.log(displaytTOtalScoreComments);
	/*
	console.log("friends_list");
	console.log(friends);
	console.log("post_list_likes");
	console.log(post_likes);
	console.log("post_list_comments");
	console.log(post_comments);
	*/
	$.getJSON('/test_model', {
		//friends: friends_list,
      	post_list_likes :  post_likes,
      	post_list_comments: post_comments
    }, function(data) {
    	console.log(data);
    	current_text = data;
    	return false;
    });
    

}
/*
function displayMutualFriends(response){
	for (var i in response.data) {
		FB.api(
		    "/" + response.data[i].id,
		    {
		        "fields": "context.fields(all_mutual_friends.limit(100))"
		    },
		    function (response) {
		      if (response && !response.error) {

		        console.log(response);
		      }
		    }
		);
        
    }
    console.log("displayMutualFriends");

	console.log();
}
*/

//messages
//mutual likes
//mutual freinds req
//your own comments' likes
//nested comments