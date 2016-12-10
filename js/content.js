jQuery(function ($) {
    "use strict";

    var settings = {
        'searchURLprefix': 'http://tparser.org/'
    };

    var methods = {
        init: function () {
            // kinopoisk site
            var $names = $('.search_results .element .info .name,h1.moviename-big');
            $.each($names, function () {
                methods.insertLink($(this));
            });
        },
        insertLink: function($el){
            var movieName = methods.clearSearchText($el.text());

            console.log(movieName);
            var url = settings.searchURLprefix + movieName;

            if($('#infoTable').length > 0) {
                $('#infoTable').find('.type').each(function(){
                    if($(this).text() === 'год') {
                        url += '-' + methods.clearSearchText($(this).parent().find('a').text());
                    }
                })
            }

            $el.append('<a href="' + url +'" class="kts-torrent-link" target="_blank">T</a>');
        },
        clearSearchText: function(text){
            return text.replace(/\(сериал\)|\(видео\)|\(ТВ\)/g, '') // remove info words
                .replace(/[«»&\/\\#,+()$~%.'":*?<>{}]/g, '') // remove special characters
                .replace(/\s/g, '-');
        }
    };

    methods.init();
});