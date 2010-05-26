callbacks['com.ashman.lockinfo.PhonePlugin'] = updatePhone;
var callsDIV;

/* label, caller, date */
function updatePhone(phone){
	
	var pluginKey = "calls";
	
	if(!callsDIV){
		return false;
	}
	
	var phoneMerged = phone.calls;
	for ( var i in phone.voicemail){
		var vm = phone.voicemail[i];
		vm.type = "voicemail";
		phoneMerged.push(vm);
	}
	
	bubbleSort(phoneMerged, 0, phoneMerged.length-1, "dateComparable", function(item){
		if (!item["dateComparable"]){
			item["dateComparable"] = new Date(item.date*1);
		}
	})
	
	var newItems = false;
	var previous = callsDIV.data("previous");
	if(!phoneMerged){
		if(previous){
			phoneMerged = previous;
		}else{
			return false;
		}
	} else {
		newItems = gotNewItems(phoneMerged, previous ? previous : []);
	}
	
	var html = "";
	var relativeTimes = [];
	var limit = callsDIV.data("limit");
	
	clearRelativeTimers(callsDIV);
	if(callsDIV && phoneMerged.length){
		callsDIV.data("previous", phoneMerged);

		html += '<table cellpadding="0" cellspacing="0">';
		
		for(i = 0; i < phoneMerged.length && i < limit; i++){
			var isVoicemail = (phoneMerged[i].type && phoneMerged[i].type == "voicemail" );
			var date = phoneMerged[i].dateComparable ? phoneMerged[i].dateComparable : new Date(phoneMerged[i].date*1);
			var caller = phoneMerged[i].caller ? phoneMerged[i].caller : "unknown";
			html += "<tr class='phone-item "+verboseClass(pluginKey)+" item detail"+(i % 2 ? " second" : '')+(isVoicemail ? " voicemail" : '')+"'>";
			html += "<td><span class='name'> "+caller+"</span><span class='label color2 secondary-info'> "+phoneMerged[i].label+"</span></td>";
			
			html +="<td><span class='time color1'>"+date.format(date.isSameDay() ? format_time : format_date_time_short)+"</span>";
			if(displayRelativeTimes){
				html += " <span class='ampm secondary-info'><nobr><span id='phone_"+i+"'></span></nobr></span>";
				relativeTimes.push(["phone_"+i, date]);
			}
			html += "</td>";
			html +="</tr>";
		}
		html +="</table>";

//		if(displayLoadMore && phoneMerged.length > callsDIV.data("limit")){
//			addLoadMoreBar(callsDIV);
//		}
	}
	
	html = html ? html : "<div class='item'>"+noItems[pluginKey]+"</div>";
	
	callsDIV.html(html);
	showNewItemsBadge(pluginKey, getCount(phoneMerged.length, limit));
	reloadContentIfSelected(pluginKey);
	
	for(i = 0; i < relativeTimes.length; i++){
		relativeTime(callsDIV, relativeTimes[i][0], relativeTimes[i][1], false, false, string_justNow.upperFirst());
	}
	
	if (enableNotifications(pluginKey)){
		if (phoneMerged.length && newItems){
			flashNotification(notificationMessages[pluginKey], pluginKey);
		}
		if (!phoneMerged.length){
			removeNotification(pluginKey);
		}
	}
	
	return true;
}