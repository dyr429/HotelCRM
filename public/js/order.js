$('#future-orders').css('display','none');

$('#toggle-orders li').click(function () {
    $('#toggle-orders li').not(this).removeClass('selected');
    $(this).addClass('selected');
});


$('.fo').click(function () {
    $('#order-history').hide();
    $('#future-orders').fadeIn('fast');
});

$('.oh').click(function () {
    $('#order-history').fadeIn('fast');
    $('#future-orders').hide();
});

// By default, selecting 'Past 6 months' on dropdown selector
// $(function () {
//     $('select option[value="6months"]').prop('selected', true);
// });