/**
 * Created by lilac on 8/27/17.
 */
$(function () {
    $('input').prop('disabled', true);
    $('.edit').click(function () {
        $('html').addClass('active');
        $('input').prop('disabled', false);
    });
    $('.save').click(function () {
        $('html').removeClass('active');
        $('input').prop('disabled', true);
    });
    function resizeInput() {
        $(this).attr('size', $(this).val().length + 2);
    }

    $('input')
        .keyup(resizeInput)
        .each(resizeInput);
});