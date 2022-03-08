$(document).ready(function(){
    $('.link').click(function(){
        if($(this).parent().hasClass('link-active')){
            return false;
        }
        $('.link').removeClass('link-active');
        $(this).addClass('link-active');
    });
});