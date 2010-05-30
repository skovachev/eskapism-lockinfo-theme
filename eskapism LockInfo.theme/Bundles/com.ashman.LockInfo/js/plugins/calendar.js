callbacks['com.ashman.lockinfo.CalendarPlugin'] = updateCalendar;
var calendarDIV;

var id_regex = new RegExp("[\\s'\"@.\*]", "g");

/* color_g, color_r, color_b, summary, start, end, allDay, calendar, location */
function updateCalendar(calendar){
	var pluginKey = "calendar";
	
	var newItems = false;
	var previous = calendarDIV.data("previous");
	if(!calendar || !calendar.events){
		if(previous){
			calendar = previous;
		}else{
			return false;
		}
	} else {
		newItems = gotNewItems(calendar.events, previous ? previous.events : []);
	}
	
	var events = [];
	var now = new Date();
	for(var i = 0; i < calendar.events.length; i++){
		if(calendar.events[i].end > now){
			events[events.length] = calendar.events[i];
		}
	}

	clearRelativeTimers(calendarDIV);
	var relativeTimes = [];
	var limit = calendarDIV.data("limit");

	var html = "";
	if(calendarDIV && events.length){
		
		events.sort(function(a, b){
			return a.start != b.end ? a.start - b.start : a.end - b.end;
		});

		window.clearTimeout(window.cal_refresh);
		calendarDIV.data("previous",calendar);
		
		var timeout = (new Date(now.getTime() + 86400000)).zeroTime().getTime() - now.getTime();
		var currentCal;
		var currentDate;
		var day = 0;
		var alt = '';
		var headerCount = 0;
		var eventCounts = {};
		var today = new Date().format("Y-n-j");
		var day = 0;
		eventCounts[today] = 0;

		for(var i = 0; i < events.length; i++){
			var d = new Date(events[i].start).format("Y-n-j");

			if(!eventCounts[d]){
				eventCounts[d] = 1;
			}else{
				eventCounts[d]++;
			}
		}
		headerCount = events.length;

		var regexp = new RegExp("birthday|"+string_birthday, "i");
		for(var i = 0; i < events.length && i < limit; i++){
			
			var isBirthday = isBirthday = events[i].summary.match(regexp), 
				isHoliday = isHoliday = !isBirthday && events[i].allDay, 
				type = isBirthday ? "birthday" : (isHoliday ? "holiday" : type);
			
			html += "<div class='item "+verboseClass(pluginKey)+" calendar-item"+alt+" "+type+"'><div class='image-holder'>";
			
			var location = events[i].location,
				title = events[i].summary,
				calendar = events[i].calendar.replace(id_regex, " "),
				allDay = events[i].allDay,
				start = new Date(events[i].start),
				end = new Date(events[i].end);
			
			html += "<div class='calendar-header'>";
			html += "<span class='calendar-title'>"+title+"</span>";
			html += " <span class='calendar-cal secondary-info'>("+calendar.toLowerCase()+")</span>";
			html += "</div>";
			
			html += "<div class='calendar-info secondary-info'>";
			
			var showRelativeTimes = ( displayRelativeTimes /*&& (start.isSameDay(now) || start < now)*/ );
			var dayID = "day_"+(day++);
			
			if (allDay){
				html += "<span class='color3'>"+start.format(format_date_longer)+"</span> - <span class='calendar-time'>all day</span> ";
				if(showRelativeTimes){
					html += "<span class='calendar-time'> <span id=\""+dayID+"_"+i+"\"></span></span> ";
					relativeTimes.push([dayID+"_"+i, start, true, false, '']);
				}
			} else if (events[i].start + 86400000 /*one day*/ < events[i].end) {
				var startAndEndPresent = !start.isSameDay(end);
				if (startAndEndPresent){
					html += string_time_from+" ";
				}
				html += "<span class='calendar-time'>"+start.format(format_date_short)+"</span>";
				if(startAndEndPresent){
					html += " "+string_time_to+"<span class='calendar-time'>"+end.format(format_date_short)+"</span> ";
				}
				
				if(showRelativeTimes){
					if(start > now){
						html += "<span class='calendar-time'> <span id=\""+dayID+"_"+i+"\"></span></span> ";
						relativeTimes.push([dayID+"_"+i, start, true, true, '']);
					}else if(start.isSameDay(currentDate)){
						html += "<span class='calendar-time'> "+string_ends_prefix+"<span id=\""+dayID+"_"+i+"\"></span>"+string_ends_suffix+"</span> ";
						relativeTimes.push([dayID+"_"+i, end, true, false, '']);
					}else{
						html += "<span class='calendar-time'> "+string_began_prefix+"<span id=\""+dayID+"_"+i+"_start\"></span>"+string_began_suffix+" | "+string_ends_prefix+"<span id=\""+dayID+"_"+i+"_end\"></span>"+string_ends_suffix+"</span> ";
						relativeTimes.push([dayID+"_"+i+"_start", start, events[i].allDay, false, string_justNow]);
						relativeTimes.push([dayID+"_"+i+"_end", end, events[i].allDay, false, string_now]);
					}
				}

			} else {
				var startAndEndPresent = start.getTime() != end.getTime();
				html += "<span class='color3'>"+start.format(format_date_longer)+"</span> - ";
				if (startAndEndPresent){
					html += string_time_from+" ";
				}
				html += "<span class='calendar-time'>"+start.format(end.isSameDay(start) ? format_time : format_date_short+" "+format_time)+"</span>";
				if(startAndEndPresent){
					html += " "+string_time_to+" <span class='calendar-time'>"+end.format(start.isSameDay(end) ? format_time : format_time+" "+format_date_short)+"</span>";
				}
				
				if(showRelativeTimes){
					if(start > now){
						html += "<span class='calendar-time'> "+string_begins_prefix+"<span id=\""+dayID+"_"+i+"\"></span>"+string_begins_suffix+"</span> ";
						relativeTimes.push([dayID+"_"+i, start, false, false, string_now]);
						var timeout2 = start.getTime() - now.getTime();
						if(timeout2 < timeout){
							timeout = timeout2;
						}
					}else{
						html += "<span class='calendar-time'> "+string_began_prefix+"<span id=\""+dayID+"_"+i+"_start\"></span>"+string_began_suffix+" | "+string_ends_prefix+"<span id=\""+dayID+"_"+i+"_end\"></span>"+string_ends_suffix+"</span> ";
						relativeTimes.push([dayID+"_"+i+"_start", start, events[i].allDay, false, string_justNow]);
						relativeTimes.push([dayID+"_"+i+"_end", end, events[i].allDay, false, string_now]);
						var timeout2 = end.getTime() - now.getTime();
						if(timeout2 < timeout){
							timeout = timeout2;
						}
					}
				}
			}
			
			if (location){
				html += "@ <span class='calendar-location secondary-info'>"+location+"</span>";
			}
			html += "</div></div>"; // calendar-info
			
			alt = alt ? '' : " second";
			html += "</div>"; // calendar-item
		}
		
//		if(displayLoadMore && i == calendarDIV.limit){
//			html += "<div class='loadMore' ontouchstart='catchSwipe(event, function(){calendarDIV.limit += loadIncrement;updateCalendar();});'>"+string_loadMore+"</div>";
//		}
		
		window.cal_refresh = window.setTimeout(updateCalendar, timeout);
	}
	
	html = html ? html : "<div class='item'>"+noItems[pluginKey]+"</div>";
	
	if (!disableBadges(pluginKey))
		showNewItemsBadge(pluginKey, getCount(headerCount,limit));
	calendarDIV.html(html);
	reloadContentIfSelected(pluginKey);
	
	for(i = 0; i < relativeTimes.length; i++){
		relativeTime(mailDIV, relativeTimes[i][0], relativeTimes[i][1], relativeTimes[i][2], relativeTimes[i][3], relativeTimes[i][4]);
	}
	
	if (enableNotifications(pluginKey)){
		if (events.length && newItems){
			flashNotification(notificationMessages[pluginKey], pluginKey);
		}
		if (!events.length){
			removeNotification(pluginKey);
		}
	}
	
	return true;
}

