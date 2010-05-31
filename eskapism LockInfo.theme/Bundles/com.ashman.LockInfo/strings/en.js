var string_weather = "Weather";
var string_mail = "Mail";
var string_calendar = "Calendar";
var string_calls = "Missed Calls";
var string_voicemail = "Voicemail";
var string_sms = "SMS";
var string_twitter = "Twitter";
var string_todo = "Todo";
var string_rss = "RSS";

var string_noSubject = "(no subject)";
var string_from = "From:";
var string_noResponse = "No Response";
var string_noCity = "Invalid City";

var string_time_from = "From";
var string_time_to = "to";

var string_loadMore = "Load More";

// Time/date (see http://php.net/date for format syntax)
var format_time = "H:i";
var clock_format_time = "H:i";

// Format for date
var format_date = "l, F j";

// Short format for date
var format_date_short = "j M";//"n/j/y";

var format_date_longer= "j F";

// Format for date and time
var format_date_time = format_date+" "+format_time;

// Short format for date and time
var format_date_time_short = format_date_short+" "+format_time;

var string_am = "am";
var string_pm = "pm";

// Don't forget the space after the prefix and before the suffix!
var string_begins_prefix = "Begins ";
var string_begins_suffix = "";
var string_began_prefix = "Began ";
var string_began_suffix = "";
var string_ends_prefix = "Ends ";
var string_ends_suffix = "";

var future_prefix = "in ";
var future_suffix = "";
var past_prefix = "";
var past_suffix = " ago";

var string_today = "today";
var string_yesterday = "yesterday";
var string_tomorrow = "tomorrow";

var string_now = "now";
var string_justNow = "just now";
var string_JustUpdated = "Just updated";

var string_birthday = "birthday";

var periods = [
	"second",
	"minute",
	"hour",
	"day",
	"week",
	"month",
	"year"
];

var periods_plural = [
	"seconds",
	"minutes",
	"hours",
	"days",
	"weeks",
	"months",
	"years"
];

var periods_short = [
	"s",
	"m",
	"h",
	"d",
	"w",
	"m",
	"y"
];

var shortMonths = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];

var longMonths = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

var shortDays = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];

var longDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

var weatherText = [
	"Sunny",
	"Mostly Sunny",
	"Partly Sunny",
	"Partly Cloudy",
	"Hazy Sunshine",
	"Mostly Cloudy",
	"Cloudy",
	"Overcast",
	"",
	"",
	"Foggy",
	"Showers",
	"Showers",
	"Showers",
	"Thunderstorm",
	"Thunderstorm",
	"Thunderstorm",
	"Rain",
	"Flurries",
	"Flurries",
	"Flurries",
	"Snow",
	"Snow",
	"Ice",
	"Sleet",
	"Freezing Rain",
	"",
	"",
	"Wintry Mix",
	"Hot",
	"Cold",
	"Windy",
	"Clear",
	"Mostly Clear",
	"Partly Cloudy",
	"Partly Cloudy",
	"Hazy",
	"Mostly Cloudy",
	"Showers",
	"Showers",
	"Thunderstorm",
	"Thunderstorm",
	"Flurries",
	"Flurries"
];

// Note: all names get converted to small caps
var menuNames = {		 /* Translate this column */
	"Calls&Voicemail" :  /**/	"phone",       
	"SMS" : 			 /**/	"sms",
	"Mail" : 			 /**/	"mail",
	"Calendar" : 		 /**/	"calendar",
	"TODO" : 			 /**/	"todo",
	"Twitter" : 		 /**/	"twitter",
	"Push" : 			 /**/	"push",
	"RSS" : 			 /**/	"rss"
}

var noItems = {		 	 /* Translate this column */
	"calls" :  			 /**/	"No calls or voicemail messages.",       
	"sms" : 			 /**/	"No new messages.",
	"mail" : 			 /**/	"No new E-Mails.",
	"calendar" : 		 /**/	"No upcoming events.",
	"todo" : 			 /**/	"No Todo items.",
	"twitter" : 		 /**/	"No new tweets.",
	"push" : 			 /**/	"No new notifications.",
	"rss" : 			 /**/	"No new articles."
}

var notificationMessages = {
						 /* Translate this column */
	"weather" :  		 /**/	"Weather has been updated.",
	"calls" :  			 /**/	"You have missed calls or voicemail.",       
	"sms" : 			 /**/	"You have new SMS messages.",
	"mail" : 			 /**/	"You have new E-Mail messages.",
	"calendar" : 		 /**/	"New events in calendar.",
	"todo" : 			 /**/	"You have new Todo tasks.",
	"twitter" : 		 /**/	"You have a new tweets.",
	"push" : 			 /**/	"New notifications pushed.",
	"rss" : 			 /**/	"New articles in feed."
}

var errorUpdatingWeather = "Error updating weather.";
var refreshingWeather = "Refreshing weather...";
var weatherRetry = " Retry ";
var refreshingRSS = "Reloading RSS feeds...";
var rssRefreshed = "RSS feeds loaded successfully.";

var refreshString = "refresh";
