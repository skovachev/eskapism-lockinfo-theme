function log(item){
	if (debug){
		if ($.browser.mozilla && console && console.log){
			console.log(item);
		} else {
			$("body").prepend(item+"; ");
		}
	}
	
}


// BUG: not called!
function setPreferences(json){

}

function dumpProperties(obj) {
	if (!obj) return;
	var props = "Properties<br>";
	for (var name in obj) {
	  if (obj.hasOwnProperty(name)) {
		props += "-" + name + " : "+obj[name]+"<br>";
	  }
	}
	return props;
}

function equalArrays(x, y) {
   if (x.length != y.length) return false;
   var objectsAreSame = true;
   for(var propertyName in x) {
      if(x[propertyName] !== y[propertyName]) {
	 objectsAreSame = false;
	 break;
      }
   }
   return objectsAreSame;
}

function gotNewItems(newArray, oldArray){
	if (!oldArray || oldArray.length == 0) return true; // previous is empty
	if (newArray.length > oldArray.length) return true;
	if (equalArrays(newArray, oldArray)) return false;
	return false;
}


function flashNotification(text, id, callback, hideOverride){
	id = "notification-"+id;
	var notificationElement;
	var exists = $("#"+id).size();
	if (exists) {
		notificationElement = $("#"+id);
	} else {
		notificationElement =  $("<div class='notification"+altNotification+"' id='"+id+"'></div>")
								.appendTo("#notifications");
	}
	function endCallback(){
		var notification = $("#"+id+".notification");
		notification.touch({
			tap: function(){
				notification.slideUp(animationSpeed);
			}
		});
		if (callback && typeof callback == 'function'){
			callback(notification);
		}
		if (autoRemoveNotifications || hideOverride){
			setTimeout(function(){
				notification.slideUp(animationSpeed, function(){ notification.remove(); });
			}, notificationRemovalTime);
		}
	}
	
	notificationElement.html("<div>"+text+"</div>");
	if (!exists){
		notificationElement.hide().slideDown(animationSpeed,endCallback);
	} else {
		endCallback();
	}
	altNotification = altNotification ? '' : " second";
}

function removeNotification(id){
	id = "notification-"+id;
	var notification = $("#"+id+".notification");
	notification.slideUp(animationSpeed, function(){ notification.remove(); });
}

function relativeTime(sectionDIV, id, time, daysOnly, upperFirst, emptyString){
	var div = document.getElementById(id);
	if(!div || !sectionDIV){
		return false;
	}
	if(!time){
		var time = new Date();
	}
	
	$(div).addClass("relativeTime");

	window.clearTimeout(div.timer);
	if(displayRelativeTimes){
		var string = time.relative(daysOnly);
		if(string){
			div.innerHTML = "("+(upperFirst ? string.upperFirst() : string)+")";
		}else if(emptyString){
			div.innerHTML = emptyString;
		}
		div.timer = window.setTimeout(function(){relativeTime(sectionDIV, id, time, daysOnly, upperFirst);}, time.relative(daysOnly, true));
		if(!sectionDIV.relativeTimers){
			sectionDIV.relativeTimers = [div.timer];
		}else{
			sectionDIV.relativeTimers.push(div.timer);
		}
	}else{
		div.innerHTML = "("+(time.format(time.isSameDay() ? format_time : format_date_time_short))+")";
	}
}

function clearRelativeTimers(sectionDIV){
	if(sectionDIV && sectionDIV.relativeTimers){
		for(var i = 0; i < sectionDIV.relativeTimers.length; i++){
			window.clearTimeout(sectionDIV.relativeTimers[i]);
		}
		sectionDIV.relativeTimers = [];
	}
}

function addLoadMoreBar(containerDIV){
	var div = document.createElement("DIV");
	div.className = "loadMore";
	div.innerHTML = string_loadMore;
	div.ontouchstart = function(event){
		event.stopPropagation();
	};
	div.onclick = function(){
		containerDIV.limit += loadIncrement;
		containerDIV.update();
	};
	containerDIV.lastChild.appendChild(div);
}

function toggleSecondaryInfo(show, parent){
	var item = ".item";
	(parent? $(item, parent) : $(item))[show?"removeClass":"addClass"]("short");
}

function verboseClass(sectionId){
	return sections[sectionId].collapseItems ? " short": "";
}

function enableNotifications(sectionId){
	return sections[sectionId].enableNotifications;
}

function disableBadges(sectionId){
	return sections[sectionId].disableUnreadBadge;
}

function fixLayout(){
	if ($("#clock-weather-details-inner").css("opacity")=="0"){
		$("#clock-weather-details").css("padding","0px 5px");
	} else {
		$("#clock-weather-details").css("padding","5px");
	}
}

