(function () {
    'use strict';

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomArbitrary(min, max) {
        var newVar = Math.random() * (max - min) + min;
        if (newVar == 0) {
            newVar = min;
        }
        return  newVar;
    }

    $(document).ready(function () {
        var ctx = $("canvas").get(0).getContext('2d');
        var w = ctx.canvas.width;
        var h = ctx.canvas.height;

        var stage = new Stage(ctx);
        var generatorInterval = null;
        var updateInterval = null;

        function stopStage() {
            stage.stop();
        }

        function startStage() {
            stage.begin();//开始渲染
        }

        function restart() {
            stopStage();
            if (generatorInterval) {
                clearInterval(generatorInterval);
            }
            if(updateInterval){
                clearInterval(updateInterval);
            }
            startStage();

        }

        $("#waitingBtn").on("click", function () {
            console.log("start waiting...");
            restart();
            updateInterval = setInterval(function () {
                for (var i in stage.sprites) {
                    if (stage.sprites[i]) {
                        stage.sprites[i].move()
                    }
                }
            }, 50);

            function createCircle() {
                var x = getRandomInt(0, w);
                var y = getRandomInt(h/2, h);
                var radius = getRandomInt(2, 20);
                var a = radius / 20.0;
                var circle = new Circle(ctx, x, y, radius, {strokeStyle: "rgba(255,255,255," + a + ")"});
                var speedX = 0; // 水平方向速度不变
                var speedY = -1 * a;
                circle.speed = {x: speedX, y: speedY};
                var count = getRandomInt(20, 30)
                if (stage.sprites.length < count) {
                    stage.addSprite(circle);
                } else {
                    stage.deleteSprite();
                }
            }

            generatorInterval = setInterval(createCircle, 100);
        });

        $("#monitorBtn").on("click", function () {
            console.log("start mornitoring...");
            restart();

            function createRectangle() {
                var d = 20;
                var left = (w - d) / 2;
                var top = (h - d) / 2;

                var rect = new Rectangle(ctx, left, top, d, d / 2);
                rect.speed = {x: 0, y: 0};
                stage.addSprite(rect);
            }

            for (var i = 0; i < 15; i++) {
                createRectangle();
            }

            function lineSmallRectangles() {
                var sprites = stage.sprites;
                var len = sprites.length;
                var d = 10;
                var span = 15;
                var left = (w - (span * len)) / 2;
                var top = (h - d) / 2;

                for(var i=0; i<len; i++){
                    var spr = sprites[i];
                    spr.moveTo(left+(i*span), top);
                    spr.setWidth(d);
                    spr.setHeight(d/2);
                }

                updateInterval = setInterval(function () {
                    for (var i in stage.sprites) {
                        var spr = stage.sprites[i];
                        if (spr) {
                            var oldH = spr.h;
                            var h = getRandomInt(0, 30);
                            spr.setHeight(h);
                            var dh = h - oldH;
                            spr.y = top - (dh/2);
                        }
                    }
                }, 100);//这里是50帧每秒

            }

            setTimeout(lineSmallRectangles, 1000);
        });

        $("#thinkBtn").on("click", function () {
            console.log("start thinking...");
        });
    });

}());
