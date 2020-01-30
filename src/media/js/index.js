$(document).ready(function () {
    $(window).scroll(function () {
        var header = $('header'),
            scroll = $(window).scrollTop();

        if (scroll >= 100) header.addClass('sticky');
        else header.removeClass('sticky');
    });
    $('#callSideBar').change(function (e) {
        if ($(this).prop('checked')) {
            $('header ul').addClass('active');
            $('header').removeClass('sticky')
        } else {
            $('header ul').removeClass('active');
            $('header').addClass('sticky')
        }
    })
});