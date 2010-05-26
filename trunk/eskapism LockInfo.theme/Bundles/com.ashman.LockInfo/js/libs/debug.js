var cal = {"events":[
    {"calendar":"Calendar One","start":(new Date()).zeroTime().getTime(), "end":(new Date()).zeroTime().getTime()+24*3600000,"summary":"FOOBAR Birthday", "allDay":1, "location": "Everywhere"},
    {"calendar":"Calendar One","start":(new Date()).zeroTime().getTime(), "end":(new Date()).zeroTime().getTime()+48*3600000,"summary":"FOOBAR2", "allDay":1, "location": "Everywhere"},
    {"calendar":"Calendar One","start":(new Date()).getTime(), "end":(new Date()).getTime()+10000,"summary":"FoOoO", "allDay":0, "location": "Everywhere"}
]};

var mail = {"messages":[
    {"account":"GMail", "subject":"Wanna go bowling?","sender":"Kathy","received":(new Date()).getTime()},
    {"account":"GMail", "subject":"","sender":"Rick","received":(new Date()).getTime()-120000},
    {"account":"Yahoo", "subject":"Hello","sender":"Janet Jones","received":(new Date()).getTime()-60000}
]};

var sms = {"messages":[
    {"date": 2249122044000, "groupId": "SAP","text":"Message content 1","sender":"Jimmy"},
    {"date": 2249122044000, "groupId": "SAP","text":"Message content 2","sender":"Phone Services"},
    {"date": 2249122044000, "groupId": "SAP","text":"Message content 3 ","sender":"Auntie"}
]};

var calls = {
    "calls":[
        {"caller":"Jane Johnson", "date":(new Date()).getTime() , "label": "work"},
        {"caller":"Mattew Frederik", "date":(new Date()).getTime() - 60000, "label": "mobile"}
    ],
    "voicemail":[
        {"caller":"Steve Johnson", "date":(new Date()).getTime(), "duration":10, "label": "home"},
        {"caller":"Bertha", "date":(new Date()).getTime() - 60000, "label": "home"}
    ]
};

var todo = {
	todos:[
		{
			color_r : 0.255,
			color_g : 0.5,
			color_b : 0.5,
			name : "Clean up the house",
			priority: 3,
			note: "and wash the dishes",
			due: 1284219049
		},
		{
			color_r : 0.5,
			color_g : 0.2,
			color_b : 0.5,
			name : "Feed my dog",
			note: "with Whiskas!",
			priority: 2,
			due: 1284219049
		},
		{
			color_r : 0.255,
			color_g : 0.5,
			color_b : 0.5,
			name : "Drive the car home",
			note: "Licence plate: CA 4503 AA",
			priority: 4,
			due: 1284219049
		},
		{
			color_r : 0.5,
			color_g : 0.2,
			color_b : 0.5,
			name : "Go to concert",
			note: "Rammstein!!",
			priority: 1,
			due: 1284219049
		}
	]
}

var twitter = {
	tweets:[
		{
			name: "skovachev",
			date: 232151435343,
			tweet: "Hey there its me!"
		},
		{
			name: "samshing",
			date: 232151435343,
			tweet: "Whats up homies?!"
		},
		{
			name: "goergerl",
			date: 232151435343,
			tweet: "Yaaauuzzaa...!"
		}
	]
}


var push = {
		notifications:[
			{
				application: "Facebook",
				date: 232151435343,
				text: "Hey there its me!"
			},
			{
				application: "Skype",
				date: 232151435343,
				text: "Whats up homies?!"
			}
		]
	}

var rss = {
		feeds : [
			[
				{
					channel: "Gizmodo Tech Blog",
					title: "Synchronization: Notes 1",
					date: new Date("Tue, 20 Apr 2010 14:17:14 +0000"),
					description: "One of my goals when choosing a handheld device was the ability to have all my information with me at all times. That included my contacts, notes, events and tasks. Also I wanted to be able to edit these lists of data from anywhere I have an internet connection.  I have been searching for apps [...]",
					noPlugin: true
				},
				{
					channel: "Planewalkers Abode - Blog",
					title: "iPhone OS 4 1",
					date: new Date("Tue, 20 Apr 2010 14:17:14 +0000"),
					description: "For almost half an year I have been an iPhone user. This device is so much more than a phone – nowadays there are apps for absolutely everything. As an avid Apple fan I’m opening a new category in my blog, which will handle topics like iPhone, Apple, iPhone OS, iPad etc. This is the [...]",
					noPlugin: true
				}
			],
			[
				{
					channel: "Gizmodo Tech Blog",
					title: "Synchronization: Notes 2",
					date: new Date("Tue, 20 Apr 2010 14:17:14 +0000"),
					description: "One of my goals when choosing a handheld device was the ability to have all my information with me at all times. That included my contacts, notes, events and tasks. Also I wanted to be able to edit these lists of data from anywhere I have an internet connection.  I have been searching for apps [...]",
					noPlugin: true
				},
				{
					channel: "Planewalkers Abode - Blog",
					title: "iPhone OS 4 2",
					date: new Date("Tue, 20 Apr 2010 14:17:14 +0000"),
					description: "For almost half an year I have been an iPhone user. This device is so much more than a phone – nowadays there are apps for absolutely everything. As an avid Apple fan I’m opening a new category in my blog, which will handle topics like iPhone, Apple, iPhone OS, iPad etc. This is the [...]",
					noPlugin: true
				}
			]
		]
	}

//document.body.style.background = "gray";
window.setTimeout(function(){updatePush(push);updateRSS(rss);updatePhone(calls);updateCalendar(cal);updateMail(mail);updateSMS(sms); updateTODO(todo); /*updateTwitter(twitter)*/ }, 1000);

