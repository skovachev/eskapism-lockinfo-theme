var string_weather = "�����";
?var string_mail = "����";
var string_calendar = "��������";
var string_calls = "���������� ����������";
var string_voicemail = "������� ����";
var string_sms = "���������";
var string_twitter = "Twitter";
var string_todo = "������";
var string_rss = "���������";

var string_noSubject = "(��� ����)";
var string_from = "��:";
var string_noResponse = "�� ���������";
var string_noCity = "��������� ����";

var string_loadMore = "�������� ���";

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

var string_am = "����� ����";
var string_pm = "���� ����";

// Don't forget the space after the prefix and before the suffix!
var string_begins_prefix = "������� ";
var string_begins_suffix = "";
var string_began_prefix = "������� ";
var string_began_suffix = "";
var string_ends_prefix = "������� ";
var string_ends_suffix = "";

var future_prefix = "���� ";
var future_suffix = "";
var past_prefix = "����� ";
var past_suffix = "";

var string_today = "����";
var string_yesterday = "�����";
var string_tomorrow = "����";

var string_now = "����";
var string_justNow = "����� �����";
var string_JustUpdated = "����� �� ������";

var string_birthday = "������ ���";

var periods = [
	"���",
	"���",
	"���",
	"���",
	"���",
	"���",
	"���"
];

var periods_plural = [
	"���",
	"���",
	"����",
	"���",
	"���",
	"���",
	"���"
];

var periods_short = [
	"���",
	"���",
	"�",
	"�",
	"���",
	"���",
	"���"
];

var shortMonths = [
	"���",
	"���",
	"����",
	"���",
	"���",
	"���",
	"���",
	"���",
	"���",
	"���",
	"���",
	"���"
];

var longMonths = [
	"������",
	"��������",
	"����",
	"�����",
	"���",
	"���",
	"���",
	"������",
	"���������",
	"��������",
	"�������",
	"��������"
];

var shortDays = [
	"��",
	"��",
	"��",
	"��",
	"��",
	"��",
	"��"
];

var longDays = [
	"������",
	"����������",
	"�������",
	"�����",
	"���������",
	"�����",
	"������"
];

var weatherText = [
	"��������",
	"�������� ��������",
	"�������� ��������",
	"�������� ���������",
	"������",
	"�������� �������",
	"�������",
	"������",
	"",
	"",
	"�������",
	"�����",
	"�����",
	"�����",
	"������������",
	"������������",
	"������������",
	"����",
	"������ �����������",
	"������ �����������",
	"������ �����������",
	"����",
	"����",
	"���",
	"��������",
	"��������",
	"",
	"",
	"���� � ����",
	"������",
	"�������",
	"���������",
	"����",
	"�������� ����",
	"�������� ���������",
	"�������� ���������",
	"������",
	"�������� �������",
	"�����",
	"�����",
	"������������",
	"������������",
	"������ �����������",
	"������ �����������"
];

// Note: all names get converted to small caps
var menuNames = {		 		/* ������� ���� ������ */
	"����������&������� ����" :  	/**/	"�������",       
	"���" : 			 	/**/	"���",
	"����" : 			 	/**/	"����",
	"��������" : 		 	/**/	"��������",
	"������" : 			 	/**/	"������",
	"������" : 		 		/**/	"������",
	"�����������" : 			/**/	"���",
	"������" : 			 	/**/	"������"
}

var noItems = {		 		/* ������� ���� ������ */
	"����������" :  			/**/	"���� ���������� ����������.",       
	"���" : 				/**/	"���� ���� ���������.",
	"����" : 				/**/	"���� ���� ����.",
	"��������" : 			/**/	"���� ���������� �������.",
	"������" : 				/**/	"���� ���������� ������.",
	"������" : 		 		/**/	"���� ���� �������.",
	"�����������" : 			/**/	"���� ���� �����������.",
	"������" : 				/**/	"���� ���� ��������."
}

var notificationMessages = {
						/* ������� ���� ������ */
	"�������" :  			/**/	"������� � ��������.",
	"����������" :  			/**/	"����� ���������� ���������� ��� ������� ����.",       
	"���" : 				/**/	"����� ���� ���������.",
	"����" : 				/**/	"����� ���� ���������� �����.",
	"��������" : 			/**/	"����� ���� ���������� �������.",
	"������" : 				/**/	"����� ���� ���������� ������.",
	"������" : 		 		/**/	"����� ���� �������.",
	"�����������" : 			/**/	"����� ���� �����������.",
	"������" : 				/**/	"����� ���� �������� � ������."
}