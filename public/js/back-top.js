$(window).scroll(function () {
            if ($(this).scrollTop() > 900) {
                $('.goToTop').fadeIn();
            } else {
                $('.goToTop').fadeOut();
            }
        });
