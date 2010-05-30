callbacks['com.ashman.lockinfo.TwitterPlugin'] = updateTwitter;
var twitterDIV;

function updateTwitter(twitter){
	
	var pluginKey = "twitter";
	
	if(!twitterDIV){
		return false;
	}
	
	var newItems = false;
	var previous = twitterDIV.data("previous");
	if(!twitter){
		if(previous){
			twitter = previous;
		} else {
			return false;
		}
	} else {
		newItems = gotNewItems(twitter.tweets, previous ? previous.tweets : []);
	}
	
	var tweets = twitter.tweets;
	var html = "";
	var limit = twitterDIV.data("limit");

	clearRelativeTimers(twitterDIV);
	if(twitterDIV && tweets.length){
		twitterDIV.data("previous",twitter);
		
		var relativeTimes = [];
		var alt = '';
		
		for(i = 0; i < tweets.length && i < limit; i++){
			var date = new Date(tweets[i].date*1000);
			// tweet = {name,date, tweet, friend,screenName,image}
			html += "<div class='item "+verboseClass(pluginKey)+" twitter-item"+alt+"'><div class='image-holder'>";
				html += "<div class='twitter-header'>";
					html += "<img src='"+tweets[i].image+"' class='secondary-info' />";
					html += "<span class='twitter-author color2'>"+tweets[i].screenName+"</span> <span class='twitter-author-name'>("+tweets[i].name+")</span>";
					html += "<div class='twitter-time'>";
						html += "<span class='secondary-info'>@ <span class='twitter-time color1'>"+date.format(date.isSameDay() ? format_time : format_date_time_short);
						if(displayRelativeTimes){
							html += " <span id='twitter"+i+"'> </span>";
							relativeTimes.push(["twitter"+i, date]);
						}
						html += "</span></span>";
					html += "</div>"; //twitter-time
				html += "</div>"; // twitter-header
				html += "<div class='twitter-text secondary-info'>"+tweets[i].tweet+"</div>";
				
			html += "</div></div>"; // twitter-item
			
			alt = alt ? '' : " second";
		}

//		if(displayLoadMore && tweets.length > twitterDIV.limit){
//			addLoadMoreBar(twitterDIV);
//		}		
	} 
	
	html = html ? html : "<div class='item'>"+noItems[pluginKey]+"</div>";
	
	twitterDIV.html(html);
	if (!disableBadges(pluginKey))
		showNewItemsBadge(pluginKey, getCount(tweets.length,limit));
	reloadContentIfSelected(pluginKey);
	
	for(i = 0; i < relativeTimes.length; i++){
		relativeTime(twitterDIV, relativeTimes[i][0], relativeTimes[i][1], false, false, string_justNow.upperFirst());
	}
	
	if (enableNotifications(pluginKey)){
		if (tweets.length && newItems){
			flashNotification(notificationMessages[pluginKey], pluginKey);
		}
		if (!tweets.length){
			removeNotification(pluginKey);
		}
	}
	return true;
}