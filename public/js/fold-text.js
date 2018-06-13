/**
 * Created by dyr42 on 7/22/2017.
 */
var $expandCode = $(' <div class="expandCollapse"><a class="textcollapse">LESS...</a><a class="expand">MORE...</a></div>');
$('.textBlock').append($expandCode);


$('.textcollapse').hide();

var textLineHeightString = $('.justText').css('line-height');
var textLineHeightInt;
if (textLineHeightString === 'normal'){
    $('.justText').css('line-height', '16px');
    textLineHeightString = $('.justText').css('line-height');
}

textLineHeightInt = (parseInt(textLineHeightString, 10) * 4)+4;
textLineHeightString = textLineHeightInt + 'px';


$('.justImage img').css('height',textLineHeightString);
$('.justImage img').css('width','auto');


$('.justImage img').each( function(){
    if ($(this).attr('src').length < 1) {
        $(this).hide();
    }
});


$('.justText').css('height', textLineHeightString);
$('.justText').css('overflow', 'hidden');

$('.expandCollapse').hover(function(){
    $(this).css('color','#2da9e1');
}, function(){
    $(this).css('color','#000');
});

$('.expandCollapse').click(function(){
    if ($(this).parent('.textBlock').children('.justText').css('height') === textLineHeightString) {
        $(this).children('.textcollapse').show();
        $(this).children('.expand').hide();
        $(this).parent('.textBlock').css('height', '100%');
        $(this).parent('.textBlock').children('.justText').css('height', '100%');
        $(this).parent('.textBlock').children('.justText').css('overflow', 'visible');
        $(this).siblings('.justImage').children('img').css('height', '200px');
        $(this).siblings('.justImage').children('img').css('width', 'auto');

    }
    else {
        $(this).children('.textcollapse').hide();
        $(this).children('.expand').show();
        $(this).parent('.textBlock').children('.justText').css('height', textLineHeightString);
        $(this).parent('.textBlock').children('.justText').css('overflow', 'hidden');
        $(this).siblings('.justImage').children('img').css('height',textLineHeightString);
        $(this).siblings('.justImage').children('img').css('width', 'auto');
    }
});