function collapseElement(elementId, callback){
	$("#"+elementId).slideUp(animationSpeed, function(){
		if (callback && typeof callback == 'function'){
			callback();
		}
	});
}

function expandElement(elementId, callback){
	$("#"+elementId).slideDown(animationSpeed, function(){
		if (callback && typeof callback == 'function'){
			callback();
		}
	});
}

function updateTime(){
	// write time in time div
	window.clearTimeout(clockTimer);
	var now = new Date();
	$("#clock #time").html(now.format(clock_format_time));
	clockTimer = window.setTimeout(updateTime, 1000 - (now.getTime() % 1000));
}

function updateClock(updateOnlyCalendar){
	if (!updateOnlyCalendar){
		// set date in date div
		var now = new Date();
		$("#clock #date").html(now.format(format_date));
	}
	
	// build calendar in clock info div
	var now = new Date();
	var today = now.getDate();
	var beginDate = new Date().zeroTime();
	if (beginDateOffset != 0){
//		beginDate.setMonth(beginDate.getMonth() + beginDateOffset);
		beginDate = new Date(beginDate.getFullYear(), beginDate.getMonth()+beginDateOffset, 1);
	}
	beginDate.setDate(1);
	var endDate = new Date(beginDate);
	endDate.setMonth(beginDate.getMonth() + 1);

	var current = new Date(beginDate);

	current.setDate(current.getDate() + (startDay - beginDate.getDay()) - (startDay - beginDate.getDay() > 0 ? 7 : 0));

	var table = $("<table id='Month' align='center'></table>").html(function(){
			var headerTR = $("<tbody></tbody>").append("<tr></tr>").find("tr");
			for(var i = 0; i < 7; i++){
				$("<th></th>").css("width","15%").html(shortDays[(i + startDay) % 7]).appendTo(headerTR);
			}
			return $(headerTR).parent();
		}
	);
	var tBody = $(table).find("tbody");
	while(current < endDate){
		var row = $("<tr></tr>").appendTo(tBody);
		for(var i = 0; i < 7; i++){
			var cell = document.createElement("TD");
			var date = current.getDate();
			$("<td></td>").addClass( beginDate.getMonth() == current.getMonth() ? (now.format("d m Y") == current.format("d m Y") ? "today" : "thisMonth") : "otherMonth" )
						  .html(date).appendTo(row);
			current.setDate(date + 1);
		}
	}
	
	var calendarSelector = "#clock-details";
	if (updateOnlyCalendar){
		calendarSelector += ", #clock-weather-details-inner";
	}
	
	$(calendarSelector).html(table).prepend("<div id='clock-calendar-month-name'>"+beginDate.format("F Y")+"</div>");
	
	if (!updateOnlyCalendar){
		collapseElement("clock-details");
	
		updateTime();
		window.clearTimeout(dayTimer);
		dayTimer = window.setTimeout(updateClock, new Date(now.getTime() + 86400000).zeroTime().getTime() - now.getTime());
	}

}

function setUpMenu(options){
	$(".menu-items .menu-item").each(function(){
		var currentId = $(this).attr("id");
		
		$(this).touch($.extend(options, {
			tap: function(){
				collapseElement("menu-detail", function(){
					if (currentlyOpenMenuElement == "none" || currentId != currentlyOpenMenuElement){
						$("#menu-detail").html($("#"+currentId+"-detail").html());
						$("#"+currentlyOpenMenuElement).removeClass("selected").find("img").animate({
							"margin-top" : "4px"
						},animationSpeed).end().find("div.menu-item-title").fadeOut(animationSpeed, function(){ $(this).remove(); });
						var menuName = $("#"+currentId).data("menuName");
						$("#"+currentId).addClass("selected").find("img").animate({
							"margin-top" : "-10px"
						},animationSpeed).end().append("<div class='menu-item-title' style='display:none;'>"+menuName+"</div>").find("div.menu-item-title").css({
							"bottom":"2px",
							"font-size":"0.895em",
							"font-variant":"small-caps",
							"position":"absolute",
							"text-align":"center",
							"width":"58px"
						}).fadeIn(animationSpeed);
						expandElement("menu-detail", function (){
							setupExpandCollapseItems(options);
						});
						currentlyOpenMenuElement = currentId;
					} else {
						$("#"+currentlyOpenMenuElement).removeClass("selected").find("img").animate({
							"margin-top" : "4px"
						},animationSpeed).end().find("div.menu-item-title").fadeOut(animationSpeed, function(){ $(this).remove(); });;
						currentlyOpenMenuElement = "none";
					}
				});
			}
		}));
	});
}

