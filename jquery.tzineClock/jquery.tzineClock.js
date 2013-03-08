(function($){
	
	// A global array used by the functions of the plug-in:
	var gVars = {};

	// Extending the jQuery core:
	$.fn.tzineClock = function(opts){
	
		// "this" contains the elements that were selected when calling the plugin: $('elements').tzineClock();
		// If the selector returned more than one element, use the first one:
		
		var container = this.eq(0);
	
		if(!container)
		{
			try{
				console.log("Invalid selector!");
			} catch(e){}
			
			return false;
		}
		
		if(!opts) opts = {}; 
		
		var defaults = {
			/* Additional options will be added in future versions of the plugin. */
		};
		
		/* Merging the provided options with the default ones (will be used in future versions of the plugin): */
		$.each(defaults,function(k,v){
			opts[k] = opts[k] || defaults[k];
		})

		// Calling the setUp function and passing the container,
		// will be available to the setUp function as "this":
		setUp.call(container);
		
		return this;
	}
	
	function setUp()
	{
		// The colors of the dials:
		var colors = ['orange','blue','green'];
		
		var tmp;
		
		for(var i=0;i<3;i++)
		{
			// Creating a new element and setting the color as a class name:
			
			tmp = $('<div>').attr('class',colors[i]+' clock').html(
				'<div class="display"></div>'+
				
				'<div class="front left"></div>'+
				
				'<div class="rotate left">'+
					'<div class="bg left"></div>'+
				'</div>'+
				
				'<div class="rotate right">'+
					'<div class="bg right"></div>'+
				'</div>'
			);
			
			// Appending to the container:
			$(this).append(tmp);
			
			// Assigning some of the elements as variables for speed:
			tmp.rotateLeft = tmp.find('.rotate.left');
			tmp.rotateRight = tmp.find('.rotate.right');
			tmp.display = tmp.find('.display');
			
			// Adding the dial as a global variable. Will be available as gVars.colorName
			gVars[colors[i]] = tmp;
		}
		
		// Setting up a interval, executed every 1000 milliseconds:
		setInterval(function(){
		
			var currentTime = new Date();
			var h = currentTime.getHours();
			var m = currentTime.getMinutes();
			var s = currentTime.getSeconds();
			
			animation(gVars.green, s, 60);
			animation(gVars.blue, m, 60);
			animation(gVars.orange, h, 24);
		
		},1000);
	}
	
	function animation(clock, current, total)
	{
		// Calculating the current angle:
		var angle = (360/total)*(current+1);
	
		var element;

		if(current==0)
		{
			// Hiding the right half of the background:
			clock.rotateRight.hide();
			
			// Resetting the rotation of the left part:
			rotateElement(clock.rotateLeft,0);
		}
		
		if(angle<=180)
		{
			// The left part is rotated, and the right is currently hidden:
			element = clock.rotateLeft;
		}
		else
		{
			// The first part of the rotation has completed, so we start rotating the right part:
			clock.rotateRight.show();
			clock.rotateLeft.show();
			
			rotateElement(clock.rotateLeft,180);
			
			element = clock.rotateRight;
			angle = angle-180;
		}

		rotateElement(element,angle);
		
		// Setting the text inside of the display element, inserting a leading zero if needed:
		clock.display.html(current<10?'0'+current:current);
	}
	
	function rotateElement(element,angle)
	{
		// Rotating the element, depending on the browser:
		var rotate = 'rotate('+angle+'deg)';
		
		if(element.css('MozTransform')!=undefined)
			element.css('MozTransform',rotate);
			
		else if(element.css('WebkitTransform')!=undefined)
			element.css('WebkitTransform',rotate);
	
		// A version for internet explorer using filters, works but is a bit buggy (no surprise here):
		else if(element.css("filter")!=undefined)
		{
			var cos = Math.cos(Math.PI * 2 / 360 * angle);
			var sin = Math.sin(Math.PI * 2 / 360 * angle);
			
			element.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12=-"+sin+",M21="+sin+",M22="+cos+",SizingMethod='auto expand',FilterType='nearest neighbor')");
	
			element.css("left",-Math.floor((element.width()-200)/2));
			element.css("top",-Math.floor((element.height()-200)/2));
		}
	
	}
	
})(jQuery)

