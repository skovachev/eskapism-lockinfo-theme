var string_weather = "Погода";
var string_mail = "Почта";
var string_calendar = "Календарь";
var string_calls = "Пропущенные вызовы";
var string_voicemail = "Голосовая почта";
var string_sms = "SMS";
var string_twitter = "Twitter";
var string_todo = "Todo";
var string_rss = "RSS";

var string_noSubject = "(без темы)";
var string_from = "От:";
var string_noResponse = "Нет ответа";
var string_noCity = "Неправильный город";

var string_loadMore = "Подробнее";

// Time/date (see http://php.net/date for format syntax)
var format_time = "G:ia";
var clock_format_time = "G:ia";

// Format for date
var format_date = "d F, l";

// Short format for date
var format_date_short = "n/j/y";

// Format for date and time
var format_date_time = format_date+" "+format_time;

// Short format for date and time
var format_date_time_short = format_date_short+" "+format_time;

var string_am = "";
var string_pm = "";

// Don't forget the space after the prefix and before the suffix!
var string_begins_prefix = "Начало ";
var string_begins_suffix = "";
var string_began_prefix = "Началось ";
var string_began_suffix = "";
var string_ends_prefix = "Конец ";
var string_ends_suffix = "";

var future_prefix = "в ";
var future_suffix = "";
var past_prefix = "";
var past_suffix = " назад";

var string_today = "сегодня";
var string_yesterday = "вчера";
var string_tomorrow = "завтра";

var string_now = "сейчас";
var string_justNow = "в настоящий момент";
var string_JustUpdated = "обновлено";

var string_birthday = "день рождения";

var periods = [
	"секунда",
	"минута",
	"час",
	"день",
	"неделя",
	"месяц",
	"год"
];

var periods_plural = [
	"секунды",
	"минуты",
	"часы",
	"дни",
	"недели",
	"месяцы",
	"годы"
];

var periods_short = [
	"с",
	"м",
	"ч",
	"д",
	"н",
	"м",
	"г"
];

var shortMonths = [
	"Янв",
	"Фев",
	"Мар",
	"Апр",
	"Май",
	"Июн",
	"Июл",
	"Авг",
	"Сен",
	"Окт",
	"Ноя",
	"Дек"
];

var longMonths = [
	"Января",
	"Февраля",
	"Марта",
	"Апреля",
	"Мая",
	"Июня",
	"Июля",
	"Августа",
	"Сентября",
	"Октября",
	"Ноября",
	"Декабря"
];

var shortDays = [
	"Вск",
	"Пнд",
	"Втр",
	"Срд",
	"Чтв",
	"Птн",
	"Сбт"	
];

var longDays = [
	"Воскресение",
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота"	
];

var weatherText = [
	"Солнечно",
	"Солнечно",
	"Местами солнечно",
	"Местами облачно",
	"Солнце с туманом",
	"Облачно",
	"Облачно",
	"Пасмурно",
	"",
	"",
	"Туман",
	"Ливень",
	"Ливень",
	"Ливень",
	"Гроза",
	"Гроза",
	"Гроза",
	"Дождь",
	"Порывистый ветер",
	"Порывистый ветер",
	"Порывистый ветер",
	"Снег",
	"Снег",
	"Заморозки",
	"Дождь со снегом",
	"Гололёд",
	"",
	"",
	"Мороз",
	"Жарко",
	"Холодно",
	"Ветрено",
	"Ясно",
	"Ясно",
	"Местами облачно",
	"Местами облачно",
	"Туман",
	"Облачно",
	"Ливень",
	"Ливень",
	"Гроза",
	"Гроза",
	"Порывистый ветер",
	"Порывистый ветер"
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

