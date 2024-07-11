(function($) {
	window.addEventListener('wdEventStarted', function () {
		setTimeout( function() {
			var $widget_links = $( '.widget_shopping_cart a' );
			$widget_links.each( function() {
				var links_href = $( this ).attr( 'href' );
				if ( xtemos_system.demo ) {
					if ( links_href.indexOf('?') && links_href.indexOf('/demo/') == -1 ) {
						$(this).attr( 'href', links_href.split('?')[0] + "demo/" + xtemos_system.demo );
					}else{
						$(this).attr( 'href', links_href.split('/demo/')[0] + "/demo/" + xtemos_system.demo + '/');
					}
				}else{
					if ( links_href.indexOf('?') && links_href.indexOf('/demo/') == -1 ) {
						$(this).attr( 'href', links_href.split('?')[0] );
					}else{
						$(this).attr( 'href', links_href.split('/demo/')[0]);
					}
				}
			})
		}, 350 );

		if ( xtemos_system.demo ) {
			$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
				// Modify options, control originalOptions, store jqXHR, etc
				if ( !options.url.includes('demo=' + xtemos_system.demo) ) {
					options.url += (options.url.split('?')[1] ? '&':'?') + 'demo=' + xtemos_system.demo;
				}
			});
		}

		// Fix for local storage.
		$('.menu').each(function () {
			var $menu = $(this);
			var storageKey = woodmart_settings.menu_storage_key + '_' + $menu.attr('id');

			var unparsedData = localStorage.getItem(storageKey);

			if (!unparsedData) {
				return;
			}

			try {
				var storedData = JSON.parse(unparsedData);
			}
			catch (e) {
				console.log('cant parse Json', e);
			}

			Object.keys(storedData).forEach(function (id) {
				var $data = $('<div class="temp-wrapper"></div>').append(storedData[id]);
				var prefix = xtemos_system.demo;

				var href = window.location.href;

				if ( ! prefix ) {
					if ( href.indexOf('magazine') !== -1 || href.indexOf('handmade') !== -1 ) {
						return;
					}
				}

				$data.find('a').each(function () {
					var $this = $(this);
					var href = $this.attr('href');

					if (typeof href === 'undefined' || href === '#' || id === '8064') {
						return;
					}

					let spliced = href.split('/?');

					if (prefix) {
						if (-1 !== href.indexOf('?') && -1 !== href.indexOf('/demo/')) {
							$this.attr('href', spliced[0].split('/demo/')[0] + '/demo/' + prefix + '/?' + spliced[1]);
						} else if (-1 !== href.indexOf('/demo/') && -1 === href.indexOf('?')) {
							$this.attr('href', href.split('/demo/')[0] + '/demo/' + prefix + '/');
						} else if (-1 === href.indexOf('/demo/') && -1 !== href.indexOf('?')) {
							$this.attr('href', spliced[0] + '/demo/' + prefix + '/?' + spliced[1]);
						} else if (-1 === href.indexOf('/demo/') && -1 === href.indexOf('?')) {
							$this.attr('href', href + 'demo/' + prefix + '/');
						}
					} else {
						if (-1 !== href.indexOf('/demo/') && -1 === href.indexOf('?')) {
							$this.attr('href', href.split('/demo/')[0] + '/');
						} else if (-1 !== href.indexOf('/demo/') && -1 !== href.indexOf('?')) {
							$this.attr('href', href.split('/demo/')[0] + '/?' + spliced[1]);
						}
					}
				});

				storedData[id] = $data.html();
			});

			localStorage.setItem(storageKey, JSON.stringify(storedData));
		});
	});
})(jQuery);
