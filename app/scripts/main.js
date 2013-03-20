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
			if (e.keyCode === 39) {
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
			}
		});

		// Uppdatera storlekar när fönstrets storlek ändras
		$(window).resize(function () {
			App.setPageSize();
		});

		// Lyssna efter menyklick
		$('nav a').on('click', function (e) {
			var $previous = $('section.current').removeClass('current');
			e.preventDefault();
			var id = $(this).attr('href'),
				$page = $(id);
			$page.animate({
				left: 0
			}, 1000, function () {
				$previous.removeAttr('style');
			}).addClass('current');

		});
		
	};

	// # INIT
	App.init = function () {
		// Events
		App.Vents();
		// Spara .container som jQuery-objekt
		App.Elements.$container = $('.container');
		// Ge containern rätt storlek
		App.setPageSize();		
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
	
}(jQuery));

$(document).ready(function () {
	// Lift off!
	App.init();
});
