(function ($) {
	'use strict';

	var App = App || {};
	window.App = App;

	// Element
	App.Elements = {};

	// Events
	App.Vents = function () {

		// Lyssna efter tryck på piltangenterna
		$('body').on('keyup', function (e) {
			/*if (e.keyCode === 39) {
				App.horizontalSlide('-');
			}
			if (e.keyCode === 37) {
				App.horizontalSlide('+');
			}
			if (e.keyCode === 38) {
				App.verticalSlide('+');
			}
			if (e.keyCode === 40) {
				App.verticalSlide('-');
			}*/
		});

		// Uppdatera storlekar när fönstrets storlek ändras
		$(window).resize(function () {
			App.setPageSize();
			App.horizontalSlideshow.setImagesize();
		});

		// Lyssna efter menyklick
		$('nav a').on('click', App.slideIn);
		
	};

	// # INIT
	App.init = function () {
		// Events
		App.Vents();
		// Spara .container som jQuery-objekt
		App.Elements.$container = $('.container');
		// Ge containern rätt storlek
		App.setPageSize();
		$('section.current').css('left', 0);
		App.horizontalSlideshow.init();
	};

	// Ta reda på webbläsarens fönsterstorlek
	App.getWindowSize = function () {
		var $window = $(window),
			width = $window.width(),
			height = $window.height();
		
		return {
			width: width,
			height: height
		};
	};

	// Ge varje .page rätt storlek
	App.setPageSize = function () {
		var windowSize = App.getWindowSize();
		App.Elements.$container.css({
			width: windowSize.width,
			height: windowSize.height
		});
	};

	App.slideIn = function (e) {
		var $previous = $('section.current').removeClass('current');
		e.preventDefault();
		var id = $(this).attr('href'),
			$page = $(id);
		$page.animate({
			left: 0
		}, 1000, function () {
			$previous.removeAttr('style');
		}).addClass('current');
	};

	App.horizontalSlideshow = {
		elements: {},

		Vents : function() {
			var self = this;
			$('body').on('keydown', function (e) {
				if (e.keyCode === 40) {
					e.preventDefault();
					if ($('.slideshow li.hidden').length === 0) {
						self.elements.$li.addClass('hidden');
					}
					self.slide('-');
				}
				if (e.keyCode === 38) {
					e.preventDefault();
					self.slide('+');
				}
			});

			$('.scroll').on('scroll', function () {
				if ($('.slideshow li.hidden').length) {
					var offset = self.elements.$slideshow.css('top',0);
					$('.slideshow li.hidden').removeClass('hidden');
					$(this).scrollTop(offset);
				}
			});
		},

		init: function() {
			this.elements.$slideshow = $('.slideshow');
			this.elements.$li = this.elements.$slideshow.find('li');
			this.elements.$img = this.elements.$li.find('img');
			//this.setPosition($slideshow);
			//$('.slideshow').find('li').css('height', App.getWindowSize().height * 0.8);
			
			this.setImagesize();
			this.Vents();
		},

		setPosition: function ($slideshow) {
			$slideshow.css({
				'top': '50%'
			});
		},

		setImagesize: function () {
			var windowSize = Math.floor(App.getWindowSize().height),
				height = Math.floor(windowSize * 0.8),
				padding = (height/2)/2,
				height = height-padding;
			this.elements.$li.css({
				'height': height + 'px',
				'padding-top': padding + 'px',
				'padding-bottom': padding + 'px'
			});
		},

		currentSlide: 1,

		slide: function (dir) {
			var self = this;
			if (dir === '-') {
				if (this.currentSlide !== this.elements.$li.length) {
					this.currentSlide = this.currentSlide+1;
				} else {
					return false;
				}
				
			} 
			if (dir === '+') {
				if (this.currentSlide !== 1) {
					this.currentSlide = this.currentSlide-1;
				} else {
					return false;
				}
			}
			
			this.elements.$slideshow.animate({
				top: dir +'='+ App.getWindowSize().height + 'px'
			}, 1000, function () {
				self.elements.$li.addClass('hidden');
				$(self.elements.$li[self.currentSlide-1]).removeClass('hidden');
			});

		}

	};
	
}(jQuery));

$(document).ready(function () {
	// Lift off!
	App.init();
});
