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
		
		// Boota sliders
		App.Elements.$vertical = $('#vertical-slider');
		App.Elements.$horizontal = $('#horizontal-slider');

		App.setSliderSize(App.Elements.$vertical);
		App.setSlidesWidth($('.vertical-slide'));
		$('button').on('click', function () {
			App.slide(App.Elements.$vertical, $(this).data('dir'));
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
	App.setSliderSize = function ($slider) {
		$slider.css('width', App.countSlides($slider) + '00%');		
	};
	// Räkna ut bredden på varje slide
	App.setSlidesWidth = function ($selector) {
		$selector.each(function () {
			var width = 100 / $selector.length;
			$(this).css('width', width + '%')
		});
	};
	App.slide = function ($slider, dir) {
		$slider.animate({
			marginLeft : dir+'=100%'
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