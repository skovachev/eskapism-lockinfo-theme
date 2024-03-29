var string_weather = "Pogoda";
var string_mail = "Poczta";
var string_calendar = "Kalendaż";
var string_calls = "Nieodebrane Połączenia";
var string_voicemail = "Poczta Głosowa";
var string_sms = "SMS";
var string_twitter = "Twitter";
var string_todo = "Todo";
var string_rss = "RSS";

var string_noSubject = "(niema tytułu)";
var string_from = "Od:";
var string_noResponse = "Brak Odpowiedzi";
var string_noCity = "Nie Znaleziono";

var string_loadMore = "Załaduj Więcej";

// Time/date (see http://php.net/date for format syntax)
var format_time = "G:i";
var clock_format_time = "G:i";

// Format for date
var format_date = "D, j F";

// Short format for date
var format_date_short = "j/n/Y";

// Format for date and time
var format_date_time = format_date+" "+format_time;

// Short format for date and time
var format_date_time_short = format_date_short+" "+format_time;

var string_am = "am";
var string_pm = "pm";

// Don't forget the space after the prefix and before the suffix!
var string_begins_prefix = "Zaczyna się ";
var string_begins_suffix = "";
var string_began_prefix = "";
var string_began_suffix = " zaczął";
var string_ends_prefix = "Kończy się ";
var string_ends_suffix = "";

var future_prefix = "za ";
var future_suffix = "";
var past_prefix = "";
var past_suffix = " temu";

var string_today = "dzisiaj";
var string_yesterday = "wczoraj";
var string_tomorrow = "jutro";

var string_now = "teraz";
var string_justNow = "przed chwilą";
var string_JustUpdated = "kilka minut temu";

var string_birthday = "urodziny";

var periods = [
   "sekunda",
   "minuta",
   "godzina",
   "dzień",
   "tyddień",
   "miesiąc",
   "rok"
];

var periods_plural = [
   "sekundy",
   "minuty",
   "godziny",
   "dni",
   "tygodnie",
   "miesiące",
   "lata"
];

var periods_short = [
   "s",
   "m",
   "h",
   "d",
   "t",
   "m",
   "l"
];

var shortMonths = [
   "Sty",
   "Lut",
   "Mar",
   "Kwi",
   "Maj",
   "Cze",
   "Lip",
   "Sie",
   "Wrz",
   "Pa?",
   "Lis",
   "Gru"
];

var longMonths = [
   "Styczeń",
   "Luty",
   "Marzec",
   "Kwiecień",
   "Maj",
   "Czerwiec",
   "Lipiec",
   "Sierpień",
   "Wrzesień",
   "Październik",
   "Listopad",
   "Grudzień"
];

var shortDays = [
   "Ndz",
   "Pn ",
   "Wt ",
   "Śr ",
   "Czw",
   "Pt ",
   "So "
];

var longDays = [
   "Niedziela",
   "Poniedziałek",
   "Wtorek",
   "Środa",
   "Czwartek",
   "Piątek",
   "Sobota"
];

var weatherText = [
   "Słonecznie",
   "Bardzo Słonecznie",
   "Częściowo Słonecznie",
   "Częściowo Pochmurnie",
   "Mgliście",
   "Duże Zachmurzenie",
   "Pochmurno",
   "Overcast",
   "",
   "",
   "Mgliście",
   "Mrzawka",
   "Mrzawka",
   "Mrzawka",
   "Burza",
   "Burza",
   "Burza",
   "Deszcz",
   "Ulewy",
   "Ulewy",
   "Ulewy",
   "Śnieg",
   "Śnieg",
   "Mróz",
   "Ślizgo",
   "Marznący Deszcz",
   "",
   "",
   "Deszcz ze Śniegiem",
   "Gorąco",
   "Zimno",
   "Wietrznie",
   "Przejrzyście",
   "Bardzo Przejrzyście",
   "Częściowe Zachmurzenie",
   "Częściowe Zachmurzenie",
   "Mgliście",
   "Bardzo Pochmurno",
   "Mrzawka",
   "Mrzawka",
   "Burza",
   "Burza",
   "Ulewy",
   "Ulewy"
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
﻿
