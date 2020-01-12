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

    var snowFlake = "data:image/png;base64,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"

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

    var wind = {v: 0};

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
