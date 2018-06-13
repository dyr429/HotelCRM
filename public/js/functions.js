$(document).ready(function() {
    $(window).resize(function() {
        var bodyheight = $(this).height();
        var sliderheight = bodyheight * 0.5;
        $(".slide-container").height(sliderheight);
    }).resize();
});