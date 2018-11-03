(function() {

    // store the slider in a local variable
    var $window = $(window),
        flexslider = { vars:{} };

    // tiny helper function to add breakpoints
    function getGridSize() {
        return (window.innerWidth < 600) ? 2 :
            (window.innerWidth < 900) ? 3 : 4;
    }

    $window.load(function() {
        $('.flexslider').flexslider({
            animation: "slide",
            animationSpeed: 400,
            animationLoop: false,
            controlNav: false,
            slideshow: false,
            itemWidth: 210,
            itemMargin: 5,
            minItems: getGridSize(), // use function to pull in initial value
            maxItems: getGridSize(), // use function to pull in initial value
            start: function(slider){
                flexslider = slider;

                console.log([flexslider[0]])


                $('.flex-prev').html('<svg class="flex-prev-svg" height="40" viewBox="0 0 48 48" width="40" xmlns="http://www.w3.org/2000/svg">\n' +
                    '    <path fill="#ffffff" d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z"/>\n' +
                    '</svg>')


                $('.flex-prev-svg').css({
                    "transform":"rotate(180deg)",
                    "transform-origin": "center"
                })

                $('.flex-next').html('<svg height="40" class="flex-next-svg" viewBox="0 0 48 48" width="40" xmlns="http://www.w3.org/2000/svg">\n' +
                    '    <path fill="#ffffff" d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z"/>\n' +
                    '</svg>')
            }
        });
    });

    // check grid size on resize event
    $window.resize(function() {
        var gridSize = getGridSize();

        flexslider.vars.minItems = gridSize;
        flexslider.vars.maxItems = gridSize;
    });
}());