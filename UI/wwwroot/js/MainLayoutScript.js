$(document).ready(function () {
    

    
    
    $('.layout_content').scroll(function () {
        $('.header-overlay').css("opacity", 0 + $('.layout_content').scrollTop() / 200)
    });
    $('.link').click(function () {
        if ($(this).parent().hasClass('link-active')) {
            return false;
        }
        $('.link').removeClass('link-active');
        $(this).addClass('link-active');
    });
    
    $('.dropbtn').click(function (){
        $('#dropdown').toggleClass("show");
    })
    $(window).click(function () {
        if (!event.target.matches('.dropbtn')) {
            let dropdowns = $(".dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    })
});