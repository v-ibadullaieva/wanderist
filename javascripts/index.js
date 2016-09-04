'use strict';

$(function() {
	$('.js-star-rating').barrating({
		theme: 'fontawesome-stars'
	});

    $('.js-toggle-btn').click(function (e) {
    	e.preventDefault();

    	var $this = $(this);
    	var target = $this.data('target');

		$this.find('.js-down').toggleClass('h-hidden');
		$this.find('.js-up').toggleClass('h-hidden');
    	$(target).slideToggle('slow');
    });

    $('.js-sidebar-toggle').click(function (e) {
        e.preventDefault();

        var $btn = $(this);
        var $target = $($btn.data('target'));
        var $map = $target.find('.c-details-container__map');
        var $sidebar = $target.find('.c-details-container__sidebar');

        $btn.find('.js-left').toggleClass('h-hidden');
        $btn.find('.js-right').toggleClass('h-hidden');

        $sidebar.toggleClass('c-details-container__sidebar--hidden');
        $map.toggleClass('c-details-container__map--full-width');
        $btn.toggleClass('c-side-btn--active');

        setTimeout(updateMap, 400);
    });

    $('.js-accordion').accordion({
      collapsible: true,
      heightStyle: 'content'
    });

    $('.js-btn-expand').click(function(e) {
    	e.preventDefault;

    	var $this = $(this);

		$this.find('.js-toggle-up').toggleClass('h-hidden');;
		$this.find('.js-toggle-down').toggleClass('h-hidden');;
    });

    var updateMap = (function() {
        var map = null;

        function initializeMap() {
            var mapCanvas = document.getElementById('map');

            if (!mapCanvas) return;

            var mapOptions = {
                center: new google.maps.LatLng(44.5403, -78.5463),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map(mapCanvas, mapOptions)
        }

        google.maps.event.addDomListener(window, 'load', initializeMap);

        return function() {
            if (map) {
                google.maps.event.trigger(map,'resize');
            }
        }
    })();

    function resizeMap() {
        var sidebarHeight = $('.c-details-container__sidebar').height();
        $('.c-details-container__map').height(sidebarHeight);
    }

    $(window).resize(resizeMap);
    resizeMap();
});
