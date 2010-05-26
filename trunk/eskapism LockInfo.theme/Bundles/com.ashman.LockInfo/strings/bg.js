var string_weather = "Време";
?var string_mail = "Поща";
var string_calendar = "Календар";
var string_calls = "Пропуснати повиквания";
var string_voicemail = "Гласова поща";
var string_sms = "Съобщения";
var string_twitter = "Twitter";
var string_todo = "Задачи";
var string_rss = "Агрегатор";

var string_noSubject = "(без тема)";
var string_from = "От:";
var string_noResponse = "Не реагиране";
var string_noCity = "Невалиден град";

var string_loadMore = "Заредете Още";

// Time/date (see http://php.net/date for format syntax)
var format_time = "H:i";
var clock_format_time = "H:i";

// Format for date
var format_date = "d F, l";

// Short format for date
var format_date_short = "d/m/y";

// Format for date and time
var format_date_time = format_date+" "+format_time;

// Short format for date and time
var format_date_time_short = format_date_short+" "+format_time;

var string_am = "преди обяд";
var string_pm = "след обяд";

// Don't forget the space after the prefix and before the suffix!
var string_begins_prefix = "Започва ";
var string_begins_suffix = "";
var string_began_prefix = "Започна ";
var string_began_suffix = "";
var string_ends_prefix = "Свършва ";
var string_ends_suffix = "";

var future_prefix = "след ";
var future_suffix = "";
var past_prefix = "преди ";
var past_suffix = "";

var string_today = "днес";
var string_yesterday = "вчера";
var string_tomorrow = "утре";

var string_now = "сега";
var string_justNow = "преди малко";
var string_JustUpdated = "тъкмо се обнови";

var string_birthday = "рожден ден";

var periods = [
	"сек",
	"мин",
	"час",
	"ден",
	"сед",
	"мес",
	"год"
];

var periods_plural = [
	"сек",
	"мин",
	"часа",
	"дни",
	"сед",
	"мес",
	"год"
];

var periods_short = [
	"сек",
	"мин",
	"ч",
	"д",
	"сед",
	"мес",
	"год"
];

var shortMonths = [
	"Яну",
	"Феб",
	"Март",
	"Апр",
	"Май",
	"Юни",
	"Юли",
	"Авг",
	"Сеп",
	"Окт",
	"Ное",
	"Дек"
];

var longMonths = [
	"Януари",
	"Февруари",
	"Март",
	"Април",
	"Май",
	"Юни",
	"Юли",
	"Август",
	"Септември",
	"Октомври",
	"Ноември",
	"Декември"
];

var shortDays = [
	"Нд",
	"Пн",
	"Вт",
	"Ср",
	"Чт",
	"Пт",
	"Сб"
];

var longDays = [
	"Неделя",
	"Понеделник",
	"Вторник",
	"Сряда",
	"Четвъртък",
	"Петък",
	"Събота"
];

var weatherText = [
	"Слънчево",
	"Предимно слънчево",
	"Частично слънчево",
	"Частична облачност",
	"Мрачно",
	"Предимно облачно",
	"Облачно",
	"Мрачно",
	"",
	"",
	"Мъгливо",
	"Порой",
	"Порой",
	"Порой",
	"Гръмотевично",
	"Гръмотевично",
	"Гръмотевично",
	"Дъжд",
	"Кратко преваляване",
	"Кратко преваляване",
	"Кратко преваляване",
	"Сняг",
	"Сняг",
	"Лед",
	"Градушка",
	"Градушка",
	"",
	"",
	"Дъжд и сняг",
	"Горещо",
	"Студено",
	"Ветровито",
	"Ясно",
	"Предимно ясно",
	"Частична облачност",
	"Частична облачност",
	"Мрачно",
	"Предимно облачно",
	"Порой",
	"Порой",
	"Гръмотевично",
	"Гръмотевично",
	"Кратко преваляване",
	"Кратко преваляване"
];

// Note: all names get converted to small caps
var menuNames = {		 		/* Преведи тази колона */
	"Повиквания&Гласова поща" :  	/**/	"телефон",       
	"СМС" : 			 	/**/	"смс",
	"Поща" : 			 	/**/	"поща",
	"Календар" : 		 	/**/	"календар",
	"Задачи" : 			 	/**/	"задачи",
	"Туитър" : 		 		/**/	"туитър",
	"Нотификации" : 			/**/	"пуш",
	"Новини" : 			 	/**/	"новини"
}

var noItems = {		 		/* Преведи тази колона */
	"повиквания" :  			/**/	"Няма пропуснати повиквания.",       
	"смс" : 				/**/	"Няма нови съобщения.",
	"поща" : 				/**/	"Няма нова поща.",
	"календар" : 			/**/	"Няма предстоящи събития.",
	"задачи" : 				/**/	"Няма предстоящи задачи.",
	"туитър" : 		 		/**/	"Няма нови постове.",
	"нотификации" : 			/**/	"Няма нови нотификации.",
	"новини" : 				/**/	"Няма нови заглавия."
}

var notificationMessages = {
						/* Преведи тази колона */
	"времето" :  			/**/	"Времето е обновено.",
	"повиквания" :  			/**/	"Имате пропуснати повиквания или гласова поща.",       
	"смс" : 				/**/	"Имате нови съобщения.",
	"поща" : 				/**/	"Имате нови електронни писма.",
	"календар" : 			/**/	"Имате нови предстоящи събития.",
	"задачи" : 				/**/	"Имате нови предстоящи задачи.",
	"туитър" : 		 		/**/	"Имате нови постове.",
	"нотификации" : 			/**/	"Имате нови нотификации.",
	"новини" : 				/**/	"Имате нови заглавия в новини."
}