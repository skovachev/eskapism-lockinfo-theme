if (useWeatherIcon){
	callbacks['com.ashman.lockinfo.WeatherIconPlugin'] = updateWeather;
}

var weatherObjects = {};
var postals = {length:0};
var postalIdx = {length:0};
var xmlReq = new XMLHttpRequest();
var launchReq = new XMLHttpRequest();
var headID = document.getElementsByTagName("head")[0];
var scriptNode = document.createElement('script');
var weatherRetries = 0;
var lastWeatherUpdate;
var dayCodes = {
	"SUN":0,
	"MON":1,
	"TUE":2,
	"WED":3,
	"THU":4,
	"FRI":5,
	"SAT":6
};
scriptNode.type = 'text/javascript';
scriptNode.src = 'js/plugins/weatherSources/'+weatherSource+'.js';
headID.appendChild(scriptNode);

function updateWeatherCustom(){
	var pluginKey = "weather";
	flashNotification(refreshingWeather, pluginKey);
	for (var i=0; i<locale.length; i++){
		validateWeatherLocation(escape(locale[i]).replace(/^%u/g, "%"), setPostal, 0, i);
	}
}

function convertTemp(num){
	if(isCelsius){
		return Math.round((num - 32) * 5 / 9);
	}else{
		return num;
	}
}

function setPostal(obj){
	if(!obj.error){
		if(obj.cities.length > 0){
			postals[obj.id] = escape(obj.cities[0].zip).replace(/^%u/g, "%");
			postals.length++;
			postalIdx[obj.id] = obj.idx;
			postalIdx.length++;
			weatherRefresherTemp();
		}else{
			$("#weather-image img").attr("src","Icon Sets/"+iconSet+"/dunno"+iconExt);
			$("#weather-city").html("&ndash; "+string_noCity);
			if (enableNotifications(pluginKey)){
				flashNotification(errorUpdatingWeather, pluginKey);
			}
		}
	}else{
		window.clearTimeout(weatherDIV.timer);
		$("#weather-image img").attr("src","Icon Sets/"+iconSet+"/dunno"+iconExt);
		//$("#weather-city").html(obj.errorString);
		if (enableNotifications(pluginKey)){
			flashNotification(errorUpdatingWeather, pluginKey);
		}
	}
}

function getIconName(input){
	if (iconSet == "lex"){
		if (useWeatherIcon) {
			return input;
		} else {
			return weatherTICKtoLEX[input];
		}
	} else if (iconSet == "tick"){
		if (useWeatherIcon) {
			return MiniIcons[input]//weatherLEXtoTICK[input];
		} else {
			return input;
		}
	}
}

function displayWeather(obj){
	weatherRetries = 0;
	lastWeatherUpdate = new Date();
	var city = obj.city;
	var desc = weatherText[obj.icon];
	if(useRealFeel){
		tempValue = convertTemp(obj.realFeel);
	}else{
		tempValue = convertTemp(obj.temp)
	}
	var temp = tempValue+"&deg;";
	var icon = "Icon Sets/"+iconSet+"/"+getIconName(MiniIcons[obj.icon])+iconExt;

	if(obj.id == 0){
		$("#weather-city").html(city);
		$("#weather-text").html(desc);
		$("#weather-info span.grad").html(temp);
		$("#weather-image img").attr("src",icon);
	}
	
	var forecast = obj.forecast;
	var forimg = "dunno" + iconExt;
	var html = "<table id='forcasttbl'><tr>";
	
	for(i = 0; i < forecast.length; i++){
		if (i == 0) {
			// add low and high to bigger weather div
			// forecast[i].low forecast[i].high 
		} else {
			// create a mapping for when using tick with weathericon and lex with weather.js
			forimg = getIconName(MiniIcons[forecast[i].icon])+iconExt;
			html += "<td width='20%'>";
				html += "<div class='fday'>" + shortDays[dayCodes[forecast[i].daycode]] + "</div>";
				html += "<div class='fico'><img src=\"Icon Sets/"+iconSet+"/"+forimg+"\"/></div>";
				html += "<div class='fhilo'><div class='high'>" + convertTemp(forecast[i].hi) + "&deg;</div><div class='low'>" + convertTemp(forecast[i].lo) + "&deg;</div></div>";
//				html += "<div class='fdesc'>" + forecast[i].description + "</div>";
			html += "</td>";
		}
	}	
	html += "</tr></table>";
	
	weatherDIV.html(html);
	
	// if manualy refreshed reload open content
	if (currentlyOpenMainMenuElement == "weather"){
		$("#clock-weather-details-inner").html(html);
	}
}

