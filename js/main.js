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

    var rendSpeed = 20; //50帧每秒

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
            }, rendSpeed);

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

            generatorInterval = setInterval(createCircle, rendSpeed);
        });


        function createRectangles(count, width) {
            var d = width;
            var left = (w - d) / 2;
            var top = (h - d) / 2;
            for (var i = 0; i < count; i++) {
                var rect = new Rectangle(ctx, left, top, d, d);
                rect.speed = {x: 0, y: 0};
                stage.addSprite(rect);
            }
        }

        var monitorAction = function(param){
            var d = param.d;
            var top = param.top;
            updateInterval = setInterval(function () {
                for (var i in stage.sprites) {
                    var spr = stage.sprites[i];
                    if (spr) {
                        var oldH = spr.h;
                        var h = getRandomInt(2, d*3);
                        spr.setHeight(h);
                        var dh = h - oldH;
                        spr.y = top - (dh/2);
                    }
                }
            }, rendSpeed*3);
        }

        var thinkAction = function(param){
            var point = 0;
            var step = -1;
            var d = param.d;
            var top = param.top;

            updateInterval = setInterval(function () {
                var sprs = stage.sprites;
                var sprCount = sprs.length;
                // 复位
                for (var i = point -1; i<=point + 1; i++) {
                    var spr = sprs[i];
                    if(spr){
                        spr.setHeight(d);
                        spr.y = top;
                    }
                }

                if(point >= sprCount-1 || point <= 0){
                    step = -step;
                }

                point = point + step;
                var dh = [d, d+d, d]; // 三个块分别改变的高度
                for (var i = point -1, j=0; i<=point + 1; i++,j++) {
                    var spr = sprs[i];
                    if(spr){
                        spr.setHeight(d+dh[j]);
                        spr.y = top - (dh[j]/2);
                    }
                }
            }, rendSpeed*5);
        }


        function lineSmallRectangles(actionFunc) {
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
                spr.setHeight(d);
            }

            setTimeout(actionFunc, 1000, {"d":d, "top":top});
        }

        $("#monitorBtn").on("click", function () {
            console.log("start mornitoring...");
            restart();
            createRectangles(20, 20);
            setTimeout(lineSmallRectangles, 2000, monitorAction);
        });

        $("#thinkBtn").on("click", function () {
            console.log("start thinking...");
            restart();
            createRectangles(20, 20);
            setTimeout(lineSmallRectangles, 2000, thinkAction);
        });
    });

}());
