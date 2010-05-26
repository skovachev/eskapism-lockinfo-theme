(function($){  
	function iTouch(event, me, options) {
		if (options){
			var tapFunction = options.tap;
			// rename functions
			var swipeRightFunction = options.swipeLeft;
			var swipeLeftFunction = options.swipeRight;
			
			if(event && event.touches && event.touches.length == 1){
				if (options.preventDefaultEvents){
					event.stopPropagation();
				}
				var startX = event.touches[0].pageX;
				var startY = event.touches[0].pageY;
				var x = startX;
				var y = startY;
				var tapMaxDistance = options.tapMaxDistance;
				var swipeMaxY = options.swipeMaxY;
				var swipeMinDistance = options.swipeMinDistance;

				document.ontouchend = function(){
					if(typeof(tapFunction) == "function" && Math.sqrt(Math.pow(startX - x, 2) + Math.pow(startY -y, 2)) <= tapMaxDistance){
						tapFunction(options);
					}
					document.ontouchend = undefined;
					document.ontouchmove = undefined;
				};

				document.ontouchmove = function(e){
					if(Math.abs(startY - e.touches[0].pageY) > swipeMaxY){
						x = e.touches[0].pageX;
						y = e.touches[0].pageY;
						document.ontouchend(e);
						return false;
					}else if(Math.abs(startX - x) >= swipeMinDistance){
						if(Math.abs(y - e.touches[0].pageY) <= swipeMaxY){
							if(startX > x){ // right
								if(typeof(swipeRightFunction) == "function"){
									swipeRightFunction(options);
								}
							}else{ // left
								if(typeof(swipeLeftFunction) == "function"){
									swipeLeftFunction(options);
								}
							}
						}
						x = e.touches[0].pageX;
						y = e.touches[0].pageY;
						document.ontouchend(e);
					} else {
						x = e.touches[0].pageX;
						y = e.touches[0].pageY;
					}
				};
			} else if(typeof(tapFunction) == "function"){
				tapFunction(options);
			}
		}
	};
	$.fn.touch = function(options) {
		var defaults = {
			tap : function() {  },
			swipeLeft: function() {  },
			swipeRight: function() {  },
			preventDefaultEvents: true,
			tapMaxDistance : 3,
			swipeMinDistance : 60,
			swipeMaxY : 20
		};
		
		var options = $.extend(defaults, options);
		
		if (!this) return false;
		
		return this.each(function() {
			
			var me = $(this);
			me.get(0).ontouchstart = function(event){
				iTouch(event, me, options);
			};
				
		});
	};  
})(jQuery);  