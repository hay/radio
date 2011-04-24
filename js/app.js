jQuery(document).ready(function($) {
    function template(file, view, cb) {
        $.get("templates/" + file + ".html", function(html) {
            var html = Mustache.to_html(html, view);
            cb(html);
        });
    }

    function loadAudio(url) {
        AudioPlayer.embed("playerel", {
            soundFile : url
        });
    }

    AudioPlayer.setup("js/audio-player/player.swf", {
        width : 300,
        autostart : "yes"
    });

    function initStations() {
        function playMe(el) {
            var url = $(el).attr('href');
            loadAudio(url);
        }

        $("#stations").delegate("a", "click", function(e) {
            e.preventDefault();

            $("#stations a").removeClass('now');
            $(this).addClass('now');

            if ($("#player").hasClass('closed')) {
                $("#player").removeClass('closed').animate(
                    {
                        "width" : "300px"
                    },
                    {
                        complete : function() {
                            playMe(e.target);
                        }
                    }
                );
            } else {
                playMe(e.target);
            }
        });
    }

    $.getJSON("data/stations.json", function(data) {
        template(
            "stations",
            {
                stations : data
            },
            function(html) {
                $("#stations div").replaceWith(html);
                initStations();
            }
        )
    });
});