function setupExpandCollapseItems(options){
	$("#menu-detail .item").each(function(){
		var item = $(this);
		var extendedOptions = {
			swipeLeft: function() { toggleSecondaryInfo(true, $("#menu-detail")) },
			swipeRight: function() { toggleSecondaryInfo(false, $("#menu-detail")) }
		}
		var coreOptions = {
			tap: function(){ item.toggleClass("short"); }
		}
		if (!item.hasClass("rss-item")){
			options = $.extend(options, extendedOptions);
		} else {
			options = setUpRSS(options);
		}
		item.touch($.extend(options, coreOptions));
	});
}

function getSlideInDirection(incoming){
	var slideInDirection = "right";
	if (incoming == "left"){
		slideInDirection = "right"
	} else if (incoming == "right"){
		slideInDirection = "left"
	} else if (incoming == "none"){
		slideInDirection = "up";
	}
	return slideInDirection;
}

function swipeMainMenu(direction, options){
	
	var slideInDirection = getSlideInDirection(direction);
	
	// if weather is swiped
	if (options['element'] == "weather") {
		if (direction == "left"){
			currentCityIndex++;
			if (currentCityIndex>=postalIdx.length) currentCityIndex = 0;
		} else if (direction == "right"){
			currentCityIndex--;
			if (currentCityIndex<0) currentCityIndex = postalIdx.length-1;
		} else if (direction == "none"){
			currentCityIndex = 0;
			direction = "down";
		}
	} else {
		// if calendar is swiped
		if (direction == "left"){
			beginDateOffset++;
		} else if (direction == "right"){
			beginDateOffset--;
		} else if (direction == "none"){
			beginDateOffset = 0;
			direction = "down";
		}
	}
	
	$("#clock-weather-details").hide("slide", { direction: direction }, animationSpeed, function(){
		if (options['element'] == "weather") {
			displayWeather(weatherObjects[currentCityIndex]);
		} else {
			updateClock(true);
		}
	});
	$("#clock-weather-details").show("slide", { direction: slideInDirection }, animationSpeed);
}

var openning = false;
var actionMenuShown = false;
function openActionMenu(direction){
	if (openning) return;
	var slideInDirection = getSlideInDirection(direction);
	openning = true;
	if (direction == "none") direction = "down";
	$("#clock-weather").hide("slide", { direction: direction }, animationSpeed, function(){
		actionMenuShown = !actionMenuShown;
		
		if (actionMenuShown){
			$("#clock, #weather").hide();
			$("#action-menu").show();
		} else {
			$("#clock, #weather").show();
			$("#action-menu").hide();
		}
		
		openning = false;
		$("#clock-weather").show("slide", { direction: slideInDirection }, animationSpeed);
	});
	
}

function setUpActionMenu(options){
	
	var swipeOptions = {
			 swipeLeft: function(){ openActionMenu("left"); },
		     swipeRight: function(){ openActionMenu("right"); }
		};
	
	$("#action-menu").touch($.extend({}, options, swipeOptions));
	
	options = $.extend({}, options, swipeOptions);
	
	if (!useWeatherIcon){
		$("#am-refresh-weather").touch($.extend({}, options, {
		     tap: function(){ 
				weatherRefresherTemp(); 
				setTimeout(function(){ openActionMenu("right"); }, 300);
			 }
		})).show();
	}
	
	if (!useRSSplugin){
		$("#am-refresh-rss").touch($.extend({}, options, {
		     tap: function(){ 
				refreshRSS(); 
				setTimeout(function(){ openActionMenu("right"); }, 300);
			 }
		})).show();
	}
	
}

var currentlyOpenMainMenuElement = "none";
function setUpClockAndWeatherMenu(options){
	$("#clock, #weather").each(function(){
		var currentId = $(this).attr("id");
		//currentId = (currentId == "weather-image") ? "weather" : currentId;
		$(this).touch($.extend({}, options, {
			 swipeLeft: function(){ openActionMenu("left"); },
		     swipeRight: function(){ openActionMenu("right"); },
		     tap: function(){
//					console.log(options);
					collapseElement("clock-weather-details-inner", function(){
						if (currentlyOpenMainMenuElement == "none" || currentId != currentlyOpenMainMenuElement){
							$("#clock-weather-details-inner").html($("#"+currentId+"-details").html());
							$("#clock-weather-details-inner").attr("class",currentId+"-inner");
							expandElement("clock-weather-details-inner", function(){
								currentlyOpenMainMenuElement = currentId;
								$("#clock-weather-details").animate({
									"padding-top": "5px",
								    "padding-bottom": "5px"
								  }, animationSpeed).css("border-bottom","1px solid black");
								var o = $.extend(options,{ "element": currentId });
								$("#clock-weather-details-inner").touch($.extend(options, {
								     tap: function(){ swipeMainMenu("none", o); },
								     swipeLeft: function(){ swipeMainMenu("left", o); },
								     swipeRight: function(){ swipeMainMenu("right", o); },
								}));
							});
						} else {
							currentlyOpenMainMenuElement = "none";
							$("#clock-weather-details").animate({
							    "padding-top": "0px",
							    "padding-bottom": "0px"
							  }, animationSpeed).css("border-bottom","none");
						}
					});
					//openActionMenu("right");
				}
		}));
	});
}

