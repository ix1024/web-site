define(['jquery'], function() {
	$.fn.win = function(options) {
		var ops = $.fn.extend({
			defaultItem: true //默认项
		}, options);
		return this.each(function() {

			var $aside = $(this).find('[rel="tab-source-box"]'),
				$tag = $(this).find('[rel="tab-tag-box"]'),
				$iframes = $(this).find('[rel="tab-iframe-box"]'),
				addIframe = function(source) {
					var $currentIframe = $iframes.find('[src="' + source + '"]');
					if (!source) {
						return;
					}
					$iframes.find('iframe').hide();
					if ($currentIframe.length) {
						$currentIframe.show();
					} else {
						$iframes.append('<iframe src="' + source + '" frameborder="0"></iframe>');
					}
					location.hash = source;
				},
				addTag = function(source, text) {
					var $source = $tag.find('[data-tag-source="' + source + '"]');
					$tag.find('li').removeClass('tab-select');
					if ($source.length) {
						$source.addClass('tab-select');
					} else {
						$tag.append('<li class="tab-select" data-tag-source="' + source + '"><span>' + text + '</span><i class="tab-del">x</i></li>');
					}
					$aside.find('[rel="tab-source-item"]').removeClass('tab-selected-source');
					$aside.find('[rel="tab-source-item"][data-source="' + source + '"]').addClass('tab-selected-source');
				};


			$aside
				.on('click', '[rel="tab-source-item"]', function(ev) {
					var source = $(this).data('source');
					var text = $(this).text();
					addTag(source, text);
					addIframe(source);
					ev.preventDefault();
				});
			$tag
				.on('dblclick', '.tab-select', function() {
					alert()
				})
				.on('click', '.tab-del', function() {
					var $parent = $(this).parents('li'),
						source = $parent.data('tag-source'),
						index = $parent.index(),
						current = $parent.hasClass('tab-select'),
						$li = $tag.find('li'),
						$iframe = $iframes.find('iframe'),
						$tagertIframe = $iframes.find('iframe[src="' + source + '"]');
					if ($li.length === 1) {
						return;
					}
					$iframe.hide();
					$li.eq(index).remove();
					$tagertIframe.remove();


					if (current) {
						$li.removeClass('tab-select');
						if (index) {
							$li.eq(index - 1).addClass('tab-select');
						} else {
							$li.eq(index + 1).addClass('tab-select');
						}
					}
					addIframe($tag.find('li.tab-select').data('tag-source'));
				})
				.on('mouseenter', 'li', function() {
					$(this).addClass('tab-hover');
				})
				.on('mouseleave', 'li', function() {
					$(this).removeClass('tab-hover');
				})
				.on('click', '[data-tag-source]', function(ev) {
					var source = $(this).data('tag-source');
					if ($(ev.target).is('span')) {
						addTag(source);
						addIframe(source);
					}

				});

			if (ops.defaultItem) {
				$aside.find('[rel="tab-source-item"]').eq(0).click();
			}
		});
	};
});