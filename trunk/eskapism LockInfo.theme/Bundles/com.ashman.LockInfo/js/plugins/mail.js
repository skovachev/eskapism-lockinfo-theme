callbacks['com.ashman.lockinfo.MailPlugin'] = updateMail;
var mailDIV;

/* recieved, subject, sender, account, id */
function updateMail(mail){
	
	var pluginKey = "mail";

	if(!mailDIV){
		return false;
	}

	var newItems = false;
	var previous = mailDIV.data("previous");
	if(!mail){
		if(previous){
			mail = previous;
		}else{
			return false;
		}
	} else {
		newItems = gotNewItems(mail.messages, previous ? previous.messages : []);
	}
	
	var msgs = mail.messages;
	var html = "";
	var relativeTimes = [];
	var limit = mailDIV.data("limit");
	
	clearRelativeTimers(mailDIV);
	if(mailDIV && msgs.length){
		mailDIV.data("previous",mail);
		
		msgs.sort(function(a, b){
			return b.received*1 - a.received*1;
		});
		
		var alt = '';
		for(i = 0; i < msgs.length && i < limit; i++){

			var date = new Date(msgs[i].received*1),
				subject = msgs[i].subject,
				sender = msgs[i].sender,
				account = msgs[i].account.toLowerCase();
			
			html += "<div class='item "+verboseClass(pluginKey)+" mail-item "+alt+"'><div class='image-holder'>";
				html += "<div class='mail-header'><span class='mail-subject'>"+(subject || string_noSubject)+"</span>";
				if (showMailAccounts){
					html += "<span class='mail-acc'> ("+account+")</span>";
				}
				html += "</div><div class='mail-meta secondary-info'>";
				html += string_from+" "+"<span class='mail-sender color2'>"+sender+"</span> &ndash; <span class='mail-time color1'>"+date.format(date.isSameDay() ? format_time : format_date_time_short);
				if(displayRelativeTimes){
					html += " <span id='mail_time_"+i+"'></span>";
					relativeTimes.push(["mail_time_"+i, date]);
				}
				html += "</div>";
			html += "</span></div></div>"; // mail-item

			alt = alt ? '' : " second";
		}
		
		html += "</div>";
		
//		if(displayLoadMore && msgs.length > mailDIV.limit){
//			addLoadMoreBar(mailDIV);
//		}
	}
	
	html = html ? html : "<div class='item'>"+noItems[pluginKey]+"</div>";

	mailDIV.html( html );
	showNewItemsBadge(pluginKey, getCount(msgs.length,limit));
	reloadContentIfSelected(pluginKey);
	
	for(i = 0; i < relativeTimes.length; i++){
		relativeTime(mailDIV, relativeTimes[i][0], relativeTimes[i][1], false, false, string_justNow.upperFirst());
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