function showNewItemsBadge(id, number){
	$("#"+id+" .unread")[number?"show":"hide"]().css("display", number == 0 ? "hidden" : "block").html(number);
}

function bubbleSort(inputArray, start, rest, property, itemInitFunction) {
	for (var i = rest - 1; i >= start;  i--) {
		for (var j = start; j <= i; j++) {
			if (itemInitFunction && typeof itemInitFunction == 'function'){
				itemInitFunction(inputArray[j+1]);
				itemInitFunction(inputArray[j]);
			}
			if (inputArray[j+1][property] < inputArray[j][property]) {
				var tempValue = inputArray[j];
				inputArray[j] = inputArray[j+1];
				inputArray[j+1] = tempValue;
			}
		}
	}
}

function reloadContentIfSelected(itemId){
	if (itemId == currentlyOpenMenuElement && itemId != "none"){
		$("#menu-detail").html($("#"+itemId+"-detail").html());
		setupExpandCollapseItems(touchOptions);
	}
}

function getCount(number,limit){
	return number <= limit ? number : limit;
}

function updateView(bundleIdentifier, data){
	if(bundleIdentifier){
		var callback = callbacks[bundleIdentifier];
		if(callback){
			return !!callback(data);
		}
	}
	return false;
}

function finalizeSkinImages(skin){
	var styledObjects = {
			"h1, h2, h3, h4" : "background: url(skins/"+skin+"/images/black-bg.png);",
			".push-item .image-holder" : "background: url(skins/"+skin+"/images/menu-items/notification.png) no-repeat 0px 50%;",
			".twitter-item .image-holder" : "background: url(skins/"+skin+"/images/menu-items/twitter.png) no-repeat -2px 50%;",
			"div#clock-weather" : "background: url(skins/"+skin+"/images/main-bg.png) no-repeat;",
			"div.menu" : "background: url(skins/"+skin+"/images/menu-bg.png);",
			"div.menu .menu-item .unread" : "background: url(skins/"+skin+"/images/unread-bg.png) no-repeat;",
			".todo-item .image-holder" : "background: url(skins/"+skin+"/images/menu-items/prio4.png) no-repeat 0px 50%;",
			".todo-item.prio3 .image-holder" : "background: url(skins/"+skin+"/images/menu-items/prio3.png) no-repeat 0px 50%;",
			".todo-item.prio2 .image-holder" : "background: url(skins/"+skin+"/images/menu-items/prio2.png) no-repeat 0px 50%;",
			".todo-item.prio1 .image-holder" : "background: url(skins/"+skin+"/images/menu-items/prio1.png) no-repeat 0px 50%;",
			".rss-item .image-holder" : "background: url(skins/"+skin+"/images/menu-items/rss.png) no-repeat 0px 50%;",
			"div#menu-details" : "background: url(skins/"+skin+"/images/details-bg.png);",
			"div#menu-details table tr.second, div.second" : "background: url(skins/"+skin+"/images/second-bg.png);",
			"div#menu-details table tr td:first-of-type" : "background: url(skins/"+skin+"/images/menu-items/phone.png) no-repeat 17px 50%;",
			"div#menu-details table tr.voicemail td:first-of-type" : "background: url(skins/"+skin+"/images/menu-items/voicemail.png) no-repeat 17px 50%;",
			".sms-item .image-holder" : "background: url(skins/"+skin+"/images/menu-items/sms.png) no-repeat 0px 50%;",
			".calendar-item .image-holder" : "background: url(skins/"+skin+"/images/menu-items/event.png) no-repeat 0px 50%;",
			".calendar-item.birthday .image-holder" : "background: url(skins/"+skin+"/images/menu-items/birthday_cake.png) no-repeat 0px 50%;",
			".calendar-item.holiday .image-holder" : "background: url(skins/"+skin+"/images/menu-items/allday_event.png) no-repeat 0px 50%;",
			".mail-item .image-holder" : "background: url(skins/"+skin+"/images/menu-items/mail.png) no-repeat 0px 50%;"
	}
	var styleHtml = '';
	for (var i in styledObjects){
		styleHtml += i + " { " + styledObjects[i] + " } ";
	}
	$("head").append("<style type='text/css'>"+styleHtml+"</style>");
}
