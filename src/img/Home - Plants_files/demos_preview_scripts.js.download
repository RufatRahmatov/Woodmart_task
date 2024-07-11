(function($) {
	window.addEventListener('wdEventStarted', function () {
		var $demosPreview = $('.xts-demos-preview'),
			$demoTabs = $('.xts-demo-tabs'),
			$demoLoader = $demosPreview.find('.xts-demo-tabs > .wd-loader-overlay'),
			demosLoad = false,
			demosShown = false,
			htmlResponse = '';

		$('.xts-demos-search input').on('keyup', function (e) {
			var val = $(this).val().toLowerCase();

			$('.xts-demo-tab.active').find('.xts-demo-item').each(function () {
				var $this = $(this);

				var $name = $this.attr('data-template_name').toLowerCase();
				var $tag = $this.attr('data-template_tag').toLowerCase();

				if ($name.indexOf(val) > -1 || $tag.indexOf(val) > -1) {
					$this.removeClass('wd-hide');
				} else {
					$this.addClass('wd-hide');
				}
			});
		});

		$(document).on('click', '.xts-show-demos, .xtemos-show-demos', function (e) {
			e.preventDefault();

			$('.xts-show-demos').addClass('xts-opened');
			$('.wd-close-side').removeClass('wd-close-side-opened');
			$('.mobile-nav').removeClass('wd-opened');

			if (demosLoad && demosShown) {
				$demosPreview.addClass('xts-opened');
				if ( $(window).width() >= 1024 ) {
					setTimeout(function () {
						$('.xts-demos-search').find('input[type="text"]').focus();
					}, 300);
				}
				return;
			} else if (demosLoad && !demosShown) {
				$demosPreview.addClass('xts-opened');
				$demoTabs.html(htmlResponse);
				tabs();
				lazyload('.xts-demo-tab.active .xts-lazy');
				demosShown = true;
				if ( $(window).width() >= 1024 ) {
					setTimeout(function () {
						$('.xts-demos-search').find('input[type="text"]').focus();
					}, 300);
				}
				return;
			} else if (!demosLoad && !demosShown) {
				$demosPreview.addClass('xts-opened');

				xtemos_get_demos(true);
				if ( $(window).width() >= 1024 ) {
					setTimeout(function () {
						$('.xts-demos-search').find('input[type="text"]').focus();
					}, 300);
				}
			}
		});

		$(document).on('click', '.xts-close-demos', function () {
			$demosPreview.removeClass('xts-opened');

			$('.xts-show-demos').removeClass('xts-opened');
		});

		$(document).keyup(function (e) {
			if (e.keyCode === 27) $('.xts-close-demos').click();
		});

		$(document).on('mouseenter mouseleave mousemove', '.xtemos-hover-open', function (e) {
			lazyload('.xts-demos-dropdown .xts-lazy');
		});

		$(document).on('click', '.xts-nav-demo li', function () {
			var categoryTabId = $(this).attr('id'),
				tab = $('.xts-demo-tab[data-tab-id="' + categoryTabId + '"]');

			$(this).siblings().removeClass('active');
			$(this).addClass('active');

			tab.siblings().removeClass('active');
			tab.addClass('active');

			lazyload('.xts-demo-tab.active .xts-lazy');
		});

		function xtemos_get_demos(showDemos) {
			$demoLoader.addClass('wd-loading');

			$.ajax({
				url: woodmart_settings.ajaxurl,
				data: { action: 'get_demos' },
				method: "POST",
				dataType: "JSON",
				success: function (response) {
					htmlResponse = response;

					demosLoad = true;

					if (showDemos) {
						$demoTabs.html(htmlResponse);
						tabs();
						lazyload('.xts-demo-tab.active .xts-lazy');
						demosShown = true;
					}

					$demoLoader.removeClass('wd-loading');
				},
				error: function () {
					console.log('ajax error');
				}
			});
		}

		function tabs() {
			var $tab = $('.xts-demo-tabs');
			var $firstTabEl = $tab.find('.xts-nav-demo li').first(),
				firstTabEl_id = $firstTabEl.attr('id');

			$firstTabEl.addClass('active');

			$tab.addClass('wd-inited');
			$tab.find('.xts-demo-tab[data-tab-id="' + firstTabEl_id + '"]').addClass('active');
		}

		function lazyload($selector) {
			var lazy = $($selector);

			lazy.each(function () {
				var $image = $(this),
					$imgWrapp = $image.parent();

				if (!$imgWrapp.hasClass('xts-img-loaded')) {
					var $loader = $image.siblings('.wd-loader-overlay');

					$image.attr('src', $image.data('lazy-original'));
					$loader.addClass('wd-loading');
					$image.on('load', function () {
						$image.siblings('.wd-loader-overlay').removeClass('wd-loading');
						$imgWrapp.addClass('xts-img-loaded');
					})
				}
			});
		}
	});
})(jQuery);