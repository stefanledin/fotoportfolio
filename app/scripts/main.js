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
	
	// # VERTICAL SLIDER
	// Ta reda på hur många slides som finns
	// Räkna ut bredden på #vertical-slider. (3 slides = 300%)
	// Slide-funktion. 
	// 		1. Kolla vilken position i slidern man är på.
	// 		2. Ändra margin-left på #vertical-slider åt något håll när man klickar på något.
	// 
	// (Alltihop en gång till, fast för HORIZONTAL SLIDER)
	
	// Lift off!
	App.init();

}(jQuery));