/* The eskapism Lockinfo Theme is based on the Gruppled Lockinfo theme */

/*
 * Please send comments, suggestions and feature requests at itheme@eskapism.com
 * or follow the official twitter account www.twitter.com/eskapismTheme
 */

/* ==============================================================================================*/
// GENERAL SETTINGS

// Your country code
// THE FILES WITH OLD EXTENSION NEED TO BE UPDATED! CHECK en.js AND ADD THE MISSING LINES BEFORE YOU TRANSLATE AND USE
// If it's not in the strings/ folder, please translate strings/en.js and send to itheme@eskapism.com
var language = "en";
// NOTE: to change time formats, look in strings/en.js (or whatever language file you're using)

/* ==============================================================================================*/
// SECTIONS

// enableNotifications - when updated a blue bar appears at the top
// collapseItems - the secondary information for items of the type is collapsed at start
// to reorder item just switch block positions (block are defined by "-----")
var sectionsConfig = {
	"Clock&Weather" : {
		enableNotifications : true,
	},
	
	//------------------------------------
	
	"Calls&Voicemail" : {
		collapseItems : false,
		enableNotifications : true,
		limit: 5,
		disableUnreadBadge: false
	},
	
	//------------------------------------
	
	"SMS" : {
		collapseItems : false,
		enableNotifications : true,
		limit: 5,
		disableUnreadBadge: false
	},
	
	//------------------------------------
	
	"Mail" : {
		collapseItems : false,
		enableNotifications : true,
		limit: 5,
		disableUnreadBadge: false
	},
	
	//------------------------------------
	
	"Calendar" : {
		collapseItems : false,
		enableNotifications : false,
		limit: 5,
		disableUnreadBadge: false
	},

	//------------------------------------
	
	"TODO" : {
		collapseItems : false,
		enableNotifications : false,
		limit: 5,
		disableUnreadBadge: false
	},
	
	//------------------------------------
	
	"Twitter" : {
		collapseItems : false,
		enableNotifications : false,
		limit: 5,
		disableUnreadBadge: false
	},
	
	"Push" : {
		collapseItems : false,
		enableNotifications : true,
		limit: 5,
		disableUnreadBadge: false
	},
	
	//------------------------------------
	
	"RSS" : {
		collapseItems : true,
		enableNotifications : false,
		limit: 5,
		disableUnreadBadge: false
	}
	
	//------------------------------------
}

// looks for skin files in the skins/<skin_name>/ folder
// main styling file must be skin.css
// To create your own skin use the default skin folder as base
var skin = "glasklart";

// Number of items in the menu row - MAX IS 5!
var itemsInMenuRowMax = 4;

// Switch between showing 1 menu row and all menu rows at once
// true - show all rows
// false - show only one row
var multirowMenu = false;

// center the icons in the menu row if they are less than itemsInMenuRowMax
var centerMenuItems = true;

// The day the week will start on; 0(Sun) to 6(Sat)
var startDay = 0;

// Animation speed for all animations - slow, fast or medium
var animationSpeed = "fast"; 

/* ==============================================================================================*/
// SECTION DISPLAY SETTINGS

// Display the "Load More" bar at the bottom of each section if the item limit was reached?
// var displayLoadMore = true; 

// If displayLoadMore is enabled, how many more should load each time the bar is pressed?
// var loadIncrement = 5;

// Display E-Mail account name after E-Mail subject
var showMailAccounts = false;

/* ==============================================================================================*/
// RELATIVE TIME SETTINGS

// Show relative times or absolute times?
var displayRelativeTimes = true;

// Show short periods or long periods?
// Ex.
// false -> "3 hours, 2 minutes"
// true -> "3h 2m"
var displayShortPeriods = true;

// How many periods to display if not rounded? (Excludes seconds unless time < 1 minute)
// Ex.
// relativeTimeLength = 1 -> "3h"
// relativeTimeLength = 2 -> "3h 2m"
var relativeTimeLength = 2;

