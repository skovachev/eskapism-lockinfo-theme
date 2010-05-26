$theme = {}
$LAB.script("strings/"+language+".js").wait()
	.script("js/libs/jquery.js").wait()
	.script("js/libs/bootstrap.js").wait(function(){
		var libs = [ "jquery-ui", 
		             "jquery.jgfeed", 
		             "jquery.touch", 
		             "prototypes" , 
		             "functions",
		             "init"
		             ];
		
		var libsExtended = $.map(libs, function(n, i){
		      return "js/libs/"+n+".js";
	    });
		
		var sectionsExtended = [];
		for (var i in sectionsConfig){
			sectionsExtended.push(sectionToIdMapping[i]);
		}
		
		var sectionsExtended = $.map(sectionsExtended, function(n, i){
		      return "js/plugins/"+n+".js";
	    });

		$LAB
		.script( libsExtended )
		.script( sectionsExtended )
		.wait(function(){ // wait for all scripts to execute first
			$("head").append("<link type='text/css' rel='stylesheet' href='skins/"+skin+"/skin.css' />");
			$theme.init();
//			$LAB.script("js/libs/debug.js")
		});
	});

