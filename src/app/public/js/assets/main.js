var $ = require('jquery');
$(function () {
    $('.js-menu-trigger').click(function () {
        $('.js-menu').toggleClass('in');
    });
})