var shadowDivTemplate = "<div class='shadow'></div>";
var currentlyOpenMenuElement = "none";
var altNotification = ''; 
var beginDateOffset = 0;
var currentCityIndex = 0;

var debug = false;

var lockinfoDIV = $("#lockinfo");
var clockDIV;
var monthDIV;
var weatherDIV;
var clockTimer;
var dayTimer;
var callbacks = new Object();

var touchOptions = {
		tapMaxDistance : tap_maxDistance,
		swipeMinDistance : swipe_minDistance,
		swipeMaxY : swipe_maxY	
	};

var defaults = {
	name : "Unnamed",
	collapseItems: false,
	enableNotifications: true,
	position: 0
}

function createSection(key){
	var menuName = menuNames[key];
	var settings = $.extend({}, defaults, $.extend({}, sectionsConfig[key], {menuName: menuName, name : key}));
	return settings;
}

var sectionToIdMapping = {
	"Clock&Weather" : "weather",
	"Calls&Voicemail" : "calls",
	"SMS" : "sms",
	"Mail" : "mail",
	"Calendar" : "calendar",
	"TODO" : "todo",
	"Twitter" : "twitter",
	"Push" : "push",
	"RSS" : "rss"
}

var sections = {};
for (var i in sectionsConfig){
	var sectionId = sectionToIdMapping[i];
	sections[sectionId] = createSection(i);
}

//Limit the number of days to display (also limited by the weather source; 7 seems to be the max)
var weatherDayLimit = 6;

// see number weather descriptions here: http://developer.yahoo.com/weather/
var weatherLEXtoTICK = {
		"0" : "tstorm3",
		"1" : "shower3",
		"2" : "shower3",
		"3" : "tstorm3",
		"4" : "tstorm3",
		"5" : "sleet",
		"6" : "hail",
		"7" : "snow4",
		"8" : "snow4",
		"9" : "cloudy5",
		"10" : "shower3",
		"11" : "light_rain",
		"12" : "light_rain",
		"13" : "snow4",
		"14" : "snow4",
		"15" : "snow5",
		"16" : "snow5",
		"17" : "tstorm3",
		"18" : "sleet",
		"19" : "sunny_night",
		"20" : "fog",
		"21" : "mist",
		"22" : "mist",
		"23" : "cloudy5",
		"24" : "cloudy5",
		"25" : "cloudy5",
		"26" : "cloudy5",
		"27" : "cloudy3_night",
		"28" : "cloudy3",
		"29" : "cloudy1_night",
		"30" : "cloudy1",
		"31" : "sunny_night",
		"32" : "sunny",
		"33" : "cloudy2_night",
		"34" : "cloudy1",
		"35" : "shower2",
		"36" : "sunny",
		"37" : "tstorm1",
		"38" : "tstorm1",
		"39" : "tstorm1",
		"40" : "shower2",
		"41" : "snow1",
		"42" : "snow2",
		"43" : "snow3",
		"44" : "cloudy2",
		"45" : "shower2_night",
		"46" : "snow3_night",
		"47" : "tstorm2_night",
		"dunno" : "dunno"
};

var weatherTICKtoLEX = {
		"cloudy1" : "34",
		"cloudy1_night" : "33",
		"cloudy2" : "30",
		"cloudy2_night" : "29",
		"cloudy3" : "28",
		"cloudy3_night" : "27",
		"cloudy4" : "28",
		"cloudy4_night" : "27",
		"cloudy5" : "26",
		"fog" : "34",
		"fog_night" : "33",
		"hail" : "18",
		"light_rain" : "11",
		"mist" : "34",
		"mist_night" : "33",
		"overcast" : "26",
		"shower1" : "39",
		"shower1_night" : "45",
		"shower2_night" : "45",
		"shower3_night" : "45",
		"shower2" : "40",
		"shower3" : "12",
		"sleet" : "5",
		"snow1_night" : "46",
		"snow1" : "41",
		"snow2_night" : "46",
		"snow2" : "42",
		"snow3_night" : "46",
		"snow3" : "43",
		"snow4" : "14",
		"snow5" : "15",
		"sunny" : "32",
		"sunny_night" : "31",
		"tstorm1_night" : "47",
		"tstorm1" : "38",
		"tstorm2_night" : "47",
		"tstorm2" : "38",
		"tstorm3" : "38",
		"dunno" : "dunno"
};