function C3Counter(id, opt) {

			this.options = {
				stepTime: 60, // not used
				format: "dd:hh:mm:ss", // not used
				startTime: "00:01:55:59",
				digitImages: 1,
				digitWidth: 30,
				digitHeight: 44,
				digitSlide : true,
				digitSlideTime : 200,
				digitImageHeight : 484,
				digitAnimationHeight : 44, 
				timerEnd: function(){},
				image: "digits.png",
				updateInterval : 1000

			};



			var s;

		 	if (typeof opt != "undefined") {
				for (s in this.options) {
					if (typeof opt[s] != "undefined") {
						this.options[s] = opt[s];
					}
				}
			}


			if (String(options.startTime).indexOf(":") == -1) {
				options.tempStartTime = options.startTime;
			} else {
				//TODO - does not convert time with : to seconds to count
				var td = new Date(options.startTime);
			}


			this.pad2 = function(number) {
   				return (number < 10 ? '0' : '') + number;
			}



			var timer = setInterval( "this.updateCounter()", options.updateInterval);
			var startTime = new Date().getTime();
			var secNo = 0;
			var timerSingle = new Array();
			var dc = 0;
			var digits = new Array();
			var d = new Date();
			var lastTime = d.getTime();


			this.calculateTime = function() {
				var tempTime = options.tempStartTime;
				if (String(options.tempStartTime).indexOf(":") == -1) {
					var seconds=Math.round(options.tempStartTime % 60);
					options.tempStartTime=Math.floor(options.tempStartTime/60);
					var minutes=Math.round(options.tempStartTime % 60);
					options.tempStartTime=Math.floor(options.tempStartTime/60);
					var hours=Math.round(options.tempStartTime % 24);
					options.tempStartTime=Math.floor(options.tempStartTime/24);
					var days=Math.round(options.tempStartTime);
					options.timeStr = this.pad2(days)+this.pad2(hours)+this.pad2(minutes)+this.pad2(seconds);

				}

				var currTime = new Date().getTime();
				var diff = currTime - startTime;

				options.tempStartTime = options.startTime - Math.round(diff/1000);
			}


			this.calculateTime();


			for (dc=0; dc<8; dc++) {
				digits[dc] = { digit: this.options.timeStr.charAt(dc)};


				$("#"+id).append("<div id='digit"+dc+"'  style='position:relative;float:left;width:"+this.options.digitWidth+"px;height:"+this.options.digitHeight+"px;overflow:hidden;'><div class='digit' id='digit-bg"+dc+"' style='position:absolute; top:-"+digits[dc].digit*this.options.digitAnimationHeight+"px; width:"+this.options.digitWidth+"px; height:"+this.options.digitImageHeight+"px; '></div></div>");


				if (dc % 2 == 1 && dc < 6) {
					$("#"+id).append("<div class='digit-separator' style='float:left;'></div>");
				}
			}

			$("#"+id).append("<div style='clear:both'></div>");

			this.animateDigits = function() {
				for (var dc=0; dc<8; dc++) {
					digits[dc].digitNext = Number(this.options.timeStr.charAt(dc));
					digits[dc].digitNext = (digits[dc].digitNext + 10)%10;

					var no = dc;

					if (digits[no].digit == 0) $("#digit-bg"+no).css("top", -this.options.digitImageHeight+this.options.digitHeight + "px");
					if (digits[no].digit != digits[no].digitNext) {
						$("#digit-bg"+no).animate( { "top" : -digits[no].digitNext*options.digitHeight+"px"}, options.digitSlideTime);
						digits[no].digit = digits[no].digitNext;
					}

				}

				var end = this.checkEnd();
			}



			this.checkEnd = function() {
				for (var i = 0; i < digits.length; i++) {
					if (digits[i].digit != 0) {
						return false;
					}
				}
				clearInterval(timer);
				this.options.timerEnd();
				return true;
			}

			this.updateCounter = function() {
				d = new Date();

				if ((d.getTime() - lastTime) < (options.updateInterval - 50)) {
					return;
				}
				lastTime = d.getTime();

				this.calculateTime();
				this.animateDigits();
			}

		}