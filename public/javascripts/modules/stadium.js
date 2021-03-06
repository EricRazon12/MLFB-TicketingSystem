﻿
$(window).load(function () {
    $('span.price-range-both.value').css('visilbily', 'hidden');
})

$(document).ready(function () {

    var stadH = $('.ts-stadium .ts-main').height();
    var stadSum = stadH - 263;

    $('.ts-tick-handler').css('height', stadSum + "px")

    //Stadium Mapping Code
    $('.ts-tick-results').find('.row').hide();

    var areaSec = $.map($('area[section]'), function (el) {
        var secAttr = $(el).attr('section')
        //var imgAttr = "<img src='" + $(el).attr('imgView') + "'/>";
        return {
            key: secAttr,
            toolTip: "<p>Section <b>" + secAttr + "</b>" + "</p><p<span>50 Tickets</span> Available from $10.00 to $300.00</p>",
        };
    });

    var image = $('#stad');
    $(image).mapster({
        fillOpacity: 0.4,
        fillColor: "1767b3",
        stroke: true,
        strokeColor: "111",
        strokeOpacity: 0.8,
        strokeWidth: 0.5,
        showToolTip: true,
        singleSelect: true,
        areas: areaSec,
        mapKey: 'section',
        listKey: 'section',
        toolTipContainer: '<div class="ts-tooltip"></div>',
        render_highlight: {
            fillColor: '1767b3',
            strokeWidth: 0.5
        },

        onClick: function (e) {

            $('.ts-tick-view').html("<h4>Section " + e.key + "</h4>" + "<a class=img-pop href=#><img class=img-responsive src='" + $(this).attr('imgView') + "'/></a>");

            $('.ts-tick-results').each(function () {
                var sec = $(this).attr('data-sec');
                $(this).find('.row').each(function () {
                    if (e.key === sec) {
                        $(this).show('slide', { direction: 'right' }, 500).css('height', '100%', 'overflow', 'hidden');
                    } else {
                        $(this).hide('slide', { direction: 'right' }, 500).css('height', '100%', 'overflow', 'hidden');
                    }
                })
            })
        },
    });

    $('span.price-range-both.value').css('visilbily', 'hidden');
    //Price Range Slider
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var w1 = 40;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var w2 = 40;
        var r2 = x2 + w2;

        if (r1 < x2 || x1 > r2) return false;
        return true;

    }

    // // slider call
    var min = 0, max = 5000;

    $('#slider').slider({

        range: true,
        min: min,
        max: max,
        values: [min, max],
        slide: function (event, ui) {

            $('.ui-slider-handle:eq(0) .price-range-min').html('$' + ui.values[0]);
            $('.ui-slider-handle:eq(1) .price-range-max').html('$' + ui.values[1]);
            $('.price-range-both').html('<i>$' + ui.values[0] + ' - </i>$' + ui.values[1]);

            //

            if (ui.values[0] == ui.values[1]) {
                $('.price-range-both i').css('display', 'none');
            } else {
                $('.price-range-both i').css('display', 'inline');
            }

            //

            if (collision($('.price-range-min'), $('.price-range-max')) == true) {
                $('.price-range-min, .price-range-max').css('opacity', '0');
                $('.price-range-both').css('display', 'block');
            } else {
                $('.price-range-min, .price-range-max').css('opacity', '1');
                $('.price-range-both').css('display', 'none');
            }

        }
    });

    $('.ui-slider-range').append('<span class="price-range-both value"><i>$' + $('#slider').slider('values', 0) + ' - </i>' + $('#slider').slider('values', 1) + '</span>');

    $('.ui-slider-handle:eq(0)').append('<span class="price-range-min value">$' + $('#slider').slider('values', 0) + '</span>');

    $('.ui-slider-handle:eq(1)').append('<span class="price-range-max value">$' + $('#slider').slider('values', 1) + '</span>');




})
