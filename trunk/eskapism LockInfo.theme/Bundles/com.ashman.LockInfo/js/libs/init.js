$theme["init"] = function(){
	
	var rssEnabled = false;
	
	var root = $("#lockinfo");
	var notificationsHtml = '<div id="notifications"><!--<div class="notification"></div>--></div>';
	root.append(notificationsHtml);
	
	var actionMenuHtml = '';
	actionMenuHtml += "<div id='am-refresh-weather' class='action' style='display:none;'><img src='skins/"+skin+"/images/action-menu/refresh_weather.png' /><span>refresh weather</span></div>";
	actionMenuHtml += "<div id='am-refresh-rss' class='action' style='display:none;'><img src='skins/"+skin+"/images/action-menu/refresh_rss.png' /><span>refresh rss</span></div>";
	
	var clockWeatherHtml = '';
	clockWeatherHtml += '<div id="clock-weather">';
		clockWeatherHtml += '<div id="action-menu"><div id="action-menu-inner">'+actionMenuHtml+'</div></div>';
		clockWeatherHtml += '<div class="clear"></div>';
	clockWeatherHtml += '</div>';
	clockWeatherHtml += '<div id="clock-weather-wrapper"><div id="clock-weather-details">';
		clockWeatherHtml += '<div class="shadow"></div>';
		clockWeatherHtml += '<div id="clock-weather-details-inner"></div>';
		clockWeatherHtml += '<div id="clock-details"></div>';
		clockWeatherHtml += '<div id="weather-details"></div>';
	clockWeatherHtml += '</div></div>';
	root.append(clockWeatherHtml);
	
	var menuHtml = '';
	menuHtml += '<div class="menu">';
		menuHtml += '<div class="menu-items">';
			menuHtml += '<div class="menu-row">';
			menuHtml += '</div>';
		menuHtml += '</div>';
	menuHtml += '</div>';
	root.append(menuHtml);
	
	var menuDetailsHtml = '';
	menuDetailsHtml += '<div id="menu-details">';
		menuDetailsHtml += '<div class="shadow"></div>';
		menuDetailsHtml += '<div id="menu-detail"></div>';
	menuDetailsHtml += '</div>';
	root.append(menuDetailsHtml);
	
	function buildSectionDetailsHtml(sectionId, emptyMessage){
		var html = '';
		html += '<div id="'+sectionId+'-detail" class="menu-detail" style="display:none">';
			html += '<div class="item">'+emptyMessage+'</div>';
		html += '</div>';
		return html;
	}
	
	function buildSectionHtmlAndAppend(sectionId, emptyMessage){
		var menuDetailsDiv = $("#menu-details");
		menuDetailsDiv.append(buildSectionDetailsHtml(sectionId,emptyMessage));
	}
	
	var menuRow = $(".menu-row");
	var rowEndHtml = '<div class="clear"></div>';
	
	var itemsInRow = 0;
	var numberRows = 1;
	
	itemsInMenuRowMax = itemsInMenuRowMax > 5 ? 5 : itemsInMenuRowMax; 
	
	function addRowItem(sectionId,imageName){
		var id = sectionId;
		var menuName = menuNames[sections[i].name];
		var number = itemsInRow++;
		var html = '<div id="'+id+'" class="menu-item"><img src="skins/'+skin+'/images/menu/'+imageName+'.png" /><div class="unread">0</div></div>';
		if (number >= itemsInMenuRowMax){
			menuRow.append(rowEndHtml);
			if (!multirowMenu){
				menuRow = $("<div class='menu-row hidden'></div>").appendTo(".menu-items");
			} else {
				menuRow = $(menuHtml).insertAfter($(".menu:last"));
				menuRow = menuRow.find(".menu-row");
			}
			numberRows++;
			itemsInRow = 1;
		}
		if (numberRows>1){
			$(".menu").addClass("middle-menu-row");
			$(".menu:first").addClass("first-menu-row");
			$(".menu:last").addClass("last-menu-row");
		}
		menuRow.append(html);
		menuRow.find("div#"+id).data("menuName",menuName);
	}
	
	for(var i in sections){
		switch(sections[i].name){
			case "Clock&Weather":
				clockWeatherHtml = '<div id="clock">';
					clockWeatherHtml += '<div id="time"></div>';
					clockWeatherHtml += '<div id="date" class="color2"></div>';
				clockWeatherHtml += '</div>';
				clockWeatherHtml += '<div id="weather">';
					clockWeatherHtml += '<div id="weather-image"><img src="Icon Sets/lex/dunno.png"/></div>';
					clockWeatherHtml += '<div id="weather-info"><span id="weather-city" class="capitalize"></span><span class="grad color2"></span><span id="weather-text"></span></div>';
					clockWeatherHtml += '<span id="weather_timestamp"></span>';
					clockWeatherHtml += '<div class="clear"></div>';
				clockWeatherHtml += '</div>';
				$("#clock-weather").prepend(clockWeatherHtml);
				updateClock();
				weatherDIV = $("#weather-details");
			break;
			case "Mail":
				addRowItem(i,"Mail");
				buildSectionHtmlAndAppend(i,noItems[i]);
				mailDIV = $("#mail-detail");
				mailDIV.data("limit", sections[i].limit);
			break;
			case "Calendar":
				addRowItem(i,"Calendar");
				buildSectionHtmlAndAppend(i,noItems[i]);
				calendarDIV = $("#calendar-detail");
				calendarDIV.data("limit", sections[i].limit);
			break;
			case "Calls&Voicemail":
				addRowItem(i,"Phone");
				buildSectionHtmlAndAppend(i,noItems[i]);	
				callsDIV = $("#calls-detail");
				callsDIV.data("limit", sections[i].limit);
			break;
			case "SMS":
				addRowItem(i,"SMS");
				buildSectionHtmlAndAppend(i,noItems[i]);
				smsDIV = $("#sms-detail");
				smsDIV.data("limit", sections[i].limit);
			break;
			case "Twitter":
				addRowItem(i,"Twitter");
				buildSectionHtmlAndAppend(i,noItems[i]);
				twitterDIV = $("#twitter-detail");
				twitterDIV.data("limit", sections[i].limit);
			break;
			case "TODO":
				addRowItem(i,"Todo");
				buildSectionHtmlAndAppend(i,noItems[i]);
				todoDIV = $("#todo-detail");
				todoDIV.data("limit", sections[i].limit);
			break;
			case "Push":
				addRowItem(i,"Notifications");
				buildSectionHtmlAndAppend(i,noItems[i]);
				pushnDIV = $("#push-detail");
				pushnDIV.data("limit", sections[i].limit);
			break;
			case "RSS":
				rssEnabled = true;
				addRowItem(i,"RSS");
				buildSectionHtmlAndAppend(i,noItems[i]);
				rssDIV = $("#rss-detail");
				rssDIV.data("limit", sections[i].limit);
				if (!useRSSplugin){
					if (rssSources.length > 0){
						consumeRSS(0,[]);
						setInterval(function(){
							consumeRSS(0,[]);
						}, rssRefreshTimer);
					}
				}
			break;
		}
	}
	
	menuRow.append(rowEndHtml);	
	
	/* SETUP TAP AND SWIPE EVENTS */
	
	if (numberRows>1 && !multirowMenu){

		$(".menu").touch($.extend(touchOptions, {
			 // FIFO with roundabout
			 // goes to next row
		     swipeRight: r = function() { 
				if ($(".menu-items .menu-row").size() <= 1) return;
				
				var prevRow = $(".menu-row:visible").filter(":first");
				var nextRow = prevRow.next(".menu-row");
				if (!nextRow.size()){
					nextRow = $(".menu-row:first").remove().insertAfter(".menu-row:last");
				}
				prevRow.hide("slide", { direction: "up" },animationSpeed, function(){
					nextRow.removeClass("hidden").show("slide", { direction: "down" },animationSpeed);
				});
			 },
			 // goes to previous row
		     swipeLeft: l = function() {
				 if ($(".menu-items .menu-row").size() <= 1) return;
				 
				 var prevRow = $(".menu-row:visible").filter(":first");
				 var nextRow = prevRow.prev(".menu-row");
				 if (!nextRow.size()){
				 	nextRow = $(".menu-row:last").remove().insertBefore(".menu-row:first");
				 }
				 prevRow.hide("slide", { direction: "down" },animationSpeed, function(){
				 	nextRow.removeClass("hidden").show("slide", { direction: "up" },animationSpeed);
				 });
			 }
		}));
	}
	
	$("#logo").hide();
	lockinfoDIV.show();
	
	setUpMenu($.extend({}, touchOptions));
	setUpClockAndWeatherMenu($.extend({}, touchOptions));
	if (rssEnabled){
		setUpRSS($.extend({}, touchOptions));
	}
	
	setUpActionMenu($.extend({}, touchOptions));
	
	if (centerMenuItems){
		$(".menu-row").each(function(){
			var nrItems = $(".menu-item", $(this)).size();
			var itemSize = $(".menu-item:first").width();
			$(this).css("width", (nrItems*itemSize)+"px");
		});
	}
	
	if (!useWeatherIcon){
		setTimeout(updateWeatherCustom, 100); // weatherUpdateInterval minutes
	}
	
	// load skin
	$("head").append("<link type='text/css' rel='stylesheet' href='skins/default/skin.css' />"); // load default skin
	$("head").append("<link type='text/css' rel='stylesheet' href='skins/"+skin+"/skin.css' />"); // load selected skin
	finalizeSkinImages(skin);
}
