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
    });

    window.addEventListener('load', function () {
        document.querySelector('.glider').addEventListener('glider-slide-visible', function (event) {
            var glider = Glider(this);
        });
        document.querySelector('.glider').addEventListener('glider-slide-hidden', function (event) {
            console.log('Slide Hidden %s', event.detail.slide)
        });
        document.querySelector('.glider').addEventListener('glider-refresh', function (event) {
            console.log('Refresh')
        });
        document.querySelector('.glider').addEventListener('glider-loaded', function (event) {
            console.log('Loaded')
        });

        window._ = new Glider(document.querySelector('.glider'), {
            slidesToShow: 1, //'auto',
            slidesToScroll: 1,
            itemWidth: 150,
            draggable: true,
            scrollLock: false,
            rewind: true,
            arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            },
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToScroll: 'auto',
                        itemWidth: 500,
                        slidesToShow: 'auto',
                        exactWidth: true
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToScroll: 4,
                        slidesToShow: 4,
                        dots: false,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToScroll: 3,
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToScroll: 2,
                        slidesToShow: 2,
                        dots: false,
                        arrows: false,
                        scrollLock: true
                    }
                }
            ]
        });
    });

    $('.parallax').scrolly({ bgParallax: true });
    $('#general-info').css('position', 'relative');
    $('#unit-gallery').justifiedGallery({
        rowHeight: 200,
        lastRow: 'nojustify',
        margins: 10,
        sizeRangeSuffixes: {}
    }).on('jg.complete', function () {
        console.log('ok galery');
    });
    var feedbackGroup = document.querySelector('#feedback-group');
    var ps = new PerfectScrollbar(feedbackGroup);
});