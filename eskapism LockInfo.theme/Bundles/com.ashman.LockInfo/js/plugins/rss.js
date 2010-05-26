var rssDIV;

if (useRSSplugin) {
	callbacks['com.ashman.lockinfo.RSSPlugin'] = updateRSS;
}

var currentRSSfeed = 0;
var loadedFeeds = []
var manualLoadRssCallback = 0;
                   
function refreshRSS(){
	var pluginKey = "rss";
	flashNotification(refreshingRSS, pluginKey, 0, true);
	manualLoadRssCallback = function(){
		flashNotification(rssRefreshed, pluginKey, 0, true);
	}
	consumeRSS(0,[]);
}

function consumeRSS(number, allFeeds) {
	
  var feedURL = rssSources[number];
  var userTitle = rssTitles[number];
  var numberItemsToLoad = rssItems[number];
  
  $.jGFeed(feedURL,
	  function(feeds){
	    // Check for errors
	    if(!feeds){
	      // there was an error
	      return false;
	    }
	    
	    var channelTitle = feeds.title;
	    var feed = [];
	    
	    for(var i=0; i<feeds.entries.length; i++){
	      var entry = feeds.entries[i];
	      var item = {};
	      item.title = entry.title;
	      item.description = entry.contentSnippet;
	      item.date = new Date(entry.publishedDate);
	      item.channel = channelTitle;
	      item.noPlugin = true;
	      
	      feed.push(item);
	    }
	    allFeeds.push(feed);
	    
	    if (++number < rssSources.length){
	    	consumeRSS(number, allFeeds);
	    } else {
	    	loadedFeeds = allFeeds;
	    	updateRSS({feeds:allFeeds});
	    }
	  }, numberItemsToLoad); 
}

function swipeRSS(direction, options){
	log("swipe: "+direction)
	var slideInDirection = "";
	if (direction == "left"){
		currentRSSfeed++;
		slideInDirection = "right";
	} else if (direction == "right"){
		currentRSSfeed--;
		slideInDirection = "left";
	}
	
	if (currentRSSfeed < 0){
		currentRSSfeed = loadedFeeds.length-1;
	} else if (currentRSSfeed >= loadedFeeds.length){
		currentRSSfeed = 0;
	}
	
	var feed = loadedFeeds[currentRSSfeed];
	$("#menu-detail").hide("slide", { direction: direction }, animationSpeed, function(){
		updateRSS({feeds:[feed]});
		$("#menu-detail .item").each(function(){
			var item = $(this);
			item.touch($.extend(options, {
				tap: function(){ item.toggleClass("short"); }
			}));
		})
	});
	$("#menu-detail").show("slide", { direction: slideInDirection }, animationSpeed)
}

function setUpRSS(options){
//	console.log("setUpRSS")
	var o = $.extend(options, {
		     swipeLeft: function(){ swipeRSS("left", options); },
		     swipeRight: function(){ swipeRSS("right", options); },
		});
	$("#menu-detail").each(function(){
		$(this).touch(o);
	});
	return o;
}

//rss/feeds/feed/item
//channel, title, guid, description, link, date
function updateRSS(rss){
	var pluginKey = "rss";
	
	var feeds = [];
	
	if(!rssDIV){
		return false;
	}

	if (!separateRssAccounts) {
		for(i = 0; i < rss.feeds.length; i++){
			feeds = $.merge(feeds, rss.feeds[i]);
		}
	} else {
		if (!loadedFeeds || !loadedFeeds.length){
			loadedFeeds = [];
			for (var i in rss.feeds){
				if (rss.feeds[i].length){
					loadedFeeds.push(rss.feeds[i]);
				}
			}
//			loadedFeeds = rss.feeds;
		}
		feeds = loadedFeeds[currentRSSfeed];
	}
	
	var newItems = false;
	var previous = rssDIV.data("previous");
	if(!feeds){
		if(previous){
			feeds = previous;
		} else {
			return false;
		}
	} else {
		newItems = gotNewItems(feeds, previous ? previous : []);
	}
	
	feeds.sort(function(a, b){
		return b.date - a.date;
	});

	var html = "";
	if (separateRssAccounts){
		if (feeds.length && useRSSplugin){
			html += "<h3 id='rss-title'>"+feeds[0].channel+"</h3>";
		} else if (feeds.length){
			html += "<h3 id='rss-title'>"+rssTitles[currentRSSfeed]+"</h3>";
		}
	}
	var limit = rssDIV.data("limit");

	clearRelativeTimers(pushnDIV);
	if(rssDIV){
		rssDIV.data("previous",feeds);
		
		var relativeTimes = [];
		var alt = '';
		
		for(i = 0; i < feeds.length && i < limit; i++){
			var date = feeds[i].noPlugin ? feeds[i].date : new Date(feeds[i].date*1000);

			html += "<div class='item "+verboseClass(pluginKey)+" rss-item"+alt+"'><div class='image-holder'>";
				html += "<div class='rss-header'>";
					html += "<span class='rss-title'>"+feeds[i].title+"</span>";
					html += "<br/><span class='rss-channel color2'>"+feeds[i].channel+"</span>";
					html += "<span class='secondary-info'> @ <span class='rss-time color1'>"+date.format(date.isSameDay() ? format_time : format_date_time_short);
					if(displayRelativeTimes){
						html += " <span id='rss"+i+"'> </span>";
						relativeTimes.push(["rss_"+i, date]);
					}
					html += "</span></span>";
				html += "</div>"; // push-header
				html += "<div class='rss-text secondary-info'>"+feeds[i].description+"</div>";
			html += "</div></div>"; // push-item
			
			alt = alt ? '' : " second";
		}

//		if(displayLoadMore && notifications.length > pushnDIV.limit){
//			addLoadMoreBar(pushnDIV);
//		}
		
	}
	
	html = html ? html : "<div class='item'>"+noItems[pluginKey]+"</div>";
	
	showNewItemsBadge(pluginKey, getCount(feeds.length,limit));
	rssDIV.html(html);
	reloadContentIfSelected(pluginKey);
	
	for(i = 0; i < relativeTimes.length; i++){
		relativeTime(rssDIV, relativeTimes[i][0], relativeTimes[i][1], false, false, string_justNow.upperFirst());
	}
	
	if (enableNotifications(pluginKey)){
		if (feeds.length && newItems){
			flashNotification(notificationMessages[pluginKey], pluginKey);
		}
		if (!feeds.length){
			removeNotification(pluginKey);
		}
	}
	
	if (manualLoadRssCallback) manualLoadRssCallback();
	
	return true;
}

