/**  
  * Based on the Simplest jQuery Slideshow 
  * http://snook.ca/archives/javascript/simplest-jquery-slideshow
  */
$(document).ready(function($) {
		
	prop = 2 / 3; // Fix proportions to simplify
		
	// Deal with window resizes
	function resizedw()
	{	
		h = $('.fadein').parent().width() * prop
		w = $('.fadein').parent().width();
		
		height = h + "px";
		width = w + "px";
		
		$('.fadein').css({"height": height, "width" : width});
		$('#slidethumbs').width(width);
		
		$('.slideitem img').each(function(){
			margin = 0;
			if ($(this).data("dim" ).height >= $(this).data("dim" ).width * prop)
			{
				newwidth = h * $(this).data("dim" ).width / $(this).data("dim" ).height;
				margin = (w - newwidth) / 2;
				margin = Math.floor(margin) + "px";
				$(this).css({"height": height, "margin-left": margin, "margin-right": margin});
			}
			else
			{
				newheight = w * $(this).data("dim" ).height / $(this).data("dim" ).width;
				margin = (h - newheight) / 2;
				margin = Math.floor(margin) + "px";
				$(this).css({"width": width, "margin-top": margin, "margin-bottom": margin});
			}
		});	
	}

	var doit;
	$(window).resize(function()
	{
		clearTimeout(doit);
		doit = setTimeout(resizedw, 100);
	});
		
		
		
	//Use-anywhere slideshow
	$('.fadein img:first-child').load(function(){
		var fadelen = 1000;
		var holdlen = 4000;
		var fadeint = setInterval(fadefunction, holdlen);
	
		function fadefunction()
		{
			$('.activeslide').removeClass("activeslide");
			$('.fadein .slideitem:first-child')
				.fadeOut(fadelen)
				.next('.slideitem')
				.fadeIn(fadelen)
				.addClass("activeslide")
				.end()
				.appendTo('.fadein');
				currthumb();
		}
		
		function fadeseek(currentsrc)
		{
			$('img').removeClass("activeslide");
			$('.fadein .slideitem').each(function()
			{
				if (this.children[0].src == currentsrc)
				{
					$('.fadein .slideitem').not($(this)).fadeOut(fadelen);
					Array.prototype.reverse.call($(this).prevAll()).appendTo('.fadein');
					$(this).fadeIn(fadelen).addClass("activeslide").prependTo('.fadein');
				}
			});
			
			currthumb();
		}
		
		function currthumb()
		{
			imgSrc = $('.activeslide img').attr("src");
			$('#thumbwrapper img').each(function()
			{
				if ($(this).attr("src") == imgSrc)
				{ 
					$(this).animate({
							opacity: 1
					}, 1000);
	
					slideto = getslideto($(this).position()['left'] - (w / 2) + ($(this).width() / 2));
					$("#thumbwrapper").animate({left: slideto}, 1000);
				}
				else if ($(this).css("opacity") != 0.5)
				{
					$(this).animate({
							opacity: 0.5
					}, 1000);
				}
			});
		}
		
		h = $('.fadein').parent().width() * prop;
		w = $('.fadein').parent().width();
		
		height = h + "px";
		width = w + "px";
		
		scroll_pos = 0;
		
		$('.fadein').css({"height": height, "width" : width});
		
		var allimgs = $(".fadein").children().clone();
		$('.fadein').wrap('<div id="slider_wrapper" style="position: relative"></div>');
		
		$('.fadein img').wrap("<div class='slideitem'></div>");
		
		$('.slideitem img').each(function(){
			margin = 0;
			$(this).data("dim", {height: $(this).height(), width: $(this).width()});
			if ($(this).height() >=  $(this).width() * prop)
			{
				newwidth = h * $(this).width() / $(this).height();
				margin = (w - newwidth) / 2;
				margin = Math.floor(margin) + "px";
				$(this).css({"height": height, "margin-left": margin, "margin-right": margin});
			}
			else
			{
				newheight = w * $(this).height() / $(this).width();
				margin = (h - newheight) / 2;
				margin = Math.floor(margin) + "px";
				$(this).css({"width": width, "margin-top": margin, "margin-bottom": margin});
			}
			$( "<div class='slidetitle'><p>" + this.title + "</p></div>" ).insertAfter(this);
		});
		
		$('.fadein>div:gt(0)').hide();
		
		$("<div id='slidethumbs'><div id='thumbwrapper'></div></div>").insertAfter('.fadein');
		$('#thumbwrapper').prepend(allimgs);
		$('#thumbwrapper').css({"position": "relative", "top": 0, "left": 0});
		
		$('#slidethumbs').width(width);
		
		
		allthumbswidth = 0;
		$('#slidethumbs img').each(function(){ 
			allthumbswidth += this.width; 
		});
		
		$('#slidethumbs img').click(function(){	
			clearInterval(fadeint);
			fadeseek(this.src);
			fadeint = setInterval(fadefunction, holdlen);
		});
		
		function getslideto(slideto)
		{
			if (slideto > (allthumbswidth - w))
			{
				slideto = allthumbswidth - w;
			}
			if (slideto < 0)
			{
				slideto = 0;
			}
			slideto = "-" + slideto + "px";
			return slideto;
		}
		
	});
});