// Limit the frequency of updates for relative time, and round seconds:
var relativeUpdateLimit = 15;	//Seconds

// Specify how time should be rounded.
//	1: Round up (ceiling)
//	0: Normal round
// -1: Round down (floor)
var roundPeriods = [
	1,	// seconds
	1,	// minutes
	0,	// hours
	-1, // days
	0,	// weeks
	0,	// months
	0,	// years
	0	// decades
];

/* ==============================================================================================*/
// WEATHER SETTINGS

// Images must follow the same naming schema as the 'lex' set
var iconSet = "lex"; // 'lex'|'tick'
var iconExt = ".png"; //'.png'|'.gif'|etc.

// SWITCH BETWEEN WEATHER ICON PLUGIN AND CUSTOM IMPLEMENTATION
// true = uses WeatherIcon and gets weather data from Weather.app
// false = uses custom implementation and must be configured below
var useWeatherIcon = false;

// THE FOLLOWING OPTIONS ARE USED ONLY WHEN WEATHER_ICON NOT USED
//Produced by Adam Watkins (http://www.stupidpupil.co.uk)
//Modified by Craig Laparo (gruppler@gmail.com)

//Locations, following the same format as "locale" above.
//Ex. "OCN|AU|VIC|MELBOURNE", "ASI|PH|MAKATI" e.g. 'Defiance, Ohio'|'Moscow, Russia'|'London, UK'
//Visit http://accuweather.com to find something that works
var locale = [
	'Sofia, Bulgaria',
	'Moskau, Russia'
]

//Set to 'false' if you'd prefer Farenheit
var isCelsius = true;

//Use 'Real Feel' temperatures where possible, taking into account Wind Chill, Humidity etc.
var useRealFeel = false;

//To disable automatic refresh/retry, set to 0
var weatherUpdateInterval = 300; //Minutes
var weatherRetryInterval = 0.5; //Minutes

//If stop trying after this many consecutive failed attempts (set to 0 for infinite retries):
var weatherRetriesMax = 1;

//The (currently broken) 'Yahoo' which for the 'locale' requires a US zip or location code
//(e.g. UKXX0085 or CHXX0008) from http://weather.yahoo.com
var weatherSource = "Apple"; // "Yahoo" is broken for now, so use "Apple"

/*==============================================================================================================*/
//RSS SETTINGS
//Modified by Reinhold Penner (rpenner@hawaii.edu)

// SWTICH BETWEEN USING THE LOCKINFO RSS PLUGIN OR A CUSTOM IMPLEMENTATION
// true = uses RSS plugin, configuration in the Settings.app
// false = uses custom implementation - configuration data can be found below
var useRSSplugin = false;

//Set true to separate RSS accounts. 
// By swiping left and right on an open feed you can switch between accounts
var separateRssAccounts = true;

// THE FOLLOWING SETTINGS ARE USED ONLY WHEN useRSSplugin = false
//Enter the RSS feed URLs as desired
var rssSources = [
	"http://rss.cnn.com/rss/edition.rss",
	"http://feeds.feedburner.com/ajaxian"
];

//Enter the RSS feed titles (shown as headers) corresponding to the above feeds
var rssTitles = [
	"CNN.com",
	"Ajaxian.com"
];

//Enter the number of RSS items for individual feeds
var rssItems = [
	5,
	5
];

var rssRefreshTimer = 600000;		// 600 sec or 600,000 ms or 10 mins.

/* ==============================================================================================*/
// SWIPE SETTINGS

//The MAXIMUM distance your finger can move to trigger a 'tap'
var tap_maxDistance = 3;

// The MINIMUM distance your finger must move to trigger a 'swipe'
var swipe_minDistance = 60;

// The MAXIMUM vertical distance your finger can move to trigger a 'swipe'
var swipe_maxY = 20;

// Automatically remove notifications
var autoRemoveNotifications = false;

// Time until a notification is automatically removed from the lockscreen queue
var notificationRemovalTime = 10000;

