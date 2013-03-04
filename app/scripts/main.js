(function ($) {
	'use strict';

	var App = App || {};
	window.App = App;

	// Element
	App.Elements = {};

	// # INIT
	App.init = function () {
		// Spara .container som jQuery-objekt
		App.Elements.$container = $('.container');
		// Ge containern rätt storlek
		App.setContainerSize();
		// Uppdatera containerns storlek om storleken på fönstret ändras.
		$(window).resize(App.setContainerSize);
		
		// Boota #vertical-slider
		App.Elements.$vertical = $('#vertical-slider');

		App.setSliderSize(App.Elements.$vertical, 'width');
		App.setSlidesSize($('.vertical-slide'), 'width');
		App.verticalSliderPosition = 0;
		$('button.vertical-controller').on('click', function () {
			App.verticalSlide($(this).data('dir'));
		});

		// Boota #horizontal-slider
		App.Elements.$horizontal = $('#horizontal-slider');
		App.setSliderSize(App.Elements.$horizontal, 'height');
		App.setSlidesSize($('.horizontal-slide'), 'height');
		App.horizontalSliderPosition = 0;
		$('button.horizontal-controller').on('click', function () {
			App.horizontalSlide($(this).data('dir'));
		});
	};
	// Ta reda på webbläsarens fönsterstorlek
	App.getWindowSize = function () {
		var $document = $(document),
			width = $document.width(),
			height = $document.height();
		
		return {
			width: width,
			height: height
		};
	};

	// .container ska ha den storleken
	App.setContainerSize = function () {
		var windowSize = App.getWindowSize();
		App.Elements.$container.css({
			width: windowSize.width,
			height: windowSize.height
		});
	};
	
	// # SLIDER
	// Ta reda på hur många slides som finns
	App.countSlides = function ($slider) {
		return $slider.children().length;	
	};
	// Räkna ut bredden på #vertical-slider. (3 slides = 300%)
	App.setSliderSize = function ($slider, property) {
		$slider.css(property, App.countSlides($slider) + '00%');		
	};
	// Räkna ut bredden på varje slide
	App.setSlidesSize = function ($selector, property) {
		$selector.each(function () {
			$(this).css(property, 100 / $selector.length + '%')
		});
	};
	App.verticalSlide = function (dir) {
		App.Elements.$vertical.animate({
			marginLeft : dir+'=100%'
		});
	};
	App.horizontalSlide = function (dir) {
		App.Elements.$horizontal.animate({
			marginTop : dir+'=100%'
		});
	};

	// Slide-funktion. 
	// 		1. Kolla vilken position i slidern man är på.
	// 		2. Ändra margin-left på #vertical-slider åt något håll när man klickar på något.
	// 
	// (Alltihop en gång till, fast för HORIZONTAL SLIDER)
	
	// Lift off!
	App.init();

}(jQuery));