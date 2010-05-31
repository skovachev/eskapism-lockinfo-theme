var pluginIDs = [
    'com.vividboarder.lockinfo.2DoPlugin',
    'cx.ath.jakewalk.TodoPlugin',
    'com.vividboarder.lockinfo.TodoPlugin',
    'cx.ath.the-kenny.ThingsPlugin'
];
for (var i in pluginIDs){
	callbacks[pluginIDs[i]] = updateTODO;
}
var todoDIV;

var ten_years = 86400000 /*one day*/ * 356 /* one year */ * 10;

/*
 * Properties:
 * - color_r
 * - color_g
 * - color_b
 * - priority
 * - name
 * - due
 * - note
 */
function updateTODO(todo) {
	
	var pluginKey = "todo";

	if(!todoDIV){
		return false;
	}
	
	var newItems = false;
	var previous = todoDIV.data("previous");
	if(!todo){
		if(previous){
			todo = previous;
		} else {
			return false;
		}
	} else {
		newItems = gotNewItems(todo.todos, previous ? previous.todos : []);
	}
	
	var todos = todo.todos;
	var html = "";
	var relativeTimes = [];
	var limit = todoDIV.data("limit");
	
	clearRelativeTimers(todoDIV);	
	if(todoDIV && todos.length){
		todoDIV.data("previous",todo);
	
		var sortedTodos = todos;
		bubbleSort(sortedTodos,0,sortedTodos.length-1,"priority");
		
		for(i = 0; i < sortedTodos.length && i < limit; i++){
			// todos = {due,color_g,color_r,color_b,name,priority}
		
			var todoID = "todo_"+i;
			var date = new Date(sortedTodos[i].due*1000);
			if (date.getTime() > ((new Date).getTime() + ten_years )){
				date = undefined;
			}
			var priority = sortedTodos[i].priority;
			function getPriority(prio){
				switch (prio){
					case 1 : return 1;
					case 5 : return 2; 
					case 9 : return 3; 
					default: return 4;
				}
			}
			var prio = " prio"+(getPriority(priority));
			
			html += "<div class='item "+verboseClass(pluginKey)+" todo-item"+(i%2==0?"":" second")+prio+"'><div class='image-holder'>";
				html += "<div class='todo-item-content'>";
					html += "<div class='todo-item-title'>";
						html += "<span class='todo-name'>"+sortedTodos[i].name+"</span>";
						if (date){
							html += "<div class='todo-item-time color2 secondary-info'>";
							html += date.format(date.isSameDay() ? format_time : format_date_time_short);
							if(displayRelativeTimes){
							 	html += " <span id='todo_rt_"+i+"'></span>";
							 	relativeTimes.push(["todo_rt_"+i, date]);
							 }
							html += "</div>";
						}
					html += "</div>";
					html += "<div class='todo-item-note secondary-info'>";
						html += sortedTodos[i].note.replace(/\n/gi, "<br/>"); // replace in case of multiline notes
					html += "</div>";
				html += "</div>";
			html += "</div></div>";
		}	
		

//		if(displayLoadMore && todos.length > todoDIV.limit){
//			addLoadMoreBar(todoDIV);
//		}
	}
	
	html = html ? html : "<div class='item'>"+noItems[pluginKey]+"</div>";
	
	todoDIV.html(html);
	if (!disableBadges(pluginKey))
		showNewItemsBadge(pluginKey, getCount(todos.length,limit));
	reloadContentIfSelected(pluginKey);
	
	for(i = 0; i < relativeTimes.length; i++){
		relativeTime(todoDIV, relativeTimes[i][0], relativeTimes[i][1], true, false, string_justNow.upperFirst());
	}
	
	if (enableNotifications(pluginKey)){
		if (todos.length && newItems){
			flashNotification(notificationMessages[pluginKey], pluginKey);
		}
		if (!todos.length){
			removeNotification(pluginKey);
		}
	}
	
	return true;
}
