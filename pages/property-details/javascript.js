
console.log('Property Details Page JavaScript');

function rotate(d) {
    $({ deg: 0 }).animate({ deg: d }, {
        step: function (now, fx) {
            $(".logo").css({
                transform: "rotate(" + now + "deg)"
            });
        },
        duration: 2000
    });
}