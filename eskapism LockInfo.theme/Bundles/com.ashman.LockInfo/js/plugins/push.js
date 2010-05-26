callbacks['com.ashman.lockinfo.PushNotificationPlugin'] = updatePush;
var pushnDIV;

// date, application, text
function updatePush(pushes){
	
	var pluginKey = "push";
	
	if(!pushnDIV){
		return false;
	}
	
	var newItems = false;
	var previous = pushnDIV.data("previous");
	if(!pushes){
		if(previous){
			pushes = previous;
		} else {
			return false;
		}
	} else {
		newItems = gotNewItems(pushes.notifications, previous ? previous.notifications : []);
	}
	
	var notifications = pushes.notifications;

	//for some reason data might be formatted in another way..
 	if (notifications[0] && notifications[0].text == undefined){
 		notifications = notifications[0];
 	}

	var html = "";
	var limit = pushnDIV.data("limit");

	clearRelativeTimers(pushnDIV);
	if(pushnDIV){
		pushnDIV.data("previous",pushes);
		
		var relativeTimes = [];
		var alt = '';
		
		for(i = 0; i < notifications.length && i < limit; i++){
			var date = new Date(notifications[i].date*1000);
			var pushnID = "push_"+notifications[i].application;

			html += "<div class='item "+verboseClass(pluginKey)+" push-item"+alt+"'><div class='image-holder'>";
				html += "<div class='push-header secondary-info'>";
					html += string_from+" <span class='push-app color2'>"+notifications[i].application+"</span>";
					html += " @ <span class='push-time color1'>"+date.format(date.isSameDay() ? format_time : format_date_time_short);
					if(displayRelativeTimes){
						html += " <span id='push_"+i+"'> </span>";
						relativeTimes.push(["push_"+i, date]);
					}
					html += "</span>";
				html += "</div>"; // push-header
				html += "<div class='push-text'>"+notifications[i].text+"</div>";
			html += "</div></div>"; // push-item
			
			alt = alt ? '' : " second";
		}

//		if(displayLoadMore && notifications.length > pushnDIV.limit){
//			addLoadMoreBar(pushnDIV);
//		}
		
	}
	
	html = html ? html : "<div class='item'>"+noItems[pluginKey]+"</div>";
	
	showNewItemsBadge(pluginKey, getCount(notifications.length,limit));
	pushnDIV.html(html);
	reloadContentIfSelected(pluginKey);
	
	for(i = 0; i < relativeTimes.length; i++){
		relativeTime(pushnDIV, relativeTimes[i][0], relativeTimes[i][1], false, false, string_justNow.upperFirst());
	}
	
	setupExpandCollapseItems(touchOptions);
	
	if (enableNotifications(pluginKey)){
		if (notifications.length && newItems){
			flashNotification(notificationMessages[pluginKey], pluginKey);
		}
		if (!notifications.length){
			removeNotification(pluginKey);
		}
	}
	
	return true;
}
