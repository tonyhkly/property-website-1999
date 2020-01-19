function loadXmas() {
    var script = document.createElement('script');
    document.body.appendChild(script);
    script.onload = start;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.1.1/pixi.js';
}

function start() {
    var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight, {
        transparent: true,
    });
    document.body.appendChild(renderer.view);
    renderer.view.style.position = 'fixed';
    renderer.view.style.top = '0';
    renderer.view.style.left = '0';
    renderer.view.style.zIndex = '20000';
    renderer.view.style.backgroundColor = 'transparent';
    renderer.view.style.pointerEvents = 'none';
    var stage = new PIXI.Container();

    // audio
    // var audio = new Audio('https://archive.org/download/DeanMartin-LetItSnow/DeanMartin-LetItSnow.ogg');
    // audio.play();

    var snowFlake = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMABAhmYihVRwxZqpOAajMcyZd2bi6djn1sUkvXi11AOzgQv6FxTyAXt7qngyMT5rWF88OumezhniQM1gAAAfZJREFUOMu9UleO6zAMpLp7772nl02y6/vf7MWw42z+H5aACIkzHAnUwP8JhBDAtI4SoKW01p4ZEEYIYwQ8beoFXiC8nLAkYQygNQoD+JBY9hhPAnoYqopYKfAszTovghNeu2hMMXYrJAmC1/6JMKl5Wz+M7CF+jLeIc43Ob5zzSZervHAjxQMI9tbFUKmmvt4Igwwi22eKCcmOBnlry12g2sqwKAALA41wWqcZzsadf9GKymqMroMXIdmWgW1RcBW0uQX0B4ld5/w0HNah2VGiNb6cWfIQpMSMxgikaLws8KRjEJk4wfbLIvTbdSxVJSesl++fAOocdKM8EKVp47vl1QbztvQJrATxrRu5nWyMwhJy6p4AGbEJ75CwWcTHIrlqe8X29b0S8CcsR6dFYErurpegOG897sNBze8KITSu8HpHvf26DUefHE9sx6ochPXwQxbz44xLKOHtVR1bME3UphxkJW37PAxJMv9qDUbBNDu7u1CDo+YSuTi2TJ3wUM8EjCotyXhtnTcVyJlBJYDGp2zDFl9A7MRakfd9WgIrW+HqGBzN/DUoV411wc8e2hBePpL9l/j0NLCDDp6rm3A9d4PwRLeBj5DQnBH4dl8OzFzwd6we71WZmka5OO3t3WUceLKxx0Q/nX73z2uy9tTl6RX8bfwDyJUm5byjQGsAAAAASUVORK5CYII=";

    PIXI.loader
        .add(snowFlake)
        .load(setup);

    var MAX_SNOWFLAKES = 500;
    var MAX_ROTATION_DELTA = Math.PI / 20;
    var MAX_COLLECT = 1500;
    var COLLECT = true;
    var snowFlakes = [];
    var collectPos = 0;

    function setup() {
        for (var i = 0; i < MAX_SNOWFLAKES; i++) {
            snowFlakes.push(createSnowflake());
        }
        loop();
    }

    function easeInOutQuint(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }

    function createSnowflake() {
        var sprite = new PIXI.Sprite(PIXI.loader.resources[snowFlake].texture);
        var flake = {
            sprite: sprite,
        };

        // pos
        sprite.x = Math.random() * (windowWidth + 60) - 30;
        sprite.y = Math.random() * windowHeight - windowHeight;
        flake.z = Math.random() * 5 + 1.6;

        // pivot
        var w3 = sprite.width / 3;
        var h3 = sprite.height / 3;
        sprite.pivot = new PIXI.Point(Math.random() * w3 + w3, Math.random() * h3 + h3);

        // speed
        flake.speed = 3 * 1 / flake.z;

        // spin
        spinFlake(flake);


        var scale = 1 / flake.z;
        sprite.scale = new PIXI.Point(scale, scale);
        stage.addChild(sprite);
        return flake;
    }

    function spinFlake(flake) {
        var cr = flake.sprite.rotation;
        flake.rT = 0;
        flake.rB = cr;
        flake.rC = Math.random() * Math.PI * 10 - cr;
        flake.rD = Math.floor(Math.random() * 200 + 100);
    }

    var wind = { v: 0 };

    function changeWind() {
        wind.t = 0;
        wind.b = wind.v;
        wind.c = Math.random() * 2 - 1 - wind.v;
        wind.d = Math.floor(Math.random() * 100 + 50);
    }

    changeWind();

    var collectCount = 0;
    var prevMouseX = null;
    var mouseWind = 0;

    window.addEventListener('mouseout', function (event) {
        prevMouseX = null;
    });

    function loop() {
        requestAnimationFrame(loop);
        renderer.render(stage);
        wind.v = easeInOutQuint(wind.t, wind.b, wind.c, wind.d);
        wind.t++;
        if (wind.t > wind.d) {
            changeWind();
        }
        if (mouseWind > 0) {
            mouseWind -= 0.3;
        }
        if (mouseWind < 0) {
            mouseWind += 0.3;
        }
        for (var i = 0; i < MAX_SNOWFLAKES; i++) {
            var flake = snowFlakes[i];
            var sprite = flake.sprite;
            sprite.y += flake.speed;
            if (COLLECT && sprite.y > windowHeight - collectPos) {
                var locked = new PIXI.Sprite(PIXI.loader.resources[snowFlake].texture);
                locked.x = sprite.x;
                locked.y = sprite.y;
                locked.rotation = sprite.rotation;
                locked.pivot = new PIXI.Point(sprite.pivot.x, sprite.pivot.y);
                locked.scale = new PIXI.Point(sprite.scale.x, sprite.scale.y);
                stage.addChild(locked);
                sprite.y = -50;
                collectCount++;
                if (collectCount > MAX_COLLECT) {
                    collectCount = 0;
                    collectPos += 3;
                }
            } else if (sprite.y > windowHeight + 50) {
                sprite.y = -50;
            }
            sprite.x += (wind.v + mouseWind * 0.1) * flake.speed;
            if (sprite.x > windowWidth + 30) {
                sprite.x -= windowWidth + 60;
            }
            if (sprite.x < -30) {
                sprite.x += windowWidth + 60;
            }
            sprite.rotation = easeInOutQuint(flake.rT, flake.rB, flake.rC, flake.rD);
            flake.rT++;
            if (flake.rT > flake.rD) {
                spinFlake(flake);
            }
        }
    }
}
