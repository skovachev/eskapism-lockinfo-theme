callbacks['com.ashman.lockinfo.SMSPlugin'] = updateSMS;
var smsDIV;

/* sender, groupId, date, text */
function updateSMS(sms){
	
	var pluginKey = "sms";
	
	if(!smsDIV){
		return false;
	}

	var newItems = false;
	var previous = smsDIV.data("previous");
	if(!sms){
		if(previous){
			sms = previous;
		}else{
			return false;
		}
	} else {
		newItems = gotNewItems(sms.msgs, previous ? previous.msgs : []);
	}
	
	var html = "";
	var relativeTimes = [];
	var msgs = sms.messages;
	var limit = smsDIV.data("limit");
	
	if(smsDIV && msgs.length){
		smsDIV.data("previous",sms);
		
		var alt = '';
		
		for(i = 0; i < msgs.length && i < limit; i++){
			var date = new Date(msgs[i].date),
				sender = msgs[i].sender,
				text = /*msgs[i].text.length > smsTitleCharacterLimit ? msgs[i].text.substring(0,smsTitleCharacterLimit)+"..." :*/ msgs[i].text,
				groupId = msgs[i].groupId;
				
			//date = new Date(date.setFullYear( date.getFullYear() - 31 )); // bug? 31 years later?

			html += "<div class='item "+verboseClass(pluginKey)+" sms-item"+alt+"'><div class='image-holder'>";
				html += "<div class='sms-header'>";
					html += string_from+" <span class='sms-sender color2'>"+sender+"</span>";
					html += " @ <span class='sms-time color1'>"+date.format(date.isSameDay() ? format_time : format_date_time_short);
					if(displayRelativeTimes){
						html += " <span id='sms_time_"+i+"'> </span>";
						relativeTimes.push(["sms_time_"+i, date]);
					}
					html += "</span>";
				html += "</div>"; // sms-header
				html += "<div class='sms-text secondary-info'>"+text+"</div>";
			html += "</div></div>"; // sms-item
			
			alt = alt ? '' : " second";
		}
		
		html += "</div>";
		
//		if(displayLoadMore && msgs.length > smsDIV.limit){
//			addLoadMoreBar(smsDIV);
//		}
	}
	
	html = html ? html : "<div class='item'>"+noItems[pluginKey]+"</div>";
	
	smsDIV.html(html);
	showNewItemsBadge(pluginKey, getCount(msgs.length, limit));
	reloadContentIfSelected(pluginKey);
	
	for(i = 0; i < relativeTimes.length; i++){
		relativeTime(smsDIV, relativeTimes[i][0], relativeTimes[i][1], false, false, string_justNow.upperFirst());
	}
	
	if (enableNotifications(pluginKey)){
		if (msgs.length && newItems){
			flashNotification(notificationMessages[pluginKey], pluginKey);
		}
		if (!msgs.length){
			removeNotification(pluginKey);
		}
	}
	
	return true;
}
