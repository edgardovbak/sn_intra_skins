$(document).ready(function (){
    $('.js-open_menu').on('click',function() {
        $('.content_to_right').toggleClass('open');
    });

    $('.js-close_menu').on('click',function() {
        $('.content_to_right').removeClass('open');
    });
});