function dealWithWeather(obj){
	var pluginKey = "weather";
	window.clearTimeout(weatherDIV.timer);
	if(!obj.error){
		weatherObjects[obj.idx] = obj;
		if (locale.length == postals.length){
			displayWeather(weatherObjects[currentCityIndex]);
			
			if(weatherUpdateInterval){
				weatherDIV.timer = window.setTimeout(weatherRefresherTemp, 60000*weatherUpdateInterval);
			}
			
			//removeNotification(pluginKey);
			if (enableNotifications(pluginKey)){
				flashNotification(notificationMessages[pluginKey], pluginKey, 0, true);
			}
		}
	} else if(weatherRetryInterval && (!weatherRetriesMax || weatherRetries <= weatherRetriesMax)){
		if(weatherRetryInterval){
			weatherDIV.timer = window.setTimeout(weatherRefresherTemp, 60000*weatherRetryInterval);
			if (enableNotifications(pluginKey)){
				flashNotification(refreshingWeather+weatherRetry+(weatherRetries+1), pluginKey);
			}
		}
	} else {
		if (enableNotifications(pluginKey)){
			flashNotification(errorUpdatingWeather, pluginKey);
		}
	}
}

function weatherRefresherTemp(){
	var pluginKey = "weather";
	flashNotification(refreshingWeather, pluginKey);
	
	weatherRetries++;
	for(var i = 0; i < postals.length; i++){
		if (postals[i])
			fetchWeatherData(dealWithWeather, postals[i], i, postalIdx[i]);
	}
}

function updateWeather(weather){
	
	var pluginKey = "weather";
	
	if (!weatherDIV){
		return false;
	}
	
	var curweather = weather.weather;
	var shortcity = curweather.city;
	var shortfeel = curweather.description;
	var weatherimg = "dunno";
	if (curweather.code > 47) { weatherimg = weatherimg; } else { weatherimg = curweather.code ; }

	var city = curweather.city;
	var desc = curweather.description;

	var temp = curweather.temp +"&deg;";
	var icon = "Icon Sets/"+iconSet+"/"+getIconName(weatherimg)+iconExt;
	$("#weather-city").html(city);
	$("#weather-text").html(desc);
	$("#weather-info span.grad").html(temp);
	$("#weather-image img").attr("src",icon);
	
	var forecast = curweather.forecast;
	var forimg = "dunno" + iconExt;
	var html = "<table id='forcasttbl'><tr>";
	
	for(i = 0; i < forecast.length; i++){
		if (i == 0) {
			// add low and high to bigger weather div
			// forecast[i].low forecast[i].high 
		} else {
			if (forecast[i].code > 47) { foreimg = foreimg; } else { foreimg = forecast[i].code  ; }
			html += "<td width='20%'>";
				html += "<div class='fday'>" + shortDays[forecast[i].daycode] + "</div>";
				html += "<div class='fico'><img src='Icon Sets/"+iconSet+"/" + getIconName(foreimg) + iconExt +"' /></div>";
				html += "<div class='fhilo'><div class='high'>" + forecast[i].high + "&deg;</div><div class='low'>" + forecast[i].low + "&deg;</div></div>";
//				html += "<div class='fdesc'>" + forecast[i].description + "</div>";
			html += "</td>";
		}
	}	
	html += "</tr></table>";
	
	weatherDIV.html(html);
	
	if (enableNotifications(pluginKey)){
		flashNotification(notificationMessages[pluginKey], pluginKey, 0, true);
	}

	return true;
}